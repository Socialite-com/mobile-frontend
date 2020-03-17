import firebase from "react-native-firebase";


export const getUser = () => { return firebase.auth().currentUser };

export const setupAccount = (uid, userName, password) => {
  let profilePath = "/users/" + uid + "/profile";
  firebase.database().ref(profilePath).set({
    userName: userName,
    password: password
  })
};

export async function getProfileData(uid) {
  const ref = firebase.database().ref("/users/" + uid + "/profile");
  const snapshot = await ref.once("value");
  return snapshot.val()
}