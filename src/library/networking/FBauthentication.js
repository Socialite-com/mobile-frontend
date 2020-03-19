import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { checkUserExists } from "./auth";
import { setupAccount } from "./database";
import firebase from 'react-native-firebase';

// Calling the following function will open the FB login dialogue:
export async function facebookLogin() {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      // handle this however suites the flow of your app
      alert('User cancelled request');
    } else {
      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        alert('Something went wrong obtaining the users access token');
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

      // check if user already exists and save profile data
      const user = firebaseUserCredential.user;

      if (await checkUserExists(user) === false) {
        const data = { userName: user.displayName };
        setupAccount(user.uid, data)
      }

      return 200
    }

    // console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
  } catch (e) {
    console.error(e);
    return 500
  }
}
