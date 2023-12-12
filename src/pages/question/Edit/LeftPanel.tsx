import React, { FC } from 'react'
import { Tabs } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import Layers from './Layers'
import ComponentLib from './ComponentLib'

const LeftPanel: FC = () => {
  const items = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined></AppstoreOutlined>
          组件库
        </span>
      ),
      children: <ComponentLib></ComponentLib>,
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined></BarsOutlined>
          图层
        </span>
      ),
      children: <Layers></Layers>,
    },
  ]

  return <Tabs defaultActiveKey="componentLib" items={items} />
}
export default LeftPanel
