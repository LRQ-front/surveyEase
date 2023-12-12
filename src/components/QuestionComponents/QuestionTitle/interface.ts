export type QuestionTitlePropsType = {
  level?: 1 | 2 | 3 | 4
  isCenter?: boolean
  text?: string

  onChange?: (newProps: QuestionTitlePropsType) => void
  disabled?: boolean
}

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  level: 1,
  isCenter: false,
  text: 'h1默认标题',
}
