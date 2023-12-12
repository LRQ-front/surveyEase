import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  copyComponent,
  delSelectedComponent,
  pasteComponent,
  selectNextComponent,
  selectPrevComponent,
} from '../store/componentsReducer'
import { ActionCreators } from 'redux-undo'

function isActiveElementValid() {
  const activeElement = document.activeElement

  //聚焦在body上面说明没有focus在input这样的表单中，那么就可以删除
  if (document.body === activeElement) return true
  //由于使用了拖拽组件，当选中拖拽组件时，激活组件最外面是下面这个
  if (activeElement?.matches("div[role='button']")) return true

  return false
}

//给画布绑定键盘事件，复制粘贴这些
export default function useBindCanvasKeyPress() {
  const dispatch = useDispatch()

  //删除
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(delSelectedComponent())
  })

  //复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copyComponent())
  })

  //粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteComponent())
  })

  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })

  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })

  //撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(ActionCreators.undo())
    },
    {
      exactMatch: true,
    }
  )

  //重做
  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    if (!isActiveElementValid()) return
    dispatch(ActionCreators.redo())
  })
}
