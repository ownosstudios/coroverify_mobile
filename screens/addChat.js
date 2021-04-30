import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements';
import { Icon } from 'react-native-vector-icons/FontAwesome';

const addChat = ({ navigation }) => {
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a New Chat",
            headerBackTitle: "Chats",

        });
    }, [navigation]);

    const createChat = async () => {
        await db.collection('chats').add({
            chatName:input
        }).then(() => {
            navigation.goBack()
        }).catch((error) => alert(error));
    }

    return (
        <View style={styles.container}>
            <Input 
                placeholder="Enter a chat name"
                value={input}
                onChangeText={(text) => setInput(text)}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black" />
                }
                onSubmitEditing={createChat}
            />
            <Button disabled={!input} onPress={createChat} title="Create New Chat" />
        </View>
    )
}

export default addChat;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    },
});
