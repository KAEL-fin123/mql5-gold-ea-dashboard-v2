# MQL5 Gold EA Dashboard v2

一个专业的黄金EA交易机器人排行榜系统，基于 Next.js 构建，集成了 Supabase 数据库和 GitHub MCP 服务。

## ✨ 功能特性

- 📊 **EA排行榜**：展示黄金EA的详细性能数据
- 📈 **数据可视化**：使用 Recharts 展示交易统计
- 💡 **用户建议**：用户可以提交EA建议，自动创建 GitHub Issues
- 🔒 **安全防护**：IP限流、数据验证、环境变量保护
- 🚀 **现代技术栈**：Next.js 15、React 19、TypeScript、TailwindCSS
- 🤖 **MCP集成**：自动化GitHub工作流程

## 🛠️ 技术栈

- **前端框架**：Next.js 15 + React 19
- **样式**：TailwindCSS + Lucide Icons
- **数据库**：Supabase (PostgreSQL)
- **状态管理**：Zustand + React Query
- **表单处理**：React Hook Form + Zod
- **图表**：Recharts
- **部署**：Vercel
- **自动化**：GitHub MCP

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/KAEL-fin123/mql5-gold-ea-dashboard-v2.git
cd mql5-gold-ea-dashboard-v2
```

### 2. 安装依赖

```bash
npm install
```

### 3. 环境配置

创建 `.env.local` 文件：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin Configuration
ADMIN_SECRET_KEY=your_admin_secret

# GitHub MCP Configuration
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repository_name
GITHUB_BRANCH=main
```

### 4. 数据库设置

在 Supabase 控制台执行 `database/schema.sql` 文件来创建数据表。

### 5. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React 组件
│   ├── hooks/              # 自定义 Hooks
│   └── lib/                # 工具库和配置
├── database/               # 数据库脚本
├── scripts/                # 工具脚本
├── public/                 # 静态资源
└── docs/                   # 项目文档
```

## 🚀 部署

### Vercel 部署

1. 将项目推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署

## 📝 开发指南

### 添加新的 EA 数据

1. 使用 `scripts/` 目录下的脚本管理数据
2. 确保数据格式符合数据库 schema
3. 测试数据完整性

### 自定义主题

项目支持深色/浅色主题切换，可在 `src/app/globals.css` 中自定义主题变量。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License