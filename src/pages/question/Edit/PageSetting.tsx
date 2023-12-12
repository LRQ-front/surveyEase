import { Form, Input } from 'antd'
import React, { FC, useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageReducer'

const { TextArea } = Input
const PageSetting: FC = () => {
  const dispatch = useDispatch()

  const pageInfo = useGetPageInfo()

  const [form] = Form.useForm()
  //当内容发生变化，表单内容刷新
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  function handleChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  return (
    <Form layout="vertical" initialValues={pageInfo} form={form} onValuesChange={handleChange}>
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input placeholder="请输入问卷标题"></Input>
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="请输入问卷描述.."></TextArea>
      </Form.Item>
      <Form.Item label="css代码" name="css">
        <TextArea placeholder="请输入css代码"></TextArea>
      </Form.Item>
      <Form.Item label="js代码" name="js">
        <TextArea placeholder="请输入js代码"></TextArea>
      </Form.Item>
    </Form>
  )
}

export default PageSetting
