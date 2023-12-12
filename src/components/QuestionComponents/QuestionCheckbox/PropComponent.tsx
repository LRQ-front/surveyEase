import { Form, Input, Checkbox, Space, Button } from 'antd'
import React, { FC } from 'react'
import { QuestionCheckboxPropsType, listType } from './interface'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { onChange, disabled, list = [], title, isVertical } = props

  const [form] = Form.useForm()

  function handleChange() {
    if (onChange) {
      const newValue = form.getFieldsValue()

      //补充选项的value值,因为新增加的时候，只有text值，没有value值
      const { list } = newValue
      list.forEach((l: listType) => {
        if (l.value) return
        l.value = nanoid(5)
      })

      onChange(newValue)
    }
  }

  return (
    <Form
      disabled={disabled}
      initialValues={{ list, title, isVertical }}
      onValuesChange={handleChange}
      layout="vertical"
      form={form}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ name, key }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox></Checkbox>
                    </Form.Item>
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: (_, text) => {
                            //验证表单内容的唯一性
                            const { list } = form.getFieldsValue()

                            let num = 0
                            list.forEach((opt: listType) => {
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
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
