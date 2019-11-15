import firebase from 'firebase'

const getAlbums = async () => {
  const snapshot = await firebase
    .firestore()
    .collection('albums')
    .orderBy('dateCreated', 'desc')
    .get()

  return snapshot.docs.map(doc => doc.data())
}

const getAlbum = async albumName => {
  const snapshot = await firebase
    .firestore()
    .collection('albums')
    .where('name', '==', albumName)
    .get()

  return snapshot.docs[0].data()
}

const createAlbum = async albumName => {
  if (await getAlbum(albumName)) {
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
  getAlbum,
  createAlbum
}
