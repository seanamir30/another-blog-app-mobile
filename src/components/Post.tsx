import { Text, View, StyleSheet, Pressable } from 'react-native';
import font from '../theme/font'
import colors from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface PostType {
    id: string,
    title: string,
    body?: string,
    timestamp: number
}

interface PostPropsType {
    post: PostType,
    isLast: boolean,
}

const Post = ({ post, isLast }: PostPropsType) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const handleNavigate = () => {
        navigation.navigate('ViewPost', post)
    }

    return (
        <Pressable onPress={handleNavigate} style={{...styles.container, marginBottom: isLast ? 64 : 0}}>
            <View style={styles.header}>
                <Text style={{...font.color.white, ...font.size.xl}}>{post.title}</Text>
                <Text style={{...font.color.white, ...font.size.sm, ...font.weight.extralight, ...font.style.italic}}>{new Date(post.timestamp * 1000).toDateString()}</Text>
                <Text style={{...font.color.white, ...font.size.sm, ...font.weight.extralight, ...font.style.italic}}>{new Date(post.timestamp * 1000).toLocaleTimeString()}</Text>
            </View>
            {post.body && 
                <Text numberOfLines={4} ellipsizeMode='tail' style={{...font.color.white}}>{post.body.replace(/\n/g, '')}</Text>
            }
        </Pressable>
    )
}

export default Post

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.slate800,
        borderWidth: 1,
        borderColor: colors.slate600,
        borderRadius: 6,
        padding: 12,
        marginTop: 12,
    },
    header: {
        paddingBottom: 8,
    }
})