import firebase from 'firebase'

const getAlbums = async () => {
  const snapshot = await firebase
    .firestore()
    .collection('albums')
    .orderBy('dateCreated', 'desc')
    .get()

  return snapshot.docs.map(doc => doc.data())
}

const createAlbum = async albumName => {
  const album = await firebase
    .firestore()
    .collection('albums')
    .where('name', '==', albumName)
    .get()

  if (album.docs.length) {
    return Promise.reject('A project with this name already exists!')
  }

  const doc = await firebase
    .firestore()
    .collection('albums')
    .doc()

  const newAlbum = { name: albumName, id: doc.id, dateCreated: new Date() }

  await doc.set(newAlbum)
  return newAlbum
}

export default {
  getAlbums,
  createAlbum
}
