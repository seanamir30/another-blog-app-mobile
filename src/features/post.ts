import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostType } from '../components/Post';
import generateUUID from '../utils/generateUUID';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

export const getPosts = async () => {
    const stringifiedPosts = await AsyncStorage.getItem('posts')
    if(!stringifiedPosts) return []
    return JSON.parse(stringifiedPosts) satisfies PostType[]
}

export const savePost = async ( title:string, body?:string ) => {
    const stringifiedPosts = await AsyncStorage.getItem('posts')
    const currentPost = {
        id: generateUUID(),
        title: title,
        body: body || '',
        timestamp: Math.floor(new Date().getTime() / 1000),
    }
    if(!stringifiedPosts) {
        await AsyncStorage.setItem('posts', JSON.stringify([currentPost]))
        return
    }
    await AsyncStorage.setItem('posts',(JSON.stringify([...JSON.parse(stringifiedPosts), currentPost])))
}

export const setPosts = async (posts: PostType[]) => {
    await AsyncStorage.setItem('posts', JSON.stringify(posts))
}

export const deletePost = async ( postId: string ) => {
    const stringifiedPosts = await AsyncStorage.getItem('posts')
    if(!stringifiedPosts) return

    const posts: PostType[] = JSON.parse(stringifiedPosts)
    const postIndex = posts.findIndex(post => {
        return post.id === postId
    })

    posts.splice(postIndex, 1)
    await AsyncStorage.setItem('posts', JSON.stringify(posts))
}

export const exportJSON = async (json: PostType[]) => {
    try {
        const date = new Date()
        const timestamp = date.getTime()
        const fileUri = `${FileSystem.documentDirectory}${timestamp}_Another_Blog_App.json`
        FileSystem.writeAsStringAsync(fileUri, JSON.stringify(json), {
            encoding: FileSystem.EncodingType.UTF8
        });
        const content = JSON.stringify(json);
        Sharing.shareAsync(fileUri, {UTI: content})
    } catch (err) {
        console.log('error')
    }
}

export const importJSON = async () => {
    const jsonFile  = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
    });

    if(jsonFile.type === 'success') {
        const parsedJsonFile = JSON.parse(await FileSystem.readAsStringAsync(jsonFile.uri))
        const importedPosts = parsedJsonFile.map((importedPost: any) => {
            if (
                'id' in importedPost
                && 'title' in importedPost
                && 'body' in importedPost
                && 'date' in importedPost
                && 'time' in importedPost
            )   return importedPost
        })
        const postsWithUniqueId: PostType[] = [...await getPosts(), ...importedPosts].filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
        await setPosts([...postsWithUniqueId])
        return postsWithUniqueId
    }

}