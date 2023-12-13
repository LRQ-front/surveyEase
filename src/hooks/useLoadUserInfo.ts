import { useState, useEffect } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { useDispatch } from 'react-redux'
import { useRequest } from 'ahooks'
import { getUserInfo } from '../service/user'
import { login } from '../store/userReducer'
import { useLocation } from 'react-router-dom'
import { isLoginOrRegister } from '../router'
import { getToken } from '../utils/user-token'

//加载用户数据
export default function useLoadUserInfo() {
  const [waitUserData, setWaitUserData] = useState(true)
  const dispatch = useDispatch()
  const { pathname } = useLocation()

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

    const token = getToken()

    //防止退出后又登录了
    if (!username && isLoginOrRegister(pathname) && !token) {
      setWaitUserData(false)
      return
    }

    //加载用户信息必须在有登录过之后才能加载，即必须有token的情况
    if (token) {
      //没有则，进行获取用户数据
      run()
    }
    setWaitUserData(false)
  }, [username, pathname, waitUserData])

  return { waitUserData }
}
