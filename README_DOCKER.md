# Docker 部署说明

## 快速启动

### 1. 启动服务
```bash
docker-compose up -d
```

### 2. 访问项目
打开浏览器访问：`http://localhost:10010`

### 3. 停止服务
```bash
docker-compose down
```

### 4. 查看日志
```bash
docker-compose logs -f
```

## 端口说明
- 本地端口：10010
- 容器端口：80

## 项目结构
```
.
├── docker-compose.yml    # Docker Compose 配置文件
├── nginx.conf            # Nginx 配置文件
├── index.html            # 入口页面
├── app.js                # JavaScript 逻辑
└── style.css             # 样式文件
```

## 注意事项
- 确保本地端口 10010 未被占用
- 如果端口被占用，可以修改 `docker-compose.yml` 中的端口映射
- 项目文件会自动挂载到容器中，修改后无需重启容器（静态文件会立即生效）

