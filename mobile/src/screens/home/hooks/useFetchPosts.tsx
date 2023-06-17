import {QueryClient, useInfiniteQuery} from '@tanstack/react-query'
import {queryKey} from 'constants/queryKey'
import {fetchAllPosts} from 'services/queries/postQueries'
import {extractDataFromInfinitePages} from 'utils/infiniteDataHelpers'
import {useCallback} from 'react'

export const useFetchPosts = () => {
  const queryClient = new QueryClient()

  const postsQueries = useInfiniteQuery({
    queryKey: [queryKey.posts],
    queryFn: fetchAllPosts,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: ({pagination}) => {
      return pagination.nextPage
    },
  })

  queryClient.invalidateQueries({queryKey: [queryKey.posts]}).then(r => r)

  const posts = extractDataFromInfinitePages(postsQueries.data)

  const refreshNewPosts = useCallback(async () => {
    return await postsQueries.refetch({refetchPage: (_lastPage, index) => index === 0})
  }, [postsQueries])

  const fetchNextPosts = useCallback(async () => {
    if (postsQueries.hasNextPage) {
      return await postsQueries.fetchNextPage()
    }
  }, [postsQueries])

  return {posts, postsQueries, refreshNewPosts, fetchNextPosts}
}
