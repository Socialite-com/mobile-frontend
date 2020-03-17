import AsyncStorage from "@react-native-community/async-storage";
import firebase from "react-native-firebase";

export const USER_KEY = "auth-demo-key";

export const verifyUser = () => {
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then(key => { onSignIn(key) });
      }
   });
};

export const onSignIn = (user_key) => new Promise(() => {
  AsyncStorage.setItem(USER_KEY, user_key);
});

export const onSignOut = () => new Promise(() => {
  firebase.auth().signOut().catch(error => alert(error));
  AsyncStorage.removeItem(USER_KEY);
});

export async function isSignedIn() {
  await verifyUser();
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
}