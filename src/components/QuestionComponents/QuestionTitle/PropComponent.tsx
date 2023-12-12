import React, { FC, useEffect } from 'react'
import { Checkbox, Form, Input, Select } from 'antd'
import { QuestionTitlePropsType } from './interface'

const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { level, isCenter, text, onChange, disabled } = props

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ level, isCenter, text })
  }, [level, isCenter, text])

  //当属性面板修改属性时，会这个函数
  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValueChange}
      initialValues={{ level, isCenter, text }}
      disabled={disabled}
    >
      <Form.Item
        name="text"
        label="标题内容"
        rules={[{ required: true, message: '这是一个测试问卷' }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item name="level" label="层级">
        <Select
          options={[
            { value: '1', text: '1' },
            { value: '2', text: '2' },
            { value: '3', text: '3' },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
