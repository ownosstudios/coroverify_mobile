import {font,colors} from "./vars"
import {StyleSheet} from 'react-native'

const fontColor = {
    color: colors.text
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary
    },
    text: {
        fontSize: 20,
        fontFamily: font.secondary,
        ...fontColor
    },
    heading: {
        fontFamily: font.primary,
        fontSize: 40,
        ...fontColor
    }
})

export default styles