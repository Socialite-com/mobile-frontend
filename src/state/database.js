import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export default class db {
  static getUser = () => {
    return Promise.resolve(auth().currentUser);
  };

  static checkUserExists = uid =>
    new Promise((resolve, reject) => {
      firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then(doc => {
          resolve(doc.exists);
        })
        .catch(error => reject(error));
    });

  static checkEventExists = eid =>
    new Promise((resolve, reject) => {
      firestore()
        .collection('events')
        .doc(eid)
        .get()
        .then(doc => {
          resolve(doc.exists);
        })
        .catch(err => reject(err.message));
    });

  static setupAccount = (uid, profile) =>
    new Promise((resolve, reject) => {
      const ref = firestore()
        .collection('users')
        .doc(uid);
      firestore()
        .runTransaction(async transaction => {
          const doc = await transaction.get(ref);

          // if user does not exist, we create profile
          if (!doc.exists) {
            await transaction.set(ref, profile);
          } else {
            // profile does exist, let's update the fields
            await transaction.update(ref, profile);
          }
        })
        .then(() => {
          resolve('Account was successfully updated');
        })
        .catch(error => {
          reject(error);
        });
    });

  static getProfileData = uid =>
    new Promise(resolve => {
      firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then(doc => doc.data())
        .then(async data => {
          await this.resolveFile(data.profilePicture)
            .then(url => (data.profilePicture = url))
            .catch(err => {
              console.log(err);
              data.profilePicture = '';
            });
          resolve(data);
        });
    });

  static uploadFile = (localFile, remoteFile) =>
    new Promise((resolve, reject) => {
      storage()
        .ref(remoteFile)
        .putFile(localFile)
        .then(() => resolve('Successfully uploaded to firebase'))
        .catch(err => reject(err));
    });

  static getEventData = eid =>
    new Promise((resolve, reject) => {
      firestore()
        .collection('events')
        .doc(eid)
        .get()
        .then(doc => {
          if (!doc.exists) {
            reject('This event does not exist.');
          } else {
            resolve(doc.data());
          }
        })
        .catch(error => reject(error.message));
    });

  static addEventToProfile = (eid, uid, type) =>
    new Promise((resolve, reject) => {
      const ref = firestore()
        .collection('users')
        .doc(uid);
      firestore()
        .runTransaction(async transaction => {
          const doc = await transaction.get(ref);
          // if user does not exist, operation is terminated.
          if (!doc.exists) {
            reject('User does not exist');
          }
          // profile does exist, let's check if eid already exists.
          const eventArray = doc.get(type);
          if (eventArray === undefined || eventArray.length === 0) {
            // adding first event to profile
            await transaction.update(ref, {
              [type]: firestore.FieldValue.arrayUnion(eid),
            });
          } else if (eventArray.includes(eid)) {
            // event is already in user profile
            reject('Event already registered for user');
          } else {
            await transaction.update(ref, {
              [type]: firestore.FieldValue.arrayUnion(eid),
            });
          }
        })
        .then(() => resolve('Event was successfully added to user profile'))
        .catch(err => reject(err.message));
    });

  static reselectEventCard = async event => {
    const profileKeys = ['userName', 'profilePicture'];
    const uid = event.creator;
    const profileData = await this.getProfileData(uid).then(profile =>
      this.pick(profile, profileKeys),
    );

    await this.resolveFile(profileData.profilePicture)
      .then(url => {
        profileData.profilePicture = url;
      })
      .catch(error => console.log(error))
      .finally(() => {
        profileData.uid = uid;
        event.creator = profileData;
      });

    await this.resolveFile(event.details.backgroundImage)
      .then(url => (event.details.backgroundImage = url))
      .catch(error => console.log(error));

    return event;
  };

  static pick = (obj, keys) =>
    Object.keys(obj)
      .filter(i => keys.includes(i))
      .reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {});

  static resolveFile = path =>
    new Promise((resolve, reject) => {
      if (path && typeof path !== 'undefined') {
        storage()
          .ref(path)
          .getDownloadURL()
          .then(url => resolve(url))
          .catch(error => reject(error));
      } else {
        reject('Invalid path');
      }
    });

  static getEvents = (uid, subType) =>
    new Promise((resolve, reject) => {
      firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then(async doc => {
          const eventArray = doc.get(subType);
          if (eventArray !== undefined && eventArray.length !== 0) {
            const eventData = (
              await Promise.all(
                eventArray.map(eid =>
                  firestore()
                    .collection('events')
                    .doc(eid)
                    .get(),
                ),
              )
            ).map(doc => doc.data());
            resolve(eventData);
          } else {
            resolve([]);
          }
        })
        .catch(err => reject(err));
    });

  static createEvent = (uid, data) =>
    new Promise((resolve, reject) => {
      //Add to events
      firestore()
        .collection('events')
        .add({
          details: data,
          attendees: [],
          creator: uid,
        })
        .then(docRef => {
          //Add to user
          firestore()
            .collection('users')
            .doc(uid)
            .set(
              {eventCreations: firestore.FieldValue.arrayUnion(docRef.id)},
              {merge: true},
            )
            .then(() => {
              resolve('Event was succesfully created');
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
}
