import { View, Text, StyleSheet, Pressable, Image, Alert } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import colors from "../../theme/color";
import font from "../../theme/font";
import { deletePost } from "../../features/post";

type Props = NativeStackScreenProps<RootStackParamList, 'ViewPost'>;

const ViewPost = ({ route, navigation }: Props) => {
    const { title, body, timestamp, id } = route.params;

    const handleDelete = async () => {
        Alert.alert(
            'Delete Post',
            'Are you sure you want to delete this post?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        await deletePost(id)
                        navigation.navigate('Dashboard')
                    }
                }
            ],
            {cancelable: false}
        )
    }
  return (
    <View style={styles.container}>
        <View style={styles.headingContainer}>
            <View>
                <Text style={{ ...font.color.white, ...font.size.xl, ...font.textTransform.capitalize}}>{title}</Text>
                <View>
                    <Text style={{ ...font.style.italic, color: colors.slate400, ...font.weight.extralight }}>{new Date(timestamp * 1000).toDateString()}</Text>
                    <Text style={{ ...font.style.italic, color: colors.slate400, ...font.weight.extralight }}>{new Date(timestamp * 1000).toLocaleTimeString()}</Text>
                </View>
            </View>
            <Pressable onPress={handleDelete}>
                <Image
                    style={styles.icon}
                    source={require('../../assets/trashcan.png')}
                />
            </Pressable>
        </View>
        {body &&
            <Text style={{ ...font.color.white }}>{body}</Text>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.slate950,
        flex: 1,
        gap: 8,
        paddingHorizontal: 16,
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        tintColor: colors.white,
        height: 24,
        width: 24
    }
})

export default ViewPost