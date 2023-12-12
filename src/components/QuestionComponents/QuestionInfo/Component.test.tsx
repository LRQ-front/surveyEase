import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('测试默认属性', () => {
  render(<Component />)
  //根据文本获取元素
  const h = screen.getByText('问卷标题')
  expect(h).toBeInTheDocument() //断言
})

test('传入属性', () => {
  render(<Component title="平均工资调查问卷" desc="描述内容" />)

  const h = screen.getByText('平均工资调查问卷')
  expect(h).toBeInTheDocument() //断言

  const p = screen.getByText('描述内容')
  expect(p).toBeInTheDocument() //断言
})

test('多行描述文本', () => {
  render(<Component desc={'描述内容1\n描述内容2'} />)

  const span = screen.getByText('描述内容1')
  expect(span).toBeInTheDocument()

  expect(span).toHaveTextContent('描述内容1')
  expect(span).not.toHaveTextContent('描述内容1描述内容2')
})
