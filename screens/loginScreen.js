//import useFloatingHeaderHeight from '@react-navigation/stack/lib/typescript/src/utils/useHeaderHeight';
import React, { useState, useEffect } from 'react';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
//import {auth} from 'react-native-firebase';
import firebase from '../firebase'
// import firebase from '../firebase'

const loginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [welcome, setWelcome] = useState('')
    
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace('Home');
            }
        });
        return unsubscribe;
    }, [])
    
    const signIn = (/*email, password*/) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((auth) => {
            // console.log(something)
            setWelcome(`Hello, ${auth.user.email}`)
        })
        .catch((error)=> alert(error)); 
        
    /*    auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res)
            console.log('hogaya')
        })
        .catch((err) => {
            console.log(err)    
        })
    */
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Image 
                source={{
                    uri: "../assets/img/icon.png",
                }} 
                style = {{
                    width: 200,
                    height: 200
                }}
            />
            <Text>I am the Login Screen</Text>
            <View styles={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    autofocus 
                    type="email" 
                    value={email} 
                    onChangeText={text => setEmail(text)}
                />
                <Input 
                    placeholder="Password" 
                    secureTextEntry 
                    type="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>
            <Button 
                containerStyle={styles.button}
                title="Login"
                onPress={() => {signIn(email, password)}}
            />
            
            <Button 
                containerStyle={styles.button}
                type="outline"
                title="Register"
                onPress={() => navigation.navigate('Register')}
            />
            {welcome ?
                <Text>{welcome}</Text>
            :
                <></>
            }
            <View style={{height: 100}} />
        </KeyboardAvoidingView>
    )
}

export default loginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputeContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
});

