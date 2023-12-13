import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'
import { Button, Typography } from 'antd'
import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import useGetUserInfo from '../hooks/useGetUserInfo'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const navigate = useNavigate()
  const { username } = useGetUserInfo()

  function handleStart() {
    if (username) {
      navigate(MANAGE_INDEX_PATHNAME)
    } else {
      navigate(LOGIN_PATHNAME)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷100份，发布问卷90份，收到问卷980份</Paragraph>
        <div>
          <Button type="primary" onClick={handleStart}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
