import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyB7oocuEEeoxX4U052fw4M_CddzBCPzQGs",
    authDomain: "arduino-bd08f.firebaseapp.com",
    projectId: "arduino-bd08f",
    storageBucket: "arduino-bd08f.appspot.com",
    messagingSenderId: "974394158311",
    appId: "1:974394158311:web:89157b420645dd85790642"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;