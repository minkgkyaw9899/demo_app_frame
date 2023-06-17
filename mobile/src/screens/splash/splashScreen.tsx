import React, {FC, useEffect} from 'react'
import {useAppSelector} from 'hooks/useAppSelector'
import {selectedAuthUser} from 'features/authUserSlice'
import {RootStackScreenProps} from 'src/@types/react-navigation/types'
import {SplashContainer} from 'components/splash/SplashContainer'

type Props = RootStackScreenProps<'Splash'>

export const SplashScreen: FC<Props> = ({navigation}) => {
  const {token} = useAppSelector(selectedAuthUser)

  useEffect(() => {
    if (token) {
      navigation.navigate('BottomTab', {screen: 'HomeTab'})
    } else {
      navigation.navigate('Login')
    }
  }, [])
  return <SplashContainer />
}
