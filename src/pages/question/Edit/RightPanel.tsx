import React, { FC, useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProps from './ComponentProps'
import PageSetting from './PageSetting'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

enum TAB_KEYS {
  PROPS_KEY = 'props',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROPS_KEY)

  const { selectedId } = useGetComponentInfo()
  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROPS_KEY)
    else setActiveKey(TAB_KEYS.SETTING_KEY)
  }, [selectedId])

  const items = [
    {
      key: TAB_KEYS.PROPS_KEY,
      label: (
        <span>
          <FileTextOutlined></FileTextOutlined>
          属性
        </span>
      ),
      children: <ComponentProps></ComponentProps>,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined></SettingOutlined>
          页面设置
        </span>
      ),
      children: <PageSetting></PageSetting>,
    },
  ]

  return <Tabs items={items} activeKey={activeKey}></Tabs>
}

export default RightPanel
