import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserStateType = {
  username: string
  nickname: string
}

const INIT_STATE: UserStateType = { username: '', nickname: '' }

const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    login(state: UserStateType, action: PayloadAction<UserStateType>) {
      return action.payload
    },
    logout() {
      return INIT_STATE
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
