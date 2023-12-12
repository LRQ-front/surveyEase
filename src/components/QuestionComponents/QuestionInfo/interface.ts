export type QuestionInfoPropsType = {
  title?: string
  desc?: string

  onChange?: (props: QuestionInfoPropsType) => void
  disabled?: boolean
}

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: '问卷标题',
  desc: '问卷描述',
}
