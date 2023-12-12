import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
  isLoginOrRegister,
  isNoNeedUserInfo,
} from '../router'

//根据是否登录跳转到不同页面，防止用户已经登录可以跳转到登录页面,用于layout页面
export default function useNavPage(waitUserData: boolean) {
  const navigate = useNavigate()

  const { pathname } = useLocation()
  const { username } = useGetUserInfo()

  useEffect(() => {
    //现在已经在发送数据
    if (waitUserData) return

    //已经登录
    if (username) {
      if (isLoginOrRegister(pathname)) {
        navigate(MANAGE_INDEX_PATHNAME)
      }
      return
    }

    //未登录
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      navigate(LOGIN_PATHNAME)
    }
  }, [pathname, username, waitUserData])
}
