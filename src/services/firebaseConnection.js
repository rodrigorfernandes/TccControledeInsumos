import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyBsoB7VSVJBeMgGrHdnLAMOoIBUekZ2RQ4",
    authDomain: "tcc-de-controle-de-obra.firebaseapp.com",
    databaseURL: "https://tcc-de-controle-de-obra.firebaseio.com",
    projectId: "tcc-de-controle-de-obra",
    storageBucket: "tcc-de-controle-de-obra.appspot.com",
    messagingSenderId: "537215835345",
    appId: "1:537215835345:web:8b131e4cdf4af97f23b9f0",
    measurementId: "G-KH56RPS7L4"
  };
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  export default firebase;