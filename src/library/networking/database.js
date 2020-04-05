import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class db {
  static getUser = () => {
    return Promise.resolve(auth().currentUser);
  };

  static checkUserExists = user =>
    new Promise((resolve, reject) => {
      firestore()
        .collection('users')
        .doc(user.uid)
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
          }
          // profile does exist, let's update the fields
          await transaction.update(ref, profile);
        })
        .then(() => {
          resolve('Account was successfully updated');
        })
        .catch(error => {
          reject(error);
        });
    });

  static getProfileData = uid =>
    new Promise((resolve, reject) => {
      firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then(doc => {
          resolve(doc.data());
        })
        .catch(error => reject(error));
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

  static parseEventData = data =>
    new Promise(async (resolve, reject) => {
      const profileKeys = ['userName', 'profilePicture'];
      const eventKeys = [
        'title',
        'qrCode',
        'title',
        'type',
        'backgroundColor',
        'backgroundImage',
      ];
      const redux = (array, keys) =>
        array.map(o =>
          keys.reduce((acc, curr) => {
            acc[curr] = o[curr];
            return acc;
          }, {}),
        );

      const userIDs = data.map(val => val.creator);
      const profileData = redux(
        await Promise.all(userIDs.map(id_ => this.getProfileData(id_))),
        profileKeys,
      );
      const eventDetails = redux(
        data.map(val => val.details),
        eventKeys,
      );

      let finalData = profileData.map((item, index) =>
        Object.assign({}, item, eventDetails[index]),
      );

      resolve(finalData);
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
}
