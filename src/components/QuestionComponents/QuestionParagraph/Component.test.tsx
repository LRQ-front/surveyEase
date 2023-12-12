import React from 'react'

import Component from './Component'
import { screen, render } from '@testing-library/react'

test('默认属性', () => {
  render(<Component></Component>)

  const span = screen.getByText('一行段落')
  expect(span).toBeInTheDocument()
})

test('传入属性', () => {
  render(<Component text="hello" isCenter={true}></Component>)

  const span = screen.getByText('hello')
  expect(span).toBeInTheDocument()

  const p = span.parentElement
  expect(p).not.toBeNull()

  const styles = p!.style
  expect(styles.textAlign).toBe('center')
})

test('多行描述文本', () => {
  render(<Component text={'描述内容1\n描述内容2'} />)

  const span = screen.getByText('描述内容1')
  expect(span).toBeInTheDocument()

  expect(span).toHaveTextContent('描述内容1')
  expect(span).not.toHaveTextContent('描述内容1描述内容2')
})
