import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBnmplnxWU54IlpVGhz8z7HwhK_0tE8010",
  authDomain: "sf-chat-c9d7d.firebaseapp.com",
  projectId: "sf-chat-c9d7d",
  storageBucket: "sf-chat-c9d7d.appspot.com",
  messagingSenderId: "149652922142",
  appId: "1:149652922142:web:a8b817a98a35cf7fb7f30f",
  measurementId: "G-9SS4D3W7TM"
};


  const firebaseApp= firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;