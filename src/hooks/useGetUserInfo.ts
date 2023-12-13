import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../store'

export default function useGetUserInfo() {
  const { username, nickname } = useAppSelector(
    state => ({
      username: state.user.username,
      nickname: state.user.nickname,
    }),
    shallowEqual
  )

  return { username, nickname }
}
