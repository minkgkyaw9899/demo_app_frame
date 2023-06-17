import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'store'
import {UserObj} from 'src/@types/users/types'

interface AuthUserState {
  user?: UserObj
  token?: string
}

type LoginAuthUserPayload = {
  user: UserObj
  token: string
}

const initialState: AuthUserState = {
  user: undefined,
  token: undefined,
}

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<LoginAuthUserPayload>) => {
      state = {...action.payload}
      return state
    },
    logoutUser: state => {
      state = initialState
      return state
    },
  },
})

export const {loginUser, logoutUser} = authUserSlice.actions

export const selectedAuthUser = (state: RootState) => state.authUser

export default authUserSlice.reducer
