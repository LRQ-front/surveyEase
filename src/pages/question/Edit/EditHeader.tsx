import React, { ChangeEvent, FC, useState } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Input, Space, Typography, message } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'

import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { updateQuestionService } from '../../../service/question'

const { Title } = Typography

const TitleElem: FC = () => {
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()

  const [editState, setEditState] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle({ title: newTitle }))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
      ></Input>
    )
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined></EditOutlined>} onClick={() => setEditState(true)}></Button>
    </Space>
  )
}

const SaveButton: FC = () => {
  //保存，componentList和pageInfo，获取什么内容就保存什么内容
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { id = '' } = useParams()

  useKeyPress(['meta.s', 'ctrl.s'], (event: KeyboardEvent) => {
    //阻止保存时的默认行为
    event.preventDefault()
    if (!loading) run()
  })

  //自动保存，带防抖效果
  useDebounceEffect(
    () => {
      run()
    },
    [pageInfo, componentList],
    { wait: 1000 }
  )

  const { loading, run } = useRequest(
    async () => {
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
    }
  )

  return (
    <Button
      onClick={run}
      disabled={loading}
      icon={loading ? <LoadingOutlined></LoadingOutlined> : null}
    >
      保存
    </Button>
  )
}

const PublishedButton: FC = () => {
  const navigate = useNavigate()
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { id = '' } = useParams()

  const { loading, run } = useRequest(
    async () => {
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        //发布后跳到统计页面
        navigate('/question/stat/' + id)
      },
    }
  )

  return (
    <Button type="primary" onClick={run} disabled={loading}>
      发布
    </Button>
  )
}

const EditHeader: FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined></LeftOutlined>} onClick={() => navigate(-1)}>
              返回
            </Button>
            <TitleElem></TitleElem>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar></EditToolbar>
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton></SaveButton>
            <PublishedButton></PublishedButton>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
