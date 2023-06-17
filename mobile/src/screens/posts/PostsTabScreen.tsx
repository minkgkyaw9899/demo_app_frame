import React, {type FC} from 'react'
import {TabScreenProps} from 'src/@types/react-navigation/types'
import {Text, View} from 'react-native'

type Props = TabScreenProps<'PostTab'>

export const PostsTabScreen: FC<Props> = () => {
  return (
    <View>
      <Text>Hello from Posts list tab screen</Text>
    </View>
  )
}
