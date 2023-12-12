import { Pagination } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_PAGESIZE, LIST_PAGESIZE_PARA_KEY, LIST_PAGE_PARA_KEY } from '../constants'

type PropsType = {
  total: number
}

const ListPagination: FC<PropsType> = (props: PropsType) => {
  const { total } = props

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGESIZE)

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    //页面刷新时，从url中获取page和pageSize
    const pageSize = parseInt(searchParams.get(LIST_PAGESIZE_PARA_KEY) || '') || LIST_PAGESIZE
    setPageSize(pageSize)
    const page = parseInt(searchParams.get(LIST_PAGE_PARA_KEY) || '') || 1
    setCurrentPage(page)
  })

  function handleChange(page: number, pageSize: number) {
    //改变网页url，发送请求

    //1.设置最新的url参数值
    searchParams.set(LIST_PAGESIZE_PARA_KEY, pageSize.toString())
    searchParams.set(LIST_PAGE_PARA_KEY, page.toString())

    //页面跳转，相当于发送请求
    navigate({
      pathname,
      //一些其他的参数也要带着
      search: searchParams.toString(),
    })
  }

  return (
    <Pagination
      total={total}
      current={currentPage}
      onChange={handleChange}
      pageSize={pageSize}
    ></Pagination>
  )
}

export default ListPagination
