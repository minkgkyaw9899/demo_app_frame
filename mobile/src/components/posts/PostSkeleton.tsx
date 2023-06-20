import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import React from 'react'
import {View} from 'react-native'

export const PostSkeleton = () => (
  <View style={{paddingHorizontal: 16}}>
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        {/*<SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />*/}
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={120} height={20} />
          <SkeletonPlaceholder.Item marginTop={6} width={300} height={40} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </View>
)
