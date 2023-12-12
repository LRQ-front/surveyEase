import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import componentReducer from './componentsReducer'
import pageInfoReducer from './pageReducer'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import undoable, { excludeAction } from 'redux-undo'

const store = configureStore({
  reducer: {
    user: userReducer,
    components: undoable(componentReducer, {
      limit: 20,
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'component/selectPrevComponent',
        'component/selectNextComponent',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
})

type GetStateFnType = typeof store.getState
type RootState = ReturnType<GetStateFnType>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
