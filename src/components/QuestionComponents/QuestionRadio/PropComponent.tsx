import { Form, Input, Checkbox, Select, Space, Button } from 'antd'
import React, { FC } from 'react'
import { QuestionRadioPropsType } from './interface'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { optionType } from './interface'
import { nanoid } from 'nanoid'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { onChange, disabled, title, isVertical, value, options = [] } = props

  const [form] = Form.useForm()

  function handleChange() {
    if (onChange) {
      const newValue = form.getFieldsValue()

      //补充选项的value值
      const { options = [] } = newValue
      options.forEach((opt: optionType) => {
        if (opt.value) return
        opt.value = nanoid(5)
      })
      onChange(newValue)
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      form={form}
      disabled={disabled}
      onValuesChange={handleChange}
    >
      <Form.Item
        name="title"
        label="标题"
        rules={[{ required: true, message: '请输入单选框标题' }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ name, key }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: (_, text) => {
                            //验证表单内容的唯一性
                            const { options } = form.getFieldsValue()

                            let num = 0
                            options.forEach((opt: optionType) => {
                              if (opt.text == text) num++
                            })
                            if (num == 1) return Promise.resolve()
                            return Promise.reject(new Error('和其他选项重复了'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="输入选项文字..."></Input>
                    </Form.Item>
                    {index > 1 && (
                      <MinusCircleOutlined onClick={() => remove(name)}></MinusCircleOutlined>
                    )}
                  </Space>
                )
              })}

              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined></PlusOutlined>}
                  onClick={() => add({ text: '', value: '' })}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({ value, label: text || '' }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
