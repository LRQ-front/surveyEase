import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { Empty, Spin, Typography } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../service/question'
import { LIST_PAGESIZE, LIST_SEARCH_PARA_KEY } from '../../constants'

const { Title } = Typography

const List: FC = () => {
  useTitle('Star问卷-我的问卷')

  const [started, setStarted] = useState(false) //是否开始加载，用于让暂无数据不显示，优化
  const [page, setPage] = useState(1)
  const [list, setList] = useState([]) //全部列表
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length

  const [searchParams] = useSearchParams()

  useEffect(() => {
    setStarted(false)
    setTotal(0)
    setList([])
    setPage(1)
  }, [searchParams])

  //加载数据
  const { run, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGESIZE,
        keyword: searchParams.get(LIST_SEARCH_PARA_KEY) || '',
      })

      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: sectionList, total } = result
        setPage(page + 1)
        setList(list.concat(sectionList))
        setTotal(total)
      },
    }
  )

  const loadMoreDivRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      //到底底部时触发加载
      const elem = loadMoreDivRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      //获取元素底部距离屏幕上方的高度
      const { bottom } = domRect

      //小于高度说明进入视图了
      if (bottom <= document.body.clientHeight) {
        //开始请求加载
        run()

        setStarted(true)
      }
    },
    {
      wait: 300,
    }
  )

  //1.页面加载，或url参数变化时
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  //2.页面滚动时，触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  //底部加载元素内容
  const loadMoreContent = useMemo(() => {
    if (!started || loading) return <Spin></Spin>
    if (total === 0) return <Empty description="暂无数据"></Empty>
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }, [started, haveMoreData, haveMoreData, loading])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((item: any) => {
            const { _id } = item

            return <QuestionCard key={_id} {...item}></QuestionCard>
          })}
      </div>
      <div className={styles.footer}>
        <div ref={loadMoreDivRef}>{loadMoreContent}</div>
      </div>
    </>
  )
}

export default List
