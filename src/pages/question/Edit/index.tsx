import React, { FC } from 'react'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'

import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import { useTitle } from 'ahooks'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()

  const { title } = useGetPageInfo()
  useTitle(`问卷统计-${title}`)

  //取消选中
  function handleSelectedCancelClick() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <div>
        <EditHeader></EditHeader>
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel></LeftPanel>
          </div>
          <div className={styles.main} onClick={handleSelectedCancelClick}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading}></EditCanvas>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel></RightPanel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
