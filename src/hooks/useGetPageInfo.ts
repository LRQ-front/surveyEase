import { useAppSelector } from '../store'

export default function useGetPageInfo() {
  const pageInfo = useAppSelector(state => state.pageInfo)

  return pageInfo
}
