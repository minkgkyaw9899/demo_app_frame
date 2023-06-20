import { InfiniteData, useMutation } from '@tanstack/react-query'
import { RootStackScreenProps } from 'src/@types/react-navigation/types'
import { mutationKey } from 'constants/mutationKey'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TypeOf, object, string } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PostCreateObj, PostObj } from 'src/@types/posts/types'
import { createPost } from 'services/mutations/postMutations'
import { showSuccessToast } from 'utils/showToast'
import { useNavigation } from '@react-navigation/native'
import { queryKey } from 'constants/queryKey'
import { InfiniteDataResponse } from 'utils/infiniteDataHelpers'
import { queryClient } from 'libs/react-query/reactQuery'

const schema = object({
    title: string({ required_error: 'Title is required!' }).min(3, 'Minimum character is 3!'),
    body: string({ required_error: 'Post\'s body is required!' }).min(5, 'Minimum character is 5!')
})

type FormData = TypeOf<typeof schema>

type Navigator = RootStackScreenProps<'BottomTab'>['navigation']

export const useCreatePost = () => {

    const navigation = useNavigation<Navigator>()

    const createPostForm = useForm<FormData>({
        defaultValues: {
            title: undefined,
            body: undefined
        },
        resolver: zodResolver(schema)
    })

    const { isLoading, mutate } = useMutation({
        mutationKey: [mutationKey.createPost],
        mutationFn: createPost,
        onSuccess: (data) => {
            createPostForm.reset()
            showSuccessToast('Successfully Created!')

            queryClient.setQueryData([queryKey.posts], (prevDatas): InfiniteData<InfiniteDataResponse<PostObj[]>> => {
                const _prevDatas = prevDatas as InfiniteData<InfiniteDataResponse<PostObj[]>>
                if (!prevDatas) {
                    return {
                        pageParams: [..._prevDatas.pageParams],
                        pages: [{ ..._prevDatas.pages[0], data: [data.post] }]
                    }
                }
                return {
                    pageParams: [..._prevDatas.pageParams],
                    pages: [{ ..._prevDatas.pages[0], data: [data.post, ..._prevDatas.pages[0].data] }]
                }
            })

            return navigation.replace('BottomTab', { screen: 'HomeTab' })
        }
    })

    const onSubmit: SubmitHandler<FormData> = (data: PostCreateObj): void => {
        mutate(data)
    }

    return { createPostForm, isLoading, onSubmit }
}