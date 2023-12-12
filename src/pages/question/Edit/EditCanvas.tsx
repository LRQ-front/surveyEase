import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from '../../../store/componentsReducer'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
//拖拽组件
import SortableItem from '../../../components/DragSortable/SortableItem'
import SortableContainer from '../../../components/DragSortable/SortableContainer'

type EditCanvasPropsType = {
  loading: boolean
}

//根据后端返回的组件列表生成组件
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo

  //从组件配置列表中获取组件配置
  const componentConf = getComponentConfByType(type)
  if (!componentConf) return null

  //拿出组件配置中的组件
  const { Component } = componentConf

  return <Component {...props}></Component>
}

const EditCanvas: FC<EditCanvasPropsType> = (props: EditCanvasPropsType) => {
  const { loading } = props
  const dispatch = useDispatch()

  //所有组件列表
  const { componentList, selectedId } = useGetComponentInfo()

  //绑定键盘事件
  useBindCanvasKeyPress()

  //判断是否在加载中
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin></Spin>
      </div>
    )
  }

  function handleComponentClick(event: MouseEvent, fe_id: string) {
    //这里要阻止冒泡，外面一层是点击后取消选中的，防止冒泡上去取消id了
    event.stopPropagation()
    dispatch(changeSelectedId(fe_id))
  }

  //为拖拽组件添加id，因为是必须的
  const componentListWithId = componentList.map(item => ({ ...item, id: item.fe_id }))

  //派发移动组件操作
  function handleDraEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer onDragend={handleDraEnd} items={componentListWithId}>
      <div className={styles.canvas}>
        {componentList
          .filter(c => !c.isHidden)
          .map(c => {
            const { fe_id } = c

            //用于添加选中样式
            const wrapperStyles = classNames({
              [styles['component-wrapper']]: true,
              [styles.selected]: fe_id === selectedId,
              [styles.isLocked]: c.isLocked,
            })

            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div className={wrapperStyles} onClick={e => handleComponentClick(e, fe_id)}>
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
