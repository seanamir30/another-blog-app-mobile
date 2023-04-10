import { View, Text, StyleSheet } from "react-native"
import font from "../theme/font"
import { useState, useEffect } from 'react'
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { getUser } from '../features/user';

const Header = () => {
  const [username, setUsername] = useState('')
  const isFocused = useIsFocused()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    const getName = async () => {
      const name = await getUser()
      if(!name){
        navigation.navigate('Initial')
      } else {
        setUsername(name)
      }
    }

    getName()
  }, [isFocused])
  
  return (
    <View style={styles.header}>
        <Text style={{...font.size.lg, ...font.color.white}}>
        Definitely a
        <Text style={{...font.weight.extralight, ...font.color.orange}}> blog </Text>
        for{' '}
        <Text style={{...font.weight.bold, ...font.color.orange, ...font.decoration.underlined}}>{username} </Text>
        </Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
    },
});