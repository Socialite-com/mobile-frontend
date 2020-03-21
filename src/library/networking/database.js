import firebase from "react-native-firebase";

var auth = firebase.auth();
var firestore = firebase.firestore();

export default class db {

  static getUser = () => { return Promise.resolve(auth.currentUser) };

  static checkUserExists = (user) => new Promise((resolve, reject) => {
    firestore.collection('users').doc(user.uid).get()
      .then(doc => { resolve(doc.exists) })
      .catch(error => reject(error))
  });

  static setupAccount = (uid, profile) => new Promise((resolve, reject) => {
    const ref = firestore.collection('users').doc(uid);

    firestore.runTransaction(async transaction => {
      const doc = await transaction.get(ref);

      // if user does not exist, we create profile
      if (!doc.exists) {
        await transaction.set(ref, profile);
      }
      // profile does exist, let's update the fields
      await transaction.update(ref, profile);
    }).then(() => { resolve("Account was successfully updated") })
      .catch(error => { reject(error) })
  });

  static getProfileData = (uid) => new Promise((resolve, reject) => {
    firestore.collection('users').doc(uid).get()
      .then(doc => { resolve(doc.data()) })
      .catch(error => reject(error))
  });

  static getEvents = (uid, subType) => new Promise((resolve, reject) => {
    firestore.collection('users').doc(uid).get()
      .then(async doc => {
        const eventArray = doc.get(subType);
        if (eventArray !== undefined && eventArray.length !== 0) {
          const eventData = (await Promise.all(eventArray.map(eid => firestore.collection('events').doc(eid).get())))
            .map(doc => doc.data());
          resolve(eventData)
        } else { resolve([]) }
      }).catch(err => reject(err))
  })

}
