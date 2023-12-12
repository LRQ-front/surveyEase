import React, { ChangeEvent, FC, useState } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './Layers.module.scss'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  moveComponent,
  toggleComponentLocked,
} from '../../../store/componentsReducer'
import { Input, Space, message, Button } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
//拖拽组件
import SortableItem from '../../../components/DragSortable/SortableItem'
import SortableContainer from '../../../components/DragSortable/SortableContainer'

const Layers: FC = () => {
  const dispatch = useDispatch()

  const { componentList, selectedId } = useGetComponentInfo()

  //正在修改的标题id
  const [changingTitleId, setChangingTitleId] = useState('')

  function handleClick(fe_id: string) {
    //不能选中隐藏的组件
    const curComp = componentList.find(c => c.fe_id == fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }

    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id))
      //第一次点击选中，设置成空串，用字符串展示，否则是下面的输入框展示
      setChangingTitleId('')
      return
    }

    //能到这里说明，点击时，这个图层已经选中了，那么此时就会变成输入框
    setChangingTitleId(fe_id)
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return

    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }

  //显示，隐藏
  function handleChangeVisible(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  //锁定，解锁
  function handleChangeLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }))
  }

  //为拖拽组件添加id，因为是必须的
  const componentListWithId = componentList.map(item => ({ ...item, id: item.fe_id }))

  //派发移动组件操作
  function handleDraEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentListWithId} onDragend={handleDraEnd}>
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c

        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div
                className={classNames({
                  [styles.title]: true,
                  [styles.selected]: selectedId == fe_id,
                })}
                onClick={() => handleClick(fe_id)}
              >
                {changingTitleId == fe_id ? (
                  <Input
                    value={title}
                    onChange={handleChange}
                    onPressEnter={() => setChangingTitleId('')}
                    onBlur={() => setChangingTitleId('')}
                  ></Input>
                ) : (
                  title
                )}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    className={isHidden ? '' : styles.btn}
                    type={isHidden ? 'primary' : 'text'}
                    size="small"
                    shape="circle"
                    icon={<EyeInvisibleOutlined></EyeInvisibleOutlined>}
                    onClick={() => handleChangeVisible(fe_id, !isHidden)}
                  ></Button>
                  <Button
                    className={!isLocked ? styles.btn : ''}
                    type={isLocked ? 'primary' : 'text'}
                    size="small"
                    shape="circle"
                    icon={<LockOutlined></LockOutlined>}
                    onClick={() => handleChangeLocked(fe_id)}
                  ></Button>
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
