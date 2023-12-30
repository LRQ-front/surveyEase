import React, { FC, ReactElement } from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type PropsType = {
  items: Array<{ id: string; [key: string]: any }>
  children: React.JSX.Element | React.JSX.Element[] //渲染的内容由外部传进来，实现可复用，项目中由不同可拖拽的子元素
  onDragend: (oldIndex: number, newIndex: number) => void
}
const SortableItem: FC<PropsType> = (props: PropsType) => {
  const { children, items, onDragend } = props

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, //移动超过8px才会触发拖拽
      },
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over == null) return

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(c => c.fe_id === active.id)
      const newIndex = items.findIndex(c => c.fe_id === over.id)
      //交由外部处理
      onDragend(oldIndex, newIndex)
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

export default SortableItem
