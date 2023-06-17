import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {GestureResponderEvent} from 'react-native'

export const HomeOutlineIcon = () => <Icon name={'home-variant-outline'} size={24} color={'#475569'} />

export const HomeIcon = () => <Icon name={'home-variant'} size={24} color={'#4338ca'} />

export const PlusOutlineIcon = () => <Icon name={'plus-outline'} size={24} color={'#475569'} />

export const PlusIcon = () => <Icon name={'plus-thick'} size={24} color={'#4338ca'} />

export const AccountOutlineIcon = () => <Icon name={'account-outline'} size={24} color={'#475569'} />

export const AccountIcon = () => <Icon name={'account'} size={24} color={'#4338ca'} />

export const BellIcon = () => <Icon name={'bell'} size={24} color={'#4338ca'} />

export const BellOutlineIcon = ({onPress}: {onPress?: (e?: GestureResponderEvent) => void}) => (
  <Icon onPress={onPress} name={'bell-outline'} size={24} color={'rgba(71, 85, 105, 1)'} />
)
