import Component from './Component'
import { QuestionInputDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'

//input组件配置对象
export default {
  title: '输入框',
  type: 'questionInput',
  Component,
  PropComponent, //参数组件
  defaultProps: QuestionInputDefaultProps,
}
