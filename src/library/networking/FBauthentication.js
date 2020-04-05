import {AccessToken, LoginManager} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import db from './database';

// Calling the following function will open the FB login dialogue:
export const facebookLogin = () =>
  new Promise(async (resolve, reject) => {
    try {
      LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        async result => {
          if (result.isCancelled) {
            // handle this however suites the flow of your app
            alert('User cancelled request');
          } else if (result.declinedPermissions.length !== 0) {
            console.log(
              `Declined permissions: ${result.declinedPermissions.toString()}`,
            );
          } else if (result.grantedPermissions.length > 0) {
            console.log(
              `Login success with permissions: ${result.grantedPermissions.toString()}`,
            );

            // get the access token
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              // handle this however suites the flow of your app
              reject(
                new Error(
                  'Something went wrong obtaining the users access token',
                ),
              );
            }

            // create a new firebase credential with the token
            const credential = auth.FacebookAuthProvider.credential(
              data.accessToken,
            );

            // login with credential
            const firebaseUserCredential = await auth().signInWithCredential(
              credential,
            );

            // check if user already exists and save profile data
            const user = firebaseUserCredential.user;

            db.checkUserExists(user)
              .then(() => {
                const data = {userName: user.displayName};
                db.setupAccount(user.uid, data)
                  .then(success => {
                    console.log(success);
                    resolve(200);
                  })
                  .catch(err => alert(err));
              })
              .catch(err => alert(err));
          }
        },
      );

      // console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
    } catch (e) {
      resolve(500);
    }
  });
