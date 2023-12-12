import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { LIST_SEARCH_PARA_KEY } from '../constants'
import { Input } from 'antd'

const { Search } = Input

const ListSearch: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  const [searchValue, setSearchValue] = useState('')

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value)
  }

  useEffect(() => {
    const value = searchParams.get(LIST_SEARCH_PARA_KEY) || ''
    setSearchValue(value)
  }, [searchParams])

  function handleSearch(value: string) {
    navigate({
      pathname,
      search: `${LIST_SEARCH_PARA_KEY}=${value}`,
    })
  }

  return (
    <Search
      size="large"
      allowClear
      placeholder="输入关键字"
      value={searchValue}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: '250px' }}
    ></Search>
  )
}

export default ListSearch
