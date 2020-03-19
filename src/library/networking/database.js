import firebase from "react-native-firebase";


export const getUser = () => { return firebase.auth().currentUser };

export const setupAccount = (uid, profile) => {
  let profilePath = "/users/" + uid;
  firebase.database().ref(profilePath).set({ profile })
};

export async function getProfileData(uid) {
  const ref = firebase.database().ref("/users/" + uid + "/profile");
  const snapshot = await ref.once("value");
  return snapshot.val()
}
