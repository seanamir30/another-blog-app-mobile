import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Header from './src/components/Header';
import { PostType } from './src/components/Post';
import CustomHeaderBackButton from './src/components/CustomHeaderBackButton';
import colors from './src/theme/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

import Dashboard from './src/navigation/screens/Dashboard';
import NewPost from './src/navigation/screens/NewPost';
import ViewPost from './src/navigation/screens/ViewPost';
import Initial from './src/navigation/screens/Initial';
import Loading from './src/navigation/screens/Loading';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Dashboard: undefined;
  NewPost: undefined;
  ViewPost: PostType;
  Initial: undefined;
  Loading: undefined;
};

export default function App() {
  const [hasUser, setHasUser] = useState<'loading' | boolean>('loading')

  useEffect(() => {
    const getName = async () => {
      const username = await AsyncStorage.getItem('name')
      setHasUser(!!username)
    }
    getName()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {hasUser === 'loading' ? 
          <Stack.Screen
            name="Loading"
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          >
            {()=> <Loading/>}
          </Stack.Screen>

        :
            <>
            {
              hasUser ? 
              <>
              <Stack.Screen 
                name="Dashboard" 
                options={{
                  headerStyle: { backgroundColor:colors.slate950 },
                  headerTitle: () => <Header/>,
                  headerBackVisible: false,
                  gestureEnabled: false
                }}
              >
                {(props) => <Dashboard {...props}/>}
              </Stack.Screen>
              <Stack.Screen 
                name="Initial" 
                options={{
                  headerStyle: { backgroundColor:colors.slate950 },
                  headerBackVisible: false,
                  headerShown: false,
                }}
              >
                {(props) => <Initial {...props}/>}
              </Stack.Screen>
              </>
              :
              <>
              <Stack.Screen 
                name="Initial" 
                options={{
                  headerStyle: { backgroundColor:colors.slate950 },
                  headerBackVisible: false,
                  headerShown: false,
                }}
              >
                {(props) => <Initial {...props}/>}
              </Stack.Screen>
              <Stack.Screen 
                name="Dashboard" 
                options={{
                  headerStyle: { backgroundColor:colors.slate950 },
                  headerTitle: () => <Header/>,
                  headerBackVisible: false,
                  gestureEnabled: false
                }}
              >
                {(props) => <Dashboard {...props}/>}
              </Stack.Screen>
              </>
            }
            <Stack.Screen 
                name="NewPost" 
                options={{
                  headerStyle: { backgroundColor:colors.slate950 },
                  headerBackVisible: false,
                  headerShown: false,
                  presentation: 'transparentModal'
                }}
              >
                {(props) => <NewPost {...props}/>}
            </Stack.Screen>
            <Stack.Screen 
                name="ViewPost" 
                options={{
                  headerStyle: { backgroundColor:colors.slate950 },
                  headerTitle: () => <Header/>,
                  headerLeft: ()=> <CustomHeaderBackButton/>,
                }}
              >
                {(props) => <ViewPost {...props}/>}
            </Stack.Screen>
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}


