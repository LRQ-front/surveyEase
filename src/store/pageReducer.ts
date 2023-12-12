import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type pageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
}

const INIT_STATE: pageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo(state: pageInfoType, { payload }: PayloadAction<pageInfoType>) {
      //这里不能用state=payload
      return payload
    },
    changePageTitle(state: pageInfoType, { payload }: PayloadAction<{ title: string }>) {
      state.title = payload.title
    },
  },
})

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions

export default pageInfoSlice.reducer
