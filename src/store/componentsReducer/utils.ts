import { ComponentInfoType, ComponentStateType } from '.'

export function getNextSelectedId(selectedId: string, componentList: ComponentInfoType[]) {
  //过滤一下可见的，这个选中下一个是在删除或者改变可见的的操作的前面，这些操作都没发生
  const visibleComponentLst = componentList.filter(c => !c.isHidden)

  const index = visibleComponentLst.findIndex(c => c.fe_id === selectedId)
  if (index < 0) return ''

  let nextSelectedId = ''
  const length = visibleComponentLst.length
  if (length <= 1) {
    nextSelectedId = ''
  } else {
    if (index === length - 1) {
      //删除最后一个
      nextSelectedId = visibleComponentLst[index - 1].fe_id
    } else {
      nextSelectedId = visibleComponentLst[index + 1].fe_id
    }
  }

  return nextSelectedId
}

/**
 *
 * @param state redux的state
 * @param newComponent 要插入的新组建，粘贴和新建组件都可以用这个函数
 */
export function insertNewComponent(state: ComponentStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = state

  const index = componentList.findIndex(c => c.fe_id == selectedId)

  if (index < 0) {
    //画布没有选中
    componentList.push(newComponent)
  } else {
    //画布选中
    componentList.splice(index + 1, 0, newComponent)
  }
  state.selectedId = newComponent.fe_id
}
