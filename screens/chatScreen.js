import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native'
import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { Keyboard } from 'react-native'
import * as firebase from 'firebase'
import { db, auth } from '../firebase'
//import { firebase } from 'react-native-firebase'

const chatScreen = ( navigation, route ) => {
    
    const [input, setInput ] = useState('');
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",     
                }}>
                    <Avatar 
                        rounded
                        source={{ 
                            uri: messages[0]?.data.photoURL || 
                            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png", 
                        }}
                    />
                    <Text
                        style={{ color:"white", marginLeft:10, fontWeight: "700"}}
                    >
                        {route.params.chatName}
                    </Text>
                </View>
            ),

            headerRight: () => (
                <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" /> 
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="call" size={24} color="white" /> 
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation, messages]);

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimeStamp(),
            message: input, 
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput("");
    }

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).
        collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot 
        => setMessages(
            snapshot.doc.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))

        return unsubscribe;
    }, [route])
 
    return (
        <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: "white",
        }}
        >
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? 'padding' : "height" }
                style={styles.container}
                keyboardVerticalOffset={90}
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                        {messages.map(({id, data}) => (
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.receiver}>
                                    <Avatar 
                                        rounded
                                        size={30}
                                        position="absolute"
                                        containerStyle={{ //for WEB
                                            position="absolute",
                                            bottom: -15,
                                            right: -5,
                                        }}
                                        bottom={-15}
                                        right={-5}
                                        source={{
                                            uri: data.photoURL,

                                        }}
                                    />
                                    <Text style={styles.receiverText}>{data.message}</Text>
                                </View>
                            ):(
                                <View style={styles.sender}>
                                    <Avatar 
                                        rounded
                                        size={30}
                                        position="absolute"
                                        containerStyle={{ //for WEB
                                            position="absolute",
                                            bottom: -15,
                                            left: -5,
                                        }}
                                        bottom={-15}
                                        left={-5}
                                        source={{
                                            uri: data.photoURL,

                                        }}
                                    />
                                    <Text style={styles.senderText}>{data.message}</Text>
                                    <Text style={styles.senderName}>{data.displayName}</Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput value={input} onSubmitEditing={sendMessage} onChangeText={text => setInput(text)} placeholder="Message" style={styles.textInput} /> 
                    </View>
                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                        <Ionicons name="send" size={24} color="#2B68E6" />
                    </TouchableOpacity>
                </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default chatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0, 
        height: 40, 
        flex: 1, 
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10, 
        color: "grey",
        borderRadius: 30,
    },

    receiver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },

    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },

    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },

    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
    },

    receiverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
    }
})
