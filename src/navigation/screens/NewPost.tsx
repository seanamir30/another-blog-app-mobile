import { View, Text, StyleSheet, Pressable, TextInput } from "react-native"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../App';
import font from "../../theme/font";
import colors from "../../theme/color";
import { useState } from 'react'
import { savePost } from "../../features/post";


type Props = NativeStackScreenProps<RootStackParamList, 'NewPost'>;

const NewPost = ({ navigation }: Props) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState('')

    const handlePost = async (title: string, body?: string) => {
        if(!title){
            setError('Please enter a title')
            return
        }
        await savePost(title, body)
        navigation.navigate('Dashboard')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={()=>navigation.navigate('Dashboard')}>
                    <Text style={{...font.color.white}}>
                        Cancel
                    </Text>
                </Pressable>
                <Pressable onPress={()=> handlePost(title, body)} style={styles.postButton}>
                    <Text style={font.color.white}>
                        Post
                    </Text>
                </Pressable>
            </View>
            <View style={styles.textInputTitleContainer}>
            <TextInput value={title} onChangeText={setTitle} autoFocus={true} placeholderTextColor={colors.slate400} keyboardAppearance="dark" style={styles.textInputTitle} placeholder="What's the headline?"/>
            </View>
            {error && 
                <Text style={{color: colors.red, paddingHorizontal: 32, ...font.size.sm}}>{error}</Text>
            }
            <View style={styles.textInputContainer}>
            <TextInput multiline={true} onChangeText={setBody} placeholderTextColor={colors.slate400} textAlignVertical="top" keyboardAppearance="dark" style={styles.textInput} placeholder="Pour down your feelings here!"/>
            </View>
        </View>
    )
}

export default NewPost

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      height: 44,
      alignItems: 'center',
      justifyContent: 'space-between', 
      width: '100%',
      paddingHorizontal: 16,
    },
    postButton: {
        backgroundColor: colors.orange,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 100,
    },
    container: {
        backgroundColor: colors.slate950,
        flex: 1,
        paddingTop: 59,
    },
    textInputTitleContainer: {
        paddingTop: 16,
        paddingHorizontal: 32,
        width: '100%'
    },
    textInputContainer: {
        paddingHorizontal: 32,
        height: '50%',
        width: '100%'
    },
    textInputTitle: {
        ...font.size.xl,
        ...font.weight.medium,
        ...font.color.white,
    },
    textInput: {
        ...font.size.lg,
        ...font.color.white,
        height: '100%',
    }
});