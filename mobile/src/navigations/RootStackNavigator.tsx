import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {RootStackParamList} from 'src/@types/react-navigation/types'
import {LoginScreen} from 'screens/authentication/login/loginScreen'
import {RegisterScreen} from 'screens/authentication/register/registerScreen'
import BottomTabNavigator from 'navigations/BottomStackNavigator'
import {useAppSelector} from 'hooks/useAppSelector'
import {selectedAuthUser} from 'features/authUserSlice'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootStackNavigator = () => {
  const {token} = useAppSelector(selectedAuthUser)

  return (
    <Stack.Navigator screenOptions={{animation: 'slide_from_right', headerShown: false}}>
      {/*<Stack.Screen name={'Splash'} component={SplashScreen} />*/}

      {token ? (
        <Stack.Group>
          <Stack.Screen name={'BottomTab'} component={BottomTabNavigator} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name={'Login'} component={LoginScreen} />
          <Stack.Screen name={'Register'} component={RegisterScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

export default RootStackNavigator
