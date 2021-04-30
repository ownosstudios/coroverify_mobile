import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {Text, View} from 'react-native'
import styles from "assets/styles/landingPage";
import { NavigationContainer } from '@react-navigation/native';
import loginScreen from "./screens/loginScreen";
import registerScreen from "./screens/registerScreen";
// import addChat from "./screens/addChat";
// import chatScreen from "./screens/chatScreen";
// import homeScreen from "./screens/homeScreen";
import { createStackNavigator } from "@react-navigation/stack";
// import * as firebase from 'firebase';
// import 'firebase/firestore';
// import 'firebase/auth';
import firebase from './firebase';

// https://github.com/FormidableLabs/react-native-app-auth

const Stack = createStackNavigator();

//Global (General) Screen Options and Styles - currently for the App Header
const globalScreenOptions = {
	headerStyle: { backgroundColor: "#2C6BED" },
	headerTitleStyle: { color: "white"},
	headerTintColor: "white", 
};

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home" screenOptions={globalScreenOptions}>
				<Stack.Screen name='Login' component={loginScreen} />
				<Stack.Screen name='Register' component={registerScreen} />
				{/* <Stack.Screen name='Home' component={homeScreen} /> //Home Screen */}
				{/* <Stack.Screen name='AddChat' component={addChat} /> //New Chat Screen */}
				{/* <Stack.Screen name='Chat' component={chatScreen} /> //New Chat Screen */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}