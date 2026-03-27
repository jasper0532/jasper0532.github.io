# 熊猫威士 - 出国劳务中介网站

一个专业的出国劳务中介服务网站，提供日本、韩国、新加坡、新西兰、澳大利亚等国家的出国劳务、签证办理等服务。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **UI 组件**: shadcn/ui + Radix UI
- **样式**: Tailwind CSS v4
- **语言**: TypeScript 5
- **包管理器**: pnpm

## 功能特点

- 响应式设计，支持移动端
- 深色/浅色主题切换
- 成功案例展示
- 在线咨询表单
- SEO 友好

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 部署到 GitHub Pages

详细步骤请查看 [DEPLOY.md](./DEPLOY.md)

### 快速部署

1. 创建 GitHub 仓库
2. 如果仓库名不是 `username.github.io`，修改 `next.config.ts` 中的 `basePath`
3. 推送代码到 GitHub
4. 在仓库设置中启用 GitHub Pages（Source 选择 GitHub Actions）
5. 等待自动部署完成

## 项目结构

```
├── public/              # 静态资源（图片等）
├── src/
│   ├── app/             # 页面路由
│   │   ├── page.tsx     # 首页
│   │   ├── layout.tsx   # 布局
│   │   └── globals.css  # 全局样式
│   └── components/      # React 组件
│       └── ui/          # shadcn/ui 组件
├── .github/workflows/   # GitHub Actions 配置
├── next.config.ts       # Next.js 配置
└── package.json         # 项目依赖
```

## 联系方式

如有问题，请联系网站管理员。

---

© 2024 熊猫威士. All rights reserved.
