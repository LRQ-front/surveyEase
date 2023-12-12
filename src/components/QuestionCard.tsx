import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Divider, Popconfirm, Space, Tag, message } from 'antd'
import { useRequest } from 'ahooks'
import { updateQuestionService, duplicateQuestionService } from '../service/question'
import {
  EditOutlined,
  StarOutlined,
  LineChartOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'

type PropsTypes = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsTypes> = (props: PropsTypes) => {
  const { _id, title, isPublished, isStar, answerCount, createdAt } = props

  const [isStarState, setIsStarState] = useState(isStar)
  const [isDeleted, setIsDeleted] = useState(false)
  const navigate = useNavigate()

  //复制问卷，会跳到编辑问卷页面
  const { loading: duplicateLoading, run: duplicateClick } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id)
      return data
    },
    {
      manual: true,
      onSuccess(res) {
        message.success('复制成功')
        navigate(`/question/edit/${res.id}`)
      },
    }
  )

  const { loading: deleteLoading, run: delClick } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        setIsDeleted(true)
        message.success('删除成功')
      },
    }
  )

  // function del() {
  //   message.success('删除成功')
  // }

  //标星问卷网络请求
  const { loading, run: changStar } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, { isStar: !isStarState })
      return data
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('标星成功')
      },
    }
  )

  if (isDeleted) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }}></StarOutlined>}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷:{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button type="text" size="small" icon={<EditOutlined></EditOutlined>}>
              编辑问卷
            </Button>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined></LineChartOutlined>}
              disabled={!isPublished}
              onClick={() => navigate('/question/stat/' + _id)}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined></StarOutlined>}
              onClick={changStar}
              disabled={loading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该问卷?"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicateClick}
              disabled={duplicateLoading}
            >
              <Button type="text" size="small" icon={<CopyOutlined></CopyOutlined>}>
                复制
              </Button>
            </Popconfirm>
            <Popconfirm
              title="确定删除该问卷?"
              okText="确定"
              cancelText="取消"
              onConfirm={delClick}
              disabled={deleteLoading}
            >
              <Button type="text" size="small" icon={<DeleteOutlined></DeleteOutlined>}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
