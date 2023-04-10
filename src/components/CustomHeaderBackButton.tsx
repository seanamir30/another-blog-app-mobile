import { Pressable, Image } from 'react-native' 
import ui from '../theme/ui'
import { useNavigation } from '@react-navigation/native'
const CustomHeaderBackButton = () => {

    const navigation = useNavigation()
  return (
    <Pressable onPress={()=>navigation.goBack()}>
        <Image source={require('../assets/arrow-left.png')} style={{...ui.icon, height: 16, width: 16}}/>
    </Pressable>
  )
}

export default CustomHeaderBackButton