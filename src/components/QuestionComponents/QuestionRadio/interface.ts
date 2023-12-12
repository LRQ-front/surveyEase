export type optionType = {
  text: string
  value: string
}

export type QuestionRadioPropsType = {
  title?: string
  value?: string
  isVertical?: boolean
  options?: optionType[]

  onChange?: (props: QuestionRadioPropsType) => void
  disabled?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  value: '',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项1' },
    { value: 'item2', text: '选项2' },
    { value: 'item3', text: '选项3' },
  ],
}

export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
