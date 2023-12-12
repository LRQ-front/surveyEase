import React, { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logout } from '../store/userReducer'

const UserInfo: FC = () => {
  // const { data } = useRequest(getUserInfo)
  // const { username, nickname } = data || {}
  const { username, nickname } = useGetUserInfo()
  const dispatch = useDispatch()

  const navigate = useNavigate()

  function handleClick() {
    dispatch(logout())
    message.success('退出成功')
    removeToken()
    navigate(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined></UserOutlined>
        {nickname}
      </span>
      <Button type="link" onClick={handleClick}>
        退出
      </Button>
    </>
  )

  const LoginInfo = <Link to={LOGIN_PATHNAME}>登录</Link>

  return <div>{username ? UserInfo : LoginInfo}</div>
}

export default UserInfo
