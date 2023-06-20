import React, {useEffect} from 'react'
import 'react-native-gesture-handler'
import {StatusBar} from 'react-native'
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging'
import {PersistGate} from 'redux-persist/integration/react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {NavigationContainer} from '@react-navigation/native'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Provider} from 'react-redux'
import {PERMISSIONS, request} from 'react-native-permissions'

import RootStackNavigator from 'navigations/RootStackNavigator'
import {defaultQueryOptions} from 'config/reactQueryConfig'
import {toastConfig} from 'config/toastConfig'
import store, {persistor} from './store'
import {SplashContainer} from 'components/splash/SplashContainer'

const client = new QueryClient({
  defaultOptions: defaultQueryOptions,
})

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
          <QueryClientProvider client={client}>
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
