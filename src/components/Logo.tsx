import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'
import { Space, Typography } from 'antd'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { MANAGE_INDEX_PATHNAME } from '../router'
const { Title } = Typography

const Logo: FC = () => {
  const [pathname, setPathname] = useState('/')
  const { username } = useGetUserInfo()

  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME)
    }
  }, [username])

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <img className={styles.img} src={require('../assets/img/logo.png')}></img>
          <Title>Star问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
