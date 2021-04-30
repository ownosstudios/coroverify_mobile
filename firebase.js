import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//import { firestore } from 'react-native-firebase';
//import { DefaultTransition } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import { View } from 'react-native';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const firebaseConfig = {
    apiKey: "AIzaSyAEWca8PHejLk9vKTmP6uaP0r__swzg6Rs",
    authDomain: "intercomm-e5630.firebaseapp.com",
    projectId: "intercomm-e5630",
    storageBucket: "intercomm-e5630.appspot.com",
    messagingSenderId: "85527999476",
    appId: "1:85527999476:web:22d187787e083ade997fa1"
};

if(firebase) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Mauj Kardi</Text>
//       <StatusBar style="auto"/>
//     </View>
//   )
// }
/* 
  let app;

  if (firebase.apps.length === 0) {
    const firebaseApp = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }

//const db = app.firestore();
//const auth = firebase.auth();

export { database, auth }; */