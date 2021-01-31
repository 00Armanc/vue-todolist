import firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAxGztv14WHGY4OfxykJDCDV8TGLS1wlgQ",
    authDomain: "todo-list-b70ba.firebaseapp.com",
    projectId: "todo-list-b70ba",
    storageBucket: "todo-list-b70ba.appspot.com",
    messagingSenderId: "59805607818",
    appId: "1:59805607818:web:899563553c702357358a73"
};

const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()
firestore.settings({ timestampsInSnapshots: true })

export default firestore