import { useState, useEffect } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { useDispatch } from 'react-redux'
import { useRequest } from 'ahooks'
import { getUserInfo } from '../service/user'
import { login } from '../store/userReducer'

//加载用户数据
export default function useLoadUserInfo() {
  const [waitUserData, setWaitUserData] = useState(true)
  const dispatch = useDispatch()

  const { run } = useRequest(getUserInfo, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      dispatch(login({ username, nickname }))
    },
    onFinally() {
      setWaitUserData(false)
    },
  })

  const { username } = useGetUserInfo()

  useEffect(() => {
    //判断redux中是否存在用户信息了
    if (username) {
      setWaitUserData(false)
      return
    }
    //没有则，进行获取用户数据
    run()
  }, [username])

  return { waitUserData }
}
