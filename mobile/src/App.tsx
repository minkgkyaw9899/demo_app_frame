import React, {useEffect} from 'react'
import 'react-native-gesture-handler'
import { StatusBar } from 'react-native'
import Toast from 'react-native-toast-message'

import messaging from '@react-native-firebase/messaging'
import {PersistGate} from 'redux-persist/integration/react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {NavigationContainer} from '@react-navigation/native'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Provider} from 'react-redux'
import {PERMISSIONS, request} from 'react-native-permissions'
=======
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'


import RootStackNavigator from 'navigations/RootStackNavigator'
import { toastConfig } from 'config/toastConfig'
import store, { persistor } from './store'
import { SplashContainer } from 'components/splash/SplashContainer'
import { queryClient } from 'libs/react-query/reactQuery'

const App = () => {
  useEffect(() => {
    request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(result => {
      console.log(result)
    })
  }, [])

  useEffect(() => {
    pushNotification().then(r => r)

    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
    // })

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage)
    })

    // return unsubscribe
  }, [])

  const pushNotification = async () => {
    const token = await messaging().getToken()
    // console.log('token', token)
  }
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={<SplashContainer />} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <StatusBar backgroundColor={'#f5f5f5'} barStyle={'dark-content'} />
              <RootStackNavigator />
            </NavigationContainer>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
      <Toast config={toastConfig} visibilityTime={2000} topOffset={16} />
    </SafeAreaProvider>
  )
}

export default App
