---
slug: 搭建Docusaurus教程
title: 搭建Docusaurus教程
authors: gaizi
tags: [Blog, docusaurus, Github Pages]

---

此教程为**傻瓜式**搭建Docusaurus个人网站并部署在Github Pages上

## 前提准备

- [Node.js](https://nodejs.org/en/download/) 版本 >= 14

  `node -v`

- [Yarn](https://yarnpkg.com/en/) 版本 >= 1.5

  `yarn --version` 

## 安装项目脚手架

创建一个名为`website`的项目，使用 `classic` 模板

```bash
$ npx create-docusaurus@latest Website classic
```

## 运行服务器

```bash
$ yarn run start
```

默认情况下，浏览器将自动打开 http://localhost:3000 的新窗口

> 若运行不成功，尝试使用`yarn add docusaurus --dev`或`yarn global add docusaurus --dev`命令

## 发布到Github Pages

### Git仓库配置

Git新建`Website`仓库，同步本地`Website`文件夹

新建gh-pages分支，用于存放前端展示的内容

Settings-Pages-Source改为gh-pages

![](pages source.png)

### 修改配置文件

修改`docusaurus.config.js`

```js
module.exports = {
    title: 'Blog & Document',			//站点名称
    tagline: 'gai-zi',					//标语
    url: 'https://gai-zi.github.io',	//站点地址
    baseUrl: '/Website/',				//前置路径
    onBrokenLinks: 'throw',				//编译遇到死链怎么处理
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',			// 网站的图标
    organizationName: 'gai-zi',  		// GitHub 上的组织名或者用户名
    projectName: 'Website', 			// GitHub 上仓库的名称
	...
}
```

### 发布

运行以下命令，会自动将本地项目打包发布到gh-pages分支

```bash
$ cmd /C 'set "GIT_USER=gai-zi" && yarn deploy'
```

> 若期间clone卡死，可以尝试取消代理

本地查看`npm run serve`

---

演示地址：https://gai-zi.github.io/Website

源码：[gai-zi/Website (github.com)](https://github.com/gai-zi/Website)

