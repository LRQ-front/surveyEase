import React, { FC, useMemo, useRef } from 'react'
import styles from './StatHeader.module.scss'
import { Button, Input, Popover, Space, Tooltip, Typography, message } from 'antd'
import type { InputRef } from 'antd'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useNavigate, useParams } from 'react-router-dom'
import QRCode from 'qrcode.react'

const { Title } = Typography

const StatHeader: FC = () => {
  const { title, isPublished } = useGetPageInfo()
  const navigate = useNavigate()
  const { id } = useParams()

  const inputRef = useRef<InputRef>(null)

  function copy() {
    const inputElm = inputRef.current
    if (!inputElm) return
    inputElm.select()
    document.execCommand('copy') //执行复制选中的内容
    message.success('复制成功')
  }

  //缓存二维码
  const QRcodeAndLinkElm = useMemo(() => {
    if (!isPublished) return null
    const url = `http://localhost:3000/question/${id}`

    const QRCodeElem = (
      <div>
        <QRCode value={url} size={150}></QRCode>
      </div>
    )

    return (
      <div>
        <Space>
          <Input value={url} style={{ width: '300px' }} ref={inputRef}></Input>
          <Tooltip title="拷贝链接">
            <Button icon={<CopyOutlined></CopyOutlined>} onClick={copy}></Button>
          </Tooltip>
          <Popover content={QRCodeElem}>
            <Button icon={<QrcodeOutlined></QrcodeOutlined>}></Button>
          </Popover>
        </Space>
      </div>
    )
  }, [id, isPublished])

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined></LeftOutlined>} onClick={() => navigate(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{QRcodeAndLinkElm}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => navigate(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
