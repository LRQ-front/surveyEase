import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  copyComponent,
  delSelectedComponent,
  moveComponent,
  pasteComponent,
  toggleComponentLocked,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ActionCreators } from 'redux-undo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()

  const { selectedId, componentList, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  const length = componentList.length
  const selectedIndex = componentList.findIndex(c => c.fe_id == selectedId)
  const isFirst = selectedIndex <= 0
  const isLast = selectedIndex + 1 >= length

  //删除
  function handleDelClick() {
    dispatch(delSelectedComponent())
  }

  //显示隐藏
  function handleChangeVisible() {
    if (selectedId) {
      dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
    }
  }

  //锁定
  function toggleLocked() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }

  //复制
  function copy() {
    dispatch(copyComponent())
  }

  //粘贴
  function paste() {
    dispatch(pasteComponent())
  }

  //移动组件
  function handleMove(isUp = true) {
    if (isUp) {
      dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
    } else {
      dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
    }
  }

  //撤销
  function undo() {
    dispatch(ActionCreators.undo())
  }

  //重做
  function redo() {
    dispatch(ActionCreators.redo())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined></DeleteOutlined>}
          onClick={handleDelClick}
        ></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined></EyeInvisibleOutlined>}
          onClick={handleChangeVisible}
        ></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined></LockOutlined>}
          type={isLocked ? 'primary' : 'default'}
          onClick={toggleLocked}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined></CopyOutlined>} onClick={copy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined></BlockOutlined>}
          disabled={copiedComponent == null}
          onClick={paste}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button
          disabled={isFirst}
          shape="circle"
          icon={<UpOutlined></UpOutlined>}
          onClick={() => handleMove()}
        ></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          disabled={isLast}
          shape="circle"
          icon={<DownOutlined></DownOutlined>}
          onClick={() => handleMove(false)}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={undo}></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined />} onClick={redo}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
