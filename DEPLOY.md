# GitHub Pages 部署指南

## 快速部署步骤

### 1. 创建 GitHub 仓库
- 登录 GitHub，创建一个新仓库
- 仓库名可以是任意名称（如 `my-website`）

### 2. 配置 basePath（重要！）
如果您的仓库名**不是** `username.github.io`，需要修改 `next.config.ts`：

```typescript
// 取消注释并修改为您的仓库名
basePath: '/your-repo-name',
```

例如：仓库名是 `my-website`，则设置为 `basePath: '/my-site'`

### 3. 推送代码到 GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### 4. 启用 GitHub Pages
1. 进入仓库的 **Settings** 页面
2. 左侧菜单找到 **Pages**
3. **Source** 选择 **GitHub Actions**
4. 等待自动部署完成

### 5. 访问您的网站
- 如果仓库名是 `username.github.io`：`https://username.github.io`
- 其他仓库名：`https://username.github.io/your-repo-name`

## 注意事项

1. **图片路径**：所有图片使用 `/xxx.jpg` 格式，会自动适配 basePath
2. **首次部署**：推送代码后需要手动去 Settings > Pages 启用
3. **更新网站**：每次推送到 main 分支会自动重新部署

## 本地预览静态构建

```bash
pnpm run build
npx serve out
```

这样可以在本地预览静态导出后的效果。
