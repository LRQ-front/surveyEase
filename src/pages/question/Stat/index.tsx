import React, { FC, useState } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { Button, Result, Spin } from 'antd'
import StatHeader from './StatHeader'
import { useTitle } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import ComponentList from './ComponentList'
import PageStat from './PageStat'
import ChartStat from './ChartStat'

const Stat: FC = () => {
  const { loading } = useLoadQuestionData()
  const { isPublished, title } = useGetPageInfo()
  const navigate = useNavigate()

  //状态提升，不用redux，将公用的状态提升到父组件中
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

  useTitle(`问卷统计-${title}`)

  const LoadingElm = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin></Spin>
    </div>
  )

  function genContentElm() {
    if (!isPublished) {
      return (
        <div style={{ flex: 1 }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => navigate(-1)}>
                返回上一页
              </Button>
            }
          />
        </div>
      )
    }

    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          ></ComponentList>
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          ></PageStat>
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentType={selectedComponentType}
            selectedComponentId={selectedComponentId}
          ></ChartStat>
        </div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader></StatHeader>
      <div className={styles['content-wrapper']}>
        {loading && LoadingElm}
        <div className={styles.content}>{!loading && genContentElm()}</div>
      </div>
    </div>
  )
}

export default Stat
