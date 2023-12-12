import React, { FC, useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { getStatDataService } from '../../../service/stat'
import { useParams } from 'react-router-dom'
import { getComponentConfByType } from '../../../components/QuestionComponents'

const { Title } = Typography

type PropsType = {
  selectedComponentType: string
  selectedComponentId: string
}

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props

  const { id = '' } = useParams()

  const [stat, setStat] = useState([])
  const { run } = useRequest(
    async (selectedId, selectedComponentId) =>
      await getStatDataService(selectedId, selectedComponentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
      },
    }
  )

  useEffect(() => {
    //传入问卷id和选中组件的id
    if (selectedComponentId) run(id, selectedComponentId)
  }, [id, selectedComponentId])

  function genStatElem() {
    if (!selectedComponentId) return <div>未选中组件</div>

    const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
    if (StatComponent == null) return <div>该组件没有统计图标</div>

    return <StatComponent stat={stat}></StatComponent>
  }

  return (
    <>
      <Title level={3}>问卷统计</Title>
      <div>{genStatElem()}</div>
    </>
  )
}

export default ChartStat
