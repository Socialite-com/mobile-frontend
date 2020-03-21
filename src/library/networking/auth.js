import AsyncStorage from "@react-native-community/async-storage";
import firebase from "react-native-firebase";

const USER_KEY = "auth-demo-key";

export default class auth {

  static verifyUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) { user.getIdToken().then(key => { this.onSignIn(key) }) }
     });
  };

  static onSignIn = (user_key) => new Promise(() => {
    AsyncStorage.setItem(USER_KEY, user_key);
  });

  static onSignOut = () => new Promise(() => {
    firebase.auth().signOut().catch(error => alert(error));
    AsyncStorage.removeItem(USER_KEY);
  });

  static async isSignedIn() {
    await this.verifyUser();
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

}
