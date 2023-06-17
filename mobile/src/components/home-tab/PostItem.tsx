import {Text, View} from 'react-native'
import React, {FC} from 'react'
import {PostObj} from 'src/@types/posts/types'

interface Props {
  item: PostObj
  index: number
}

export const PostItem: FC<Props> = ({item, index}) => (
  <View style={{paddingHorizontal: 16}}>
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
        <Text style={{fontSize: 16}}>{index + 1}.&nbsp;</Text>
        <Text style={{fontSize: 18}}>{item.title}</Text>
      </View>
      <Text>Post by</Text>
    </View>
    <Text style={{fontSize: 14}}>{item.body}</Text>
  </View>
)
