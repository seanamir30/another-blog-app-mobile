import { StyleSheet, Text, View, FlatList, Pressable, Image, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import font from '../../theme/font'
import Post, { PostType } from '../../components/Post';
import colors from '../../theme/color';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../App';
import { useEffect, useState } from 'react'
import { getPosts } from '../../features/post';
import { useIsFocused } from '@react-navigation/native';
import ui from '../../theme/ui';
import { deleteUser } from '../../features/user';
import { exportJSON, importJSON } from '../../features/post';


type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const Dashboard = ({ navigation }: Props) => {
  const [posts, setPosts] = useState<PostType[]>([])
  const isFocused = useIsFocused()

  useEffect(() => {
      getPosts().then((res) => {
        setPosts(res)
      })
  }, [isFocused])

  const handleDeleteUser = () => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete you user account?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteUser()
            navigation.navigate('Initial')
          }
        }
      ],
      {cancelable: false}
    )
  }

  const handleImpostJSON = async () => {
    setPosts(await importJSON() || [])
    
  }
  
  return (
    <View style={styles.container}>
      {!posts.length &&
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={font.color.white}>You should definitely start blogging</Text>
        </View>
      }
        <FlatList
          data={posts.sort((a,b) => b.timestamp - a.timestamp)}
          keyExtractor={(item)=>item.id}
          renderItem={(post) => <Post isLast={post.index === posts.length-1} post={post.item}/>}
        />
        <View style={styles.nav}>
          <Pressable onPress={async ()=> await handleImpostJSON()}>
            <Image
              style={ui.icon}
              source={require('../../assets/upload.png')}
            />
        </Pressable>
        <Pressable onPress={async()=> await exportJSON(posts)}>
          <Image
            style={ui.icon}
            source={require('../../assets/save.png')}
          />
        </Pressable>
        <Pressable onPress={handleDeleteUser}>
          <Image
              style={ui.icon}
              source={require('../../assets/remove-user.png')}
            />
        </Pressable>
        </View>
        <Pressable onPress={()=>navigation.navigate('NewPost')} style={styles.floatingButton}>
          <Text style={{textAlign: 'center', ...font.color.white, ...font.size.xl}}>
            +
          </Text>
        </Pressable>
        <StatusBar style="light" />
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.slate950,
      paddingHorizontal: 16,
    },
    nav: {
      flexDirection: 'row',
      backgroundColor: colors.slate950,
      alignItems: 'center',
      justifyContent: 'space-around',
      height: Platform.OS === 'ios' ? 82 : 64,
      paddingBottom: Platform.OS === 'ios' ? 34 : 0,
    },
    floatingButton: {
      position: 'absolute',
      backgroundColor: 'orange',
      alignContent: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      bottom: 96,
      right: 12,
      width: 60,
      height: 60,
    }
});