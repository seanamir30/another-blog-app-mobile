import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = async (name:string) => {
    await AsyncStorage.setItem('name', name)
}

export const deleteUser = async () => {
    await AsyncStorage.clear()
}

export const getUser = async () => {
    return await AsyncStorage.getItem('name')
}