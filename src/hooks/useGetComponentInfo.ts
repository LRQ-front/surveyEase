import { useAppSelector } from '../store'
import { ComponentInfoType } from '../store/componentsReducer'

export default function useGetComponentInfo() {
  //需要加上present，因为components包裹了undoable库，多了其他三个选项
  //present，past，future
  const { componentList, selectedId, copiedComponent } = useAppSelector(state => ({
    componentList: state.components.present.componentList,
    selectedId: state.components.present.selectedId,
    copiedComponent: state.components.present.copiedComponent,
  }))

  //选中组件
  const selectedComponent = componentList.find((c: ComponentInfoType) => c.fe_id === selectedId)

  return { componentList, selectedId, selectedComponent, copiedComponent }
}
