export type QuestionParagraphPropsType = {
  isCenter?: boolean
  text?: string

  onChange?: (props: QuestionParagraphPropsType) => void
  disabled?: boolean
}

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '一行段落',
  isCenter: false,
}
