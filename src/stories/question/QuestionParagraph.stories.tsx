import type { Meta, StoryObj } from '@storybook/react'
import Component from '../../components/QuestionComponents/QuestionParagraph/Component'

const meta = {
  title: 'Question/QuestionParagraph',
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
    text: '段落内容xxxxxx',
    isCenter: true,
  },
}

export const MulLineParagraph: Story = {
  args: {
    text: '雪后世界变成巨大的滑雪场\n出溜滑现象席卷北方\nxxxxxxxxx',
  },
}
