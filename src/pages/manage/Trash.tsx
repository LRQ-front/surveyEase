import React, { FC, useState } from 'react'
import ListSearch from '../../components/ListSearch'
import ListPagination from '../../components/ListPagenation'
import styles from './common.module.scss'
import { Spin, Empty, Table, Typography, Tag, Space, Modal, Button, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { useRequest } from 'ahooks'
import { deleteQuestionService, updateQuestionService } from '../../service/question'
const { confirm } = Modal

const { Title } = Typography

const Trash: FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const { loading, data = {}, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: function (isPublished: boolean) {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
      key: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ]

  //恢复数据网络请求
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      //防抖，连续点击会最后一个才触发，避免多次点击恢复，也可以使用上面解析到的loading
      debounceWait: 500,
      onSuccess() {
        message.success('恢复成功')
        //重新加载数据
        refresh()
        setSelectedIds([])
      },
    }
  )

  //删除问卷
  const { run: deleteClick } = useRequest(async () => await deleteQuestionService(selectedIds), {
    manual: true,
    onSuccess() {
      message.success('删除成功')
      refresh()
      setSelectedIds([])
    },
  })

  function del() {
    confirm({
      title: '确定删除该问卷?',
      icon: <ExclamationCircleOutlined></ExclamationCircleOutlined>,
      content: '删除后不可以找回',
      okText: '确定',
      cancelText: '取消',
      onOk: deleteClick,
    })
  }

  const tableElem = (
    <>
      <div>
        <Space style={{ marginBottom: '20px' }}>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            删除
          </Button>
        </Space>
      </div>
      <Table
        rowKey={q => q._id}
        pagination={false}
        dataSource={list}
        columns={columns}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      ></Table>
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )}
        {!loading && list.length === 0 && <Empty></Empty>}
        {list.length > 0 && tableElem}
      </div>
      <div className={styles.footer}>
        <ListPagination total={total}></ListPagination>
      </div>
    </>
  )
}

export default Trash
