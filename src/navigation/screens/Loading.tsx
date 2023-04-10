import { View, Text, StyleSheet } from 'react-native'
import font from '../../theme/font'
import colors from '../../theme/color'

const Loading = () => {
  return (
    <View style={styles.container}>
        <View>
            <Text style={{...font.color.white, ...font.size.xxxxxxxl}}>Definitely Another</Text>
            <Text style={{...font.color.orange, ...font.size.xxxxxxxl}}>Blog App</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.slate950
    }
});

export default Loading