# 🎯 彩票号码生成器

一个纯前端 JavaScript 项目，用来在线随机生成 **双色球** 和 **大乐透** 号码。  
无需后端，直接打开页面即可使用。

## ✨ 功能概述

- 🔀 **双色球 / 大乐透** 双玩法切换
- 💡 **自动生成** 5 注随机号码
- 🔄 **一键刷新**，重新生成号码
- 📋 **一键复制**结果到剪贴板
- 📱 **自适应布局**，兼容 PC & 手机端

## 📜 彩票规则

### 🟥 双色球

| 类型 | 数量 | 范围 | 说明 |
|------|------|------|------|
| 红球 | 6 | 1–33 | 不重复，升序排列 |
| 蓝球 | 1 | 1–16 | 单独随机 |

**示例**：`[03] [09] [15] [22] [28] [33] + [12]`

### 🟠 大乐透

| 类型 | 数量 | 范围 | 说明 |
|------|------|------|------|
| 前区 | 5 | 1–35 | 不重复，升序排列 |
| 后区 | 2 | 1–12 | 不重复，升序排列 |

**示例**：`[01] [07] [18] [24] [33] + [04] [11]`

## 🖼️ 页面设计

### 1️⃣ 顶部导航栏

- 「双色球」|「大乐透」标签切换
- 右上角刷新按钮 🔄 → 重新生成当前玩法的 5 注号码

```
┌──────────────────────────────┐
│  双色球 | 大乐透   🔄刷新     │
└──────────────────────────────┘
```

### 2️⃣ 号码展示区

- 单卡片布局，在一个卡片内显示 5 注号码
- 每注号码占一行，不换行显示
- 数字两位格式（01、02…）

**样式区别**：
- **双色球**：红球(红底白字) + 蓝球(蓝底白字)
- **大乐透**：前区(橙底白字) + 后区(蓝底白字)

### 3️⃣ 底部操作区

- 「再次生成」按钮 → 功能同刷新
- 「复制结果」按钮 → 复制当前号码到剪贴板
- 页面底部显示版权信息：© 2025 My Lottery Project

### 4️⃣ 响应式布局

- **PC端**：单卡片居中展示，最大宽度800px
- **手机端**：卡片自适应屏幕宽度，导航栏自动换行
- **超小屏幕**：号码球尺寸自动缩小，保持良好显示效果

## ⚡ 技术栈

- **HTML5** + **CSS3** + 原生 **JavaScript**（无框架依赖）
- 使用 `Math.random()` + 洗牌算法生成随机号码
- 使用 `navigator.clipboard` 实现复制功能
- CSS Flex/Grid + Media Query 实现自适应布局

## 🛠️ 项目结构

```
chyixt_two/
├─ index.html          # 入口页面
├─ style.css           # 页面样式
├─ app.js              # 号码生成逻辑
├─ docker-compose.yml  # Docker Compose 配置
├─ nginx.conf          # Nginx 配置文件
└─ README.md           # 项目说明文档
```

## 🚀 快速开始

### 方式一：Docker 部署（推荐）

#### 前置要求
- 已安装 [Docker](https://www.docker.com/) 和 [Docker Compose](https://docs.docker.com/compose/)

#### 启动步骤

1. **启动服务**
   ```bash
   docker-compose up -d
   ```

2. **访问项目**
   打开浏览器访问：`http://localhost:10010`

3. **停止服务**
   ```bash
   docker-compose down
   ```

4. **查看日志**
   ```bash
   docker-compose logs -f
   ```

#### 端口说明
- 本地端口：`10010`
- 容器端口：`80`

### 方式二：直接访问

#### 使用本地 Web 服务器

1. **使用 Python 内置服务器**
   ```bash
   # Python 3
   python -m http.server 10010
   
   # Python 2
   python -m SimpleHTTPServer 10010
   ```

2. **使用 Node.js http-server**
   ```bash
   npx http-server -p 10010
   ```

3. **使用 PHP 内置服务器**
   ```bash
   php -S localhost:10010
   ```

4. **访问项目**
   打开浏览器访问：`http://localhost:10010`

#### 部署到生产环境

将项目文件上传到 Web 服务器（如 Nginx、Apache），配置虚拟主机指向项目目录，即可通过域名或 IP 访问。

**无需安装任何依赖**，纯静态文件即可运行。

## 📜 核心代码示例

```javascript
// 生成不重复的随机号码
function generateNumbers(count, max) {
  const nums = [];
  while (nums.length < count) {
    const n = Math.floor(Math.random() * max) + 1;
    if (!nums.includes(n)) nums.push(n);
  }
  return nums.sort((a,b) => a - b).map(n => n.toString().padStart(2, '0'));
}

// 双色球示例
function generateSSQ() {
  const red = generateNumbers(6, 33);
  const blue = generateNumbers(1, 16);
  return { red, blue };
}

// 大乐透示例
function generateDLT() {
  const front = generateNumbers(5, 35);
  const back = generateNumbers(2, 12);
  return { front, back };
}
```

## 💡 未来扩展

- ✅ 添加号码收藏功能
- ✅ 支持一键下载结果图片
- ✅ 接入真实开奖数据做历史统计
- ✅ 添加号码历史记录
- ✅ 支持自定义号码生成规则

## 📝 更新日志

### v1.0.0 (2025)
- ✨ 初始版本发布
- ✨ 支持双色球和大乐透号码生成
- ✨ 响应式设计，支持移动端
- ✨ Docker 部署支持

## 📜 版权

© 2025 My Lottery Project  
仅供学习与娱乐使用，不保证中奖。