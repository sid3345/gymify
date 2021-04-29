// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyAeaxjsWWXXy5HQ4UB7eDEcetbn12W4iOA",
    authDomain: "gymify-6d484.firebaseapp.com",
    projectId: "gymify-6d484",
    storageBucket: "gymify-6d484.appspot.com",
    messagingSenderId: "540972544180",
    appId: "1:540972544180:web:48b023a2e1e2519d3527e1",
    measurementId: "G-NCHKG85G8T"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore()
  const auth = firebase.auth()

  export {db , auth}