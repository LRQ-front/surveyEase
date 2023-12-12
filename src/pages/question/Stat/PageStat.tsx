import React, { FC, useState } from 'react'
import { useRequest } from 'ahooks'
import { getStatListService } from '../../../service/stat'
import { useParams } from 'react-router-dom'
import { Spin, Table, Typography, Pagination } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { STAT_PAGE_SIZE } from '../../../constants'

const { Title } = Typography
type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (id: string) => void
}

const PageStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

  const { id = '' } = useParams()

  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)

  //网络请求
  const { loading } = useRequest(
    async () => {
      const data = await getStatListService(id, { page: 1, pageSize: 10 })
      return data
    },
    {
      refreshDeps: [page, pageSize], //当页面size发生变化时重新请求
      onSuccess(res) {
        setList(res.list)
        setTotal(res.total)
      },
    }
  )

  const { componentList } = useGetComponentInfo()
  const columns = componentList.map(c => {
    const { title, props = {}, fe_id, type } = c

    const colTitle = props!.title || title

    return {
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          <span style={{ color: fe_id == selectedComponentId ? '#1b8dff' : 'inherit' }}>
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    }
  })

  //添加唯一的key
  const dataSource = list.map((l: any) => ({ ...l, key: l._id }))
  //表格
  const TableElm = (
    <>
      <Table dataSource={dataSource} columns={columns} pagination={false}></Table>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={page => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
        ></Pagination>
      </div>
    </>
  )

  return (
    <div>
      <Title level={3}>问卷数量:{total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin></Spin>
        </div>
      )}
      {!loading && TableElm}
    </div>
  )
}

export default PageStat
