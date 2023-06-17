import {object, string, TypeOf} from 'zod'
import {useMutation} from '@tanstack/react-query'
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {mutationKey} from 'constants/mutationKey'
import {registerWithEmail} from 'services/mutations/authMutations'
import {useNavigation} from '@react-navigation/native'
import {RootStackScreenProps} from 'src/@types/react-navigation/types'
import {ErrorResponse} from 'src/@types/axios/types'
import {UserObj} from 'src/@types/users/types'
import {showErrorToast, showSuccessToast} from 'utils/showToast'
import {loginUser} from 'features/authUserSlice'
import {useAppDispatch} from 'hooks/useAppDispatch'
import {Keyboard} from 'react-native'

type FormData = TypeOf<typeof schema>

type LoginNavigator = RootStackScreenProps<'Register'>['navigation']

const schema = object({
  name: string({required_error: 'Name is required'}),
  email: string({required_error: 'Email is required'}).email('Invalid email format'),
  password: string({required_error: 'Password is required'}),
})

export const useRegisterWithEmail = () => {
  const navigation = useNavigation<LoginNavigator>()

  const dispatch = useAppDispatch()

  const registerForm = useForm<FormData>({
    defaultValues: {
      name: undefined,
      email: undefined,
      password: undefined,
    },
    resolver: zodResolver(schema),
  })

  const {isLoading, mutateAsync} = useMutation({
    mutationKey: [mutationKey.loginUser],
    mutationFn: registerWithEmail,
    onSuccess: (data: {user: UserObj; token: string}) => {
      showSuccessToast('Successful register', `Welcome back ${data.user.name}`)

      const user = data.user
      const token = data.token
      dispatch(loginUser({token, user}))

      return navigation.navigate('BottomTab', {screen: 'HomeTab'})
    },
    onError: (data: ErrorResponse['error']) => {
      return showErrorToast(`${data.status} Error`, data.message)
    },
  })

  const onSubmit: SubmitHandler<FormData> = async data => {
    Keyboard.dismiss()
    //to do fetch api
    await mutateAsync(data)
  }

  return {registerForm, onSubmit, isLoading}
}
