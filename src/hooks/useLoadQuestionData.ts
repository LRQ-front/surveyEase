import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getQuestionService } from '../service/question'
import { changeSelectedId, resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { loading, data, run, error } = useRequest(
    async () => {
      if (!id) throw new Error('没有问卷id')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )

  //根据data变化，存储到redux中
  useEffect(() => {
    if (!data) return

    const { title, desc, js, css, componentList = [], isPublished = false } = data

    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0]['fe_id']
    }

    //页面信息存储
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }))

    dispatch(resetComponents(componentList))
    //默认选中第一个组件
    dispatch(changeSelectedId(selectedId))
  }, [data])

  //根据id变化，发起网络请求
  useEffect(() => {
    run()
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
