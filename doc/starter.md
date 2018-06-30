框架使用特点对比
* 微信小程序
  * 小程序开发规范
  * 小程序标签
  * 样式规范：wxss
  * 无组件化机制
  * 不可复用
  * 本身无自动构建
  * 全新学习
  * 不支持数据集中管理
* mpvue
  * vuejs开发规范
  * html标签+小程序标签
  * 样式规范：sass、less、postcss
  * vuejs组件规范
  * 支持转换为h5
  * webpack构建
  * 熟悉vuejs即可
  * vuex
* wepy
  * 类vue开发规范
  * 小程序标签
  * 样式规范：sass、less、stylus
  * 自定义组件规范
  * 支持转换为h5
  * 框架内置自动构建工具
  * vuejs+wepy
  * 不支持数据集中管理

原生小程序入门
* rpx单位，responsive pixel
  * 根据屏幕宽度自适应，规定屏幕宽为750rpx
* app.js项目全局的入口和配置
  * 生命周期
  * 全局getApp函数获取实例
  * 全局唯一
* app.json
  * pages：哪些页面
  * windows
  * tabbar
* API方便调用微信原生的能力
  * Wx.request发送请求
  * Wx.previewImage预览图片
  * Wx.setStorage|getStorage本地存储
  * Location地理位置
  * ScanCode扫码
  * showToast显示提示信息
  * 设置导航条
  * 获取用户信息
  * 页面导航navigateTo，redirectTo，switchTab
  * 动画、震动、截屏、亮度
  * 音乐、视频、地图、文件
  * 加速计、罗盘、wifi、nfc
* 自带组件
  * 视图
  * 表单
  * 媒体
* 语法缺点
  * 不能使用npm
  * 为小程序单独开发代码，不能和web系统重用
  * 开发效率和学习成本
* 应用级别生命周期
  * onLaunch
  * onShow
  * onHide
  * onError
  * onPageNotFound
* 页面级别生命周期
  * onLoad
  * onshow
  * onHide
  * onUnload
  * onPullDownRefresh
  * onReachBottom
  * onShareAppMessage
  * onPageScroll
  * onTabItemTap

ES6数组优雅写法
* foreach、map、every、some、filter
* 数组合并去重：...new Set([...arr1,...arr2])
* 应用：淘宝用了多少种标签
```js
new Set([...document.querySelectorAll('*')].map(v=>v.nodeName)).size
```

初始化mpvue项目：vue init mpvue/mpvue-quickstart my-project

Koa2是什么
* Express源码人马打造，更精简（600-700行）
* Async+await处理异步
* 洋葱圈模型中间件机制（从外到内，再从内到外）

Koa基本用法
* 为什么Koa要使用async声明函数呢
  * 使next支持异步
  * 处理过程支持异步
* koa-router

mysql
* 安装 brew install mysql@5.7
  * basedir=/usr/local/Cellar/mysql@5.7/5.7.22
  * datadir=/usr/local/var/mysql
* 安装完成后会自动创建一个无需使用密码的root用户，如果需要安全，使用mysql_secure_installation命令
* mysql.server start|stop
* 连接数据库 mysql -uroot
* brew services start|stop mysql
* mysql搭建小程序本地开发环境（node操作mysql，knex）
  * 创建指定数据库：create database cAuth
  * 运行脚本初始化相关表：node tools/initdb.js

得到用户信息
* npm install wafer2-client-sdk --save