import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 静态导出配置（用于 GitHub Pages 部署）
  output: 'export',
  
  // 如果您的仓库名不是 username.github.io，请取消下面这行的注释并修改为您的仓库名
  // 例如：如果您的仓库是 https://github.com/yourname/my-site，则设置为 '/my-site'
  // basePath: '/your-repo-name',
  
  // 静态导出不支持图片优化，需要禁用
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lf-coze-web-cdn.coze.cn',
        pathname: '/**',
      },
    ],
  },
  
  allowedDevOrigins: ['*.dev.coze.site'],
};

export default nextConfig;
