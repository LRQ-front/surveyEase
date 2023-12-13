# 问卷低代码开发平台

一个基于React18+Next+Ts，通过拖拽编辑快速生成问卷页面的系统

## 项目简介

### 前端

1. 技术栈：React+AntDesign+TS
2. 功能实现：
    * 用户登录注册
    * 问卷标星，复制，删除
    * 回收站恢复，删除问卷
    * 新建，编辑，，保存，发布问卷
    * 问卷统计
    * 问卷二维码生成
    * 单元测试，自动化测试，可视化测试

### 后端
1. 技术栈：Mock+Koa
2. 链接：[后端api](https://github.com/LRQ-front/surveyEase_mock)

### 客户端
1. 技术栈：Next.js+TS
2. 功能实现：
    * 提交失败或成功页面
    * 获取问卷信息
    * 收集问卷
3. 链接：[客户端代码](https://github.com/LRQ-front/surveyEase_client/tree/main)


## 项目截图

问卷列表页

![image](https://github.com/LRQ-front/surveyEase/blob/main/src/assets/img/1702458658455.jpg)

星标问卷页

![image](https://github.com/LRQ-front/surveyEase/blob/main/src/assets/img/1702458696544.jpg)

回收站

![image](https://github.com/LRQ-front/surveyEase/blob/main/src/assets/img/1702458716046.jpg)

问卷编辑页
![image](https://github.com/LRQ-front/surveyEase/blob/main/src/assets/img/1e8c9fe899524d1d4768f6266ecf27a.png)

问卷统计
![image](https://github.com/LRQ-front/surveyEase/blob/main/src/assets/img/1702458773384.jpg)

问卷二维码
![image](https://github.com/LRQ-front/surveyEase/blob/main/src/assets/img/1702458797967.jpg)

## 项目开始

项目启动
```bash
npm install
npm run start
```

测试
```bash
# 单元测试
npm run test

# 可视化测试
npm run storybook
```

格式化
```bash
npm run format
```

格式检查
```bash
npm run lint
```

