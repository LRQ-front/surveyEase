import React from 'react'
import { screen, render } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component></Component>)

  const p = screen.getByText('输入框默认标题')
  expect(p).toBeInTheDocument()

  const input = screen.getByPlaceholderText('请输入内容...')
  expect(input).toBeInTheDocument()
})

test('传入属性', () => {
  render(<Component title="input输入框" placeholder="请输入"></Component>)

  const p = screen.getByText('input输入框')
  expect(p).toBeInTheDocument()

  const input = screen.getByPlaceholderText('请输入')
  expect(input).toBeInTheDocument()
})
