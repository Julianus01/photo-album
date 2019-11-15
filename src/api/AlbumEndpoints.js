import firebase from 'firebase'

const COLLECTION = 'albums'
const PHOTOS_COLLECTION = 'photos'

const getAlbums = async () => {
  const albumsSnap = await firebase
    .firestore()
    .collection(COLLECTION)
    .orderBy('dateCreated', 'desc')
    .get()

  return Promise.all(
    albumsSnap.docs.map(doc => {
      const album = doc.data()

      return firebase
        .firestore()
        .collection(COLLECTION)
        .doc(album.id)
        .collection(PHOTOS_COLLECTION)
        .orderBy('dateCreated', 'desc')
        .limit(4)
        .get()
        .then(snap => snap.docs.map(photos => photos.data()))
        .then(photos => ({ ...album, photos }))
    })
  )
}

const getAlbumByName = async albumName => {
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
  if (await getAlbumByName(albumName)) {
    return Promise.reject('An album with this name already exists!')
  }

  const doc = await firebase
    .firestore()
    .collection(COLLECTION)
    .doc()

  const newAlbum = { name: albumName, id: doc.id, dateCreated: new Date() }

  await doc.set(newAlbum)
  return newAlbum
}

const updateAlbum = async (albumId, album) => {
  if (await getAlbumByName(album.name)) {
    return Promise.reject('An album with this name already exists!')
  }

  return firebase
    .firestore()
    .collection(COLLECTION)
    .doc(albumId)
    .set(album, { merge: true })
}

const deleteAlbum = albumId =>
  firebase
    .firestore()
    .collection(COLLECTION)
    .doc(albumId)
    .delete()

const deletePhoto = (albumId, photoId) =>
  firebase
    .firestore()
    .collection(COLLECTION)
    .doc(albumId)
    .collection(PHOTOS_COLLECTION)
    .doc(photoId)
    .delete()

const addPhoto = async (albumId, photoName, photoFile) => {
  const doc = await firebase
    .firestore()
    .collection(COLLECTION)
    .doc(albumId)
    .collection(PHOTOS_COLLECTION)
    .doc()

  const src = await uploadPhoto(albumId, doc.id, photoFile)
  const photoObject = {
    name: photoName,
    src,
    id: doc.id,
    size: photoFile.size,
    dateCreated: Date.now()
  }
  await doc.set(photoObject)

  return photoObject
}

const getPhotoByName = async (albumId, photoName) => {
  const photoSnapshot = await firebase
    .firestore()
    .collection(COLLECTION)
    .doc(albumId)
    .collection(PHOTOS_COLLECTION)
    .where('name', '==', photoName)
    .get()

  if (!photoSnapshot.docs.length) {
    return null
  }

  const photo = photoSnapshot.docs[0].data()
  return photo
}

const updatePhoto = async (albumId, photoId, photo) => {
  if (await getPhotoByName(albumId, photo.name)) {
    return Promise.reject('A photo with this name already exists!')
  }

  return firebase
    .firestore()
    .collection(COLLECTION)
    .doc(albumId)
    .collection(PHOTOS_COLLECTION)
    .doc(photoId)
    .set(photo, { merge: true })
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
  getAlbumByName,
  createAlbum,
  updateAlbum,
  deleteAlbum,

  addPhoto,
  deletePhoto,
  updatePhoto
}
