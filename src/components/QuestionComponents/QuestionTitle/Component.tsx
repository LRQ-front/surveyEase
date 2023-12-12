import React, { FC } from 'react'
import { QuestionTitleDefaultProps, QuestionTitlePropsType } from './interface'
import { Typography } from 'antd'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { isCenter, level = 1, text } = { ...QuestionTitleDefaultProps, ...props }

  const getFontSize = (level: number) => {
    if (level == 1) return '24px'
    if (level == 2) return '20px'
    if (level == 3) return '16px'
    return '16px'
  }

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: '0',
        fontSize: getFontSize(level),
      }}
    >
      {text}
    </Title>
  )
}

export default QuestionTitle
