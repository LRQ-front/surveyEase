import type { Meta, StoryObj } from '@storybook/react'
import Component from '../../components/QuestionComponents/QuestionCheckbox/Component'

const meta = {
  title: 'Question/QuestionCheckbox',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SetProps: Story = {
  args: {
    title: '你的爱好',
    isVertical: true,
    list: [
      { text: '唱', value: 'sing', checked: true },
      { text: '跳', value: 'dance', checked: true },
      { text: 'rap', value: 'rap', checked: true },
      { text: '篮球', value: 'basketball', checked: false },
    ],
  },
}
