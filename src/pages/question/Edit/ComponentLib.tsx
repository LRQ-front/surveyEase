import React, { FC, useCallback } from 'react'
import { Typography } from 'antd'
import { ComponentConfType, componentConfGroup } from '../../../components/QuestionComponents'
import styles from './ComponentLib.module.scss'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentsReducer'
import { nanoid } from 'nanoid'

const { Title } = Typography

function genComponent(c: ComponentConfType) {
  const { Component, title, type, defaultProps } = c

  const dispatch = useDispatch()

  //添加组件到画布，实际就是添加到redux
  const handleAddClick = useCallback(() => {
    dispatch(addComponent({ fe_id: nanoid(), title, type, props: defaultProps }))
  }, [])

  return (
    <div key={type} className={styles.wrapper} onClick={handleAddClick}>
      <div className={styles.component}>
        <Component></Component>
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map((cf, index) => {
        const { groupId, groupName, components } = cf

        return (
          <div key={groupId}>
            <Title level={3} style={{ marginTop: index == 0 ? '0' : '20px', fontSize: '16px' }}>
              {groupName}
            </Title>
            {components.map(c => {
              return genComponent(c)
            })}
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
