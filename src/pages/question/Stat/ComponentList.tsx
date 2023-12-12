import React, { FC, useState } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import classNames from 'classnames'
import styles from './ComponentList.module.scss'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (id: string) => void
}

const EditCanvas: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  //所有组件列表
  const { componentList } = useGetComponentInfo()

  return (
    <div>
      <div className={styles.canvas}>
        {componentList
          .filter(c => !c.isHidden)
          .map(c => {
            const { fe_id, type, props } = c

            //用于添加选中样式
            const wrapperStyles = classNames({
              [styles['component-wrapper']]: true,
              [styles.selected]: fe_id === selectedComponentId,
            })

            //从组件配置列表中获取组件配置
            const componentConf = getComponentConfByType(type)
            if (!componentConf) return null
            //拿出组件配置中的组件
            const { Component } = componentConf

            return (
              <div
                key={fe_id}
                className={wrapperStyles}
                onClick={() => {
                  setSelectedComponentId(fe_id)
                  setSelectedComponentType(type)
                }}
              >
                <div className={styles.component}>
                  <Component {...props}></Component>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default EditCanvas
