import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import {
  LIST_PAGESIZE,
  LIST_PAGESIZE_PARA_KEY,
  LIST_PAGE_PARA_KEY,
  LIST_SEARCH_PARA_KEY,
} from '../constants'
import { getQuestionListService } from '../service/question'

type optionType = {
  isStar: boolean
  isDeleted: boolean
}

//每个页面加载列表抽取公用逻辑
function useLoadQuestionListData(opt: Partial<optionType> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()

  const { loading, data, refresh, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARA_KEY) || ''
      //获取传递的pageSize,page参数
      const pageSize = parseInt(searchParams.get(LIST_PAGESIZE_PARA_KEY) || '') || LIST_PAGESIZE
      const page = parseInt(searchParams.get(LIST_PAGE_PARA_KEY) || '') || 1

      const data = await getQuestionListService({ keyword, isStar, isDeleted, pageSize, page })

      return data
    },
    //searchParams变化时重新执行
    { refreshDeps: [searchParams] }
  )

  return { loading, data, refresh, error }
}

export default useLoadQuestionListData
