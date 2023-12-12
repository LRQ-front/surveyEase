import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'

export type ComponentInfoType = {
  fe_id: string //这里由于是前端生成的id，而生成不了后端格式的id，所以这里重新定义一个fe——id
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentStateType = {
  selectedId: string
  componentList: ComponentInfoType[]
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
}

const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    resetComponents(state: ComponentStateType, { payload }: PayloadAction<ComponentInfoType[]>) {
      state.componentList = payload
    },
    changeSelectedId(state: ComponentStateType, { payload }: PayloadAction<string>) {
      state.selectedId = payload
    },
    addComponent(state: ComponentStateType, { payload }: PayloadAction<ComponentInfoType>) {
      //抽取相同逻辑到insertNewComponent函数中

      //判断是否画布中有选中，没有选中添加到最后，有的话添加到选中的下面
      const newComponent = payload
      insertNewComponent(state, newComponent)
    },
    changeComponentProps(
      state: ComponentStateType,
      { payload }: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) {
      const { fe_id, newProps } = payload

      const selectedComponent = state.componentList.find(c => c.fe_id == fe_id)
      if (selectedComponent) {
        selectedComponent.props = newProps
      }
    },
    delSelectedComponent(state: ComponentStateType) {
      //删除选中的组件
      const { selectedId, componentList } = state

      //选择新的选中组件
      const newSelectedId = getNextSelectedId(selectedId, componentList)
      state.selectedId = newSelectedId

      const index = componentList.findIndex(c => c.fe_id == selectedId)
      if (index >= 0) {
        componentList.splice(index, 1)
      }
    },
    //改变组件的可见性
    changeComponentHidden(
      state: ComponentStateType,
      { payload }: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) {
      const { componentList } = state
      const { fe_id, isHidden } = payload

      //选择新的选中组件
      let newSelectedId = ''
      if (isHidden) {
        //是隐藏操作
        newSelectedId = getNextSelectedId(fe_id, componentList)
      } else {
        //显示操作
        newSelectedId = fe_id
      }
      state.selectedId = newSelectedId

      //修改可见
      const targetComp = componentList.find(c => c.fe_id == fe_id)
      if (targetComp) {
        targetComp.isHidden = isHidden
      }
    },
    //改变锁定与否
    toggleComponentLocked(
      state: ComponentStateType,
      { payload }: PayloadAction<{ fe_id: string }>
    ) {
      //外面需要传入id
      const { fe_id } = payload
      const toggleComp = state.componentList.find(c => c.fe_id === fe_id)

      if (toggleComp) {
        toggleComp.isLocked = !toggleComp.isLocked
      }
    },
    //复制组件
    copyComponent(state: ComponentStateType) {
      const { selectedId } = state
      const selectedComponent = state.componentList.find(c => c.fe_id === selectedId)

      if (selectedComponent) {
        //深拷贝
        const copyComponent = cloneDeep(selectedComponent)
        state.copiedComponent = copyComponent
      }
    },
    pasteComponent(state: ComponentStateType) {
      const { copiedComponent } = state

      if (copiedComponent) {
        //id都要更改，不能一样
        copiedComponent.fe_id = nanoid()

        //插入组件，逻辑跟添加组件一样
        insertNewComponent(state, copiedComponent)
      }
    },
    //选择上一个
    selectPrevComponent(state: ComponentStateType) {
      const { selectedId, componentList } = state
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

      if (selectedIndex < 0) return
      if (selectedIndex == 0) return
      state.selectedId = componentList[selectedIndex - 1].fe_id
    },
    //选择下一个
    selectNextComponent(state: ComponentStateType) {
      const { selectedId, componentList } = state
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

      if (selectedIndex < 0) return
      if (selectedIndex + 1 == componentList.length) return
      state.selectedId = componentList[selectedIndex + 1].fe_id
    },

    //修改标题
    changeComponentTitle(
      state: ComponentStateType,
      { payload }: PayloadAction<{ fe_id: string; title: string }>
    ) {
      const { title, fe_id } = payload

      const changeComp = state.componentList.find(c => c.fe_id == fe_id)
      if (changeComp) {
        changeComp.title = title
      }
    },
    //拖拽结束后移动组件
    moveComponent(
      state: ComponentStateType,
      { payload }: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) {
      const { oldIndex, newIndex } = payload
      const { componentList } = state

      //借助第三方api进行移动
      state.componentList = arrayMove(componentList, oldIndex, newIndex)
    },
  },
})

export const {
  resetComponents,
  selectNextComponent,
  selectPrevComponent,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  delSelectedComponent,
  toggleComponentLocked,
  changeComponentHidden,
  pasteComponent,
  copyComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
