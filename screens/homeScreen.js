import React, { useEffect, useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { ImageBackground } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import CustomeListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

const homeScreen = ({ navigation }) => {
  
    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(()=>{
            navigation.replace('Login')
        });
    };

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => 
            setChats(snapshot.docs.map(docs => ({
                id: doc.id,
                data: doc.data()
            }))
            )
        );
        return unsubscribe;
    }, [])

    useLayoutEffect(({}) => {
        navigation.setOptions({
            title: "Ownos CoroVerify",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black "},
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                        <Avatar rounder source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ), 
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                
                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);
    
    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id,
            chatName,
        });
    }

    return (
        <SafeAreaView>
            <ImageBackground 
                style={styles.background}
                source={require('../assets/img/splash.png')}>    
            </ImageBackground>
            <ScrollView>
                    {chats.map(({id, data: { chatName }}) => (
                        <CustomeListItem 
                            key={id} 
                            id={id} 
                            chatName={chatName}
                            enterChat={enterChat} 
                        />
                    ))}
            </ScrollView>
        </SafeAreaView>
    )   
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        height: "100%",
    },
})

export default homeScreen