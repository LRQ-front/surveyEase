export * from './interface'
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInfoDefaultProps } from './interface'

export default {
  title: '问卷信息',
  type: 'questionInfo',
  PropComponent,
  Component,
  defaultProps: QuestionInfoDefaultProps,
}
