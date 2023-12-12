import type { Meta, StoryObj } from '@storybook/react'
import Component from '../../components/QuestionComponents/QuestionInfo/Component'

const meta = {
  title: 'Question/QuestionInfo',
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
    title: '人口调查问卷',
    desc: '问卷描述...',
  },
}

export const MulLineDescBreak: Story = {
  args: {
    title: '问卷标题',
    desc: '问卷描述1\n描述2',
  },
}
