import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component></Component>)

  const p = screen.getByText('单选标题')
  expect(p).toBeInTheDocument()

  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`item${i}`)
    expect(radio).toBeInTheDocument()

    const label = screen.getByText(`选项${i}`)
    expect(label).toBeInTheDocument()
  }
})

test('传入属性', () => {
  const options = [
    { value: 'hobby1', text: '爱好1' },
    { value: 'hobby2', text: '爱好2' },
    { value: 'hobby3', text: '爱好3' },
  ]
  render(<Component options={options} title="爱好" value="hobby1"></Component>)

  const p = screen.getByText('爱好')
  expect(p).toBeInTheDocument()

  for (let i = 1; i <= 3; i++) {
    const curVal = `hobby${i}`
    const radio = screen.getByDisplayValue(curVal)
    expect(radio).toBeInTheDocument()

    const label = screen.getByText(`爱好${i}`)
    expect(label).toBeInTheDocument()

    //选中的checked不为空
    if (curVal == 'hobby1') {
      expect(radio.getAttribute('checked')).not.toBeNull()
    }
  }
})
