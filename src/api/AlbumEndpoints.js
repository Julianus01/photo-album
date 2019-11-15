import firebase from 'firebase'

const COLLECTION = 'albums'
const PHOTOS_COLLECTION = 'photos'

const getAlbums = async () => {
  const snapshot = await firebase
    .firestore()
    .collection(COLLECTION)
    .orderBy('dateCreated', 'desc')
    .get()

  return snapshot.docs.map(doc => doc.data())
}

const getAlbum = async albumName => {
  const albumSnapshot = await firebase
    .firestore()
    .collection(COLLECTION)
    .where('name', '==', albumName)
    .get()

  if (!albumSnapshot.docs.length) {
    return null
  }

  const album = albumSnapshot.docs[0].data()

  const photosSnapshot = await firebase
    .firestore()
    .collection(COLLECTION)
    .doc(album.id)
    .collection(PHOTOS_COLLECTION)
    .orderBy('dateCreated', 'desc')
    .get()

  return { ...album, photos: photosSnapshot.docs.map(doc => doc.data()) }
}

const createAlbum = async albumName => {
  if (await getAlbum(albumName)) {
    return Promise.reject('A project with this name already exists!')
  }

  const doc = await firebase
    .firestore()
    .collection(COLLECTION)
    .doc()

  const newAlbum = { name: albumName, id: doc.id, dateCreated: new Date() }

  await doc.set(newAlbum)
  return newAlbum
}

const updateAlbum = async (albumId, album) =>
  firebase
    .firestore()
    .collection(COLLECTION)
    .doc(albumId)
    .set(album, { merge: true })

const deleteAlbum = albumId =>
  firebase
    .firestore()
    .collection(COLLECTION)
    .doc(albumId)
    .delete()

const addPhoto = async (albumId, photoName, photoFile) => {
  const doc = await firebase
    .firestore()
    .collection(COLLECTION)
    .doc(albumId)
    .collection(PHOTOS_COLLECTION)
    .doc()

  const src = await uploadPhoto(albumId, doc.id, photoFile)
  const photoObject = { name: photoName, src, id: doc.id, dateCreated: Date.now() }
  doc.set(photoObject)

  return photoObject
}

const uploadPhoto = async (albumId, photoId, photoFile) => {
  const { ref } = await firebase
    .storage()
    .ref()
    .child(`${COLLECTION}/${albumId}/${photoId}`)
    .put(photoFile)

  return ref.getDownloadURL()
}

export default {
  getAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,

  addPhoto
}
