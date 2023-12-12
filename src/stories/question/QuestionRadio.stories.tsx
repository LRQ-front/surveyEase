import type { Meta, StoryObj } from '@storybook/react'
import Component from '../../components/QuestionComponents/QuestionRadio/Component'

const meta = {
  title: 'Question/QuestionRadio',
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
    title: '性别',
    isVertical: false,
    options: [
      { text: '男', value: 'male' },
      { text: '女', value: 'female' },
    ],
  },
}
