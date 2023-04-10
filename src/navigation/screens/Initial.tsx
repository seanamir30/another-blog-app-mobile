import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView, Pressable } from 'react-native'
import { RootStackParamList } from '../../../App';
import colors from '../../theme/color';
import font from '../../theme/font';
import { useState } from 'react'
import { saveUser } from '../../features/user';

type Props = NativeStackScreenProps<RootStackParamList, 'Initial'>;

const Initial = ({route, navigation}: Props) => {
    const [name, setName] = useState('')

    const handleNameSubmit = async () => {
        if(!name) return
        await saveUser(name)
        navigation.navigate('Dashboard')
        setName('')
    }

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.container}>
                <KeyboardAvoidingView behavior='position'>
                <View>
                    <Text style={{...font.color.white, ...font.size.xxxxxxxl}}>Definitely Another</Text>
                    <Text style={{...font.color.orange, ...font.size.xxxxxxxl}}>Blog App</Text>
                </View>
                <Text style={{...font.color.white}}>
                    Blog posts from this device are only saved here, other users on other device can't see it
                </Text>
                <TextInput onSubmitEditing={handleNameSubmit}  placeholderTextColor={colors.slate400} onChangeText={setName} value={name} keyboardAppearance="dark" placeholder='What should we call you?' style={styles.nameInput}/>
                {name &&
                    <Text style={{...font.color.white, ...font.style.italic, color: colors.slate300}}>Please press enter to confirm</Text>
                }
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.slate950,
        flex: 1,
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 16,
    },
    nameInput: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: colors.orange,
        fontSize: 30,
        color: colors.white,
    }
})

export default Initial