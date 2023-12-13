import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserInfo from '../hooks/useLoadUserInfo'
import useNavPage from '../hooks/useNavPage'

const QuestionLayout: FC = () => {
  const { waitUserData } = useLoadUserInfo()

  //页面跳转判断
  useNavPage(waitUserData)

  return (
    <div style={{ height: '100vh' }}>
      {waitUserData ? (
        <div style={{ display: 'flex', marginTop: '40vh' }}>
          <Spin style={{ margin: 'auto' }}></Spin>
        </div>
      ) : (
        <Outlet></Outlet>
      )}
    </div>
  )
}

export default QuestionLayout
