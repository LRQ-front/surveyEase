import React, { FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ComponentPropsType, getComponentConfByType } from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/componentsReducer'

const NoProps: FC = () => {
  return <div style={{ textAlign: 'center' }}>没有选中组件</div>
}

const ComponentProps: FC = () => {
  const dispatch = useDispatch()

  //1.获取选中组件
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProps></NoProps>

  //2.获取组建的type和props（用于后面组件传递）
  const { type, props, isLocked } = selectedComponent
  //3.根据组件的type获取组件配置对象
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProps></NoProps>

  //4.从配置对象中后去propsComponent（展示在右侧的)
  const { PropComponent } = componentConf

  //当属性面板修改时，会调用onChange，传递修改后的值给这个函数，newProps就是新的值,拿着这个值去更新redux
  function handleChange(newProps: ComponentPropsType) {
    //更新redux
    if (selectedComponent == null) return

    const { fe_id } = selectedComponent

    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  return <PropComponent {...props} onChange={handleChange} disabled={isLocked}></PropComponent>
}

export default ComponentProps
