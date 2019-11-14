import firebase from 'firebase'

const getAlbums = async () => {
  const snapshot = await firebase
    .firestore()
    .collection('albums')
    .get()
  return snapshot.docs.map(doc => doc.data())
}

export default {
  getAlbums
}
