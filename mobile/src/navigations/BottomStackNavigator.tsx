import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {TabParamList} from 'src/@types/react-navigation/types'
import {HomeTabScreen} from 'screens/tabs/home/homeTabScreen'
import {ProfileTabScreen} from 'screens/tabs/profile/ProfileTabScreen'
import {
  AccountIcon,
  AccountOutlineIcon,
  HomeIcon,
  HomeOutlineIcon,
  PlusIcon,
  PlusOutlineIcon,
} from 'components/common/Icon'
import {PostsTabScreen} from 'screens/tabs/posts/postsTabScreen'

const Stack = createBottomTabNavigator<TabParamList>()

export default function BottomTabNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Stack.Screen
        name={'HomeTab'}
        component={HomeTabScreen}
        options={{
          tabBarIcon: ({focused}) => (focused ? <HomeIcon /> : <HomeOutlineIcon />),
        }}
      />
      <Stack.Screen
        name={'PostTab'}
        component={PostsTabScreen}
        options={{
          tabBarIcon: ({focused}) => (focused ? <PlusIcon /> : <PlusOutlineIcon />),
        }}
      />
      <Stack.Screen
        name={'ProfileTab'}
        component={ProfileTabScreen}
        options={{
          tabBarIcon: ({focused}) => (focused ? <AccountIcon /> : <AccountOutlineIcon />),
        }}
      />
    </Stack.Navigator>
  )
}
