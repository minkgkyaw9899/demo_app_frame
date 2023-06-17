import type {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs'

export type RootStackParamList = {
  Splash: undefined
  Login: undefined
  Register: undefined
  BottomTab: NavigatorScreenParams<TabParamList>
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>

export type TabParamList = {
  HomeTab: undefined
  PostTab: undefined
  ProfileTab: undefined
}

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>

declare global {
  namespace ReactNavigation {
    export interface RootParamList extends RootStackParamList {}
  }
}
