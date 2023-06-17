import React, {type FC, useRef} from 'react'
import {TabScreenProps} from 'src/@types/react-navigation/types'
import {RefreshControl, StyleSheet, View} from 'react-native'
import {Container} from 'components/common/Container'
import {FlashList} from '@shopify/flash-list'
import {HomeNotificationHeader} from 'components/home-tab/NotificationHeader'
import {ItemSeparator} from 'components/home-tab/ItemSeparator'
import {PostItem} from 'components/home-tab/PostItem'
import {PostObj} from 'src/@types/posts/types'
import {useScrollToTop} from '@react-navigation/native'
import {useFetchPosts} from 'screens/home/hooks/useFetchPosts'

type Props = TabScreenProps<'HomeTab'>

export const HomeTabScreen: FC<Props> = () => {
  const flashListRef = useRef<FlashList<PostObj>>(null)
  const {posts, postsQueries, refreshNewPosts, fetchNextPosts} = useFetchPosts()

  const {isRefetching, isLoading} = postsQueries

  useScrollToTop(
    useRef({
      scrollToTop: () => flashListRef.current?.scrollToOffset({offset: 0}),
    }),
  )

  return (
    <Container style={styles.rootContainer}>
      <HomeNotificationHeader />
      <View style={{flexGrow: 1}}>
        <FlashList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={{paddingTop: 24, backgroundColor: '#f5f5f5', paddingBottom: 50}}
          data={posts}
          keyExtractor={item => item.id}
          onEndReachedThreshold={2}
          estimatedItemSize={200}
          onEndReached={fetchNextPosts}
          renderItem={({item, index}) => <PostItem item={item} index={index} />}
          refreshControl={<RefreshControl refreshing={isLoading || isRefetching} onRefresh={refreshNewPosts} />}
        />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  rootContainer: {paddingHorizontal: 0},
})
