import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import { Layout, Spin } from 'antd'
import UserInfo from '../components/UserInfo'
import Logo from '../components/Logo'
import useLoadUserInfo from '../hooks/useLoadUserInfo'
import useNavPage from '../hooks/useNavPage'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  const { waitUserData } = useLoadUserInfo()

  //页面跳转判断
  useNavPage(waitUserData)

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo></Logo>
        </div>
        <div className={styles.right}>
          <UserInfo></UserInfo>
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          {waitUserData ? (
            <div style={{ display: 'flex', marginTop: '40vh' }}>
              <Spin style={{ margin: 'auto' }}></Spin>
            </div>
          ) : (
            <Outlet></Outlet>
          )}
        </Content>
      </Layout>
      <Footer className={styles.footer}>
        Released under the MIT License. Copyright &copy; 2023-present 醒雀
      </Footer>
    </Layout>
  )
}

export default MainLayout
