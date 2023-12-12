import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />)

  const p = screen.getByText('多选')
  expect(p).toBeInTheDocument()

  for (let i = 1; i <= 3; i++) {
    const checkbox = screen.getByDisplayValue(`item${i}`)
    expect(checkbox).toBeInTheDocument()

    const label = screen.getByText(`选项${i}`)
    expect(label).toBeInTheDocument()

    expect(checkbox.getAttribute('checked')).toBeNull()
  }
})

test('传入属性', () => {
  const options = [
    { value: 'hobby1', text: '爱好1', checked: true },
    { value: 'hobby2', text: '爱好2', checked: true },
    { value: 'hobby3', text: '爱好3', checked: false },
  ]
  render(<Component list={options} title="爱好" />)

  const p = screen.getByText('爱好')
  expect(p).toBeInTheDocument()

  const checkbox1 = screen.getByDisplayValue(`hobby1`)
  expect(checkbox1).toBeInTheDocument()
  expect(checkbox1.getAttribute('checked')).not.toBeNull()

  const checkbox2 = screen.getByDisplayValue(`hobby2`)
  expect(checkbox2).toBeInTheDocument()
  expect(checkbox2.getAttribute('checked')).not.toBeNull()

  const checkbox3 = screen.getByDisplayValue(`hobby3`)
  expect(checkbox3).toBeInTheDocument()
  expect(checkbox3.getAttribute('checked')).toBeNull()
})
