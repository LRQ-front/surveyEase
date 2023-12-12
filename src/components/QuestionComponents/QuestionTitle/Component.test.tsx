import React from 'react'
import { screen, render } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component></Component>)
  const h = screen.getByText('h1默认标题')
  expect(h).toBeInTheDocument()
})

test('传入属性', () => {
  render(<Component level={2} isCenter={true} text="标题"></Component>)

  const h = screen.getByText('标题')
  expect(h).toBeInTheDocument()

  expect(h.matches('h2')).toBeTruthy()

  const style = h.style
  expect(style.textAlign).toBe('center')
})
