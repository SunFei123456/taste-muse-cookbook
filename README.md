# 美食菜谱平台

一个基于 **Vue 3 + Vite + Vuetify 3** 打造的美食主题前端项目，提供菜谱浏览、主厨推荐、沉浸式详情页与社区交流功能。项目仅模拟前端交互，不包含真实后端服务，适合作为课程作品或界面展示示例。

## ✨ 功能亮点

- **沉浸式首页**：
  - 全屏 Parallax 头图与暖色调主题营造艺术氛围。
  - 分类滑动标签、主厨推荐与网格/列表自由切换的菜谱墙。
- **菜谱详情页**：
  - 大图头图、食材分栏、时间轴式烹饪步骤，支持平滑滚动到顶部。
- **美食社区**：
  - 横幅海报、帖子卡片、弹窗查看全文以及新话题发布（前端模拟）。
- **用户体系（前端模拟）**：
  - 登录/注册、个人中心、登录态导航展示。
- **全站统一风格**：
  - NavBar、Footer、背景色与字体保持一致，注重中文注释与可读性。

## 🛠 技术栈

- **框架**：Vue 3 (Composition API)
- **构建工具**：Vite
- **UI 库**：Vuetify 3
- **状态管理**：Pinia（用户与菜谱/社区数据）
- **路由**：Vue Router（含多布局切换）

## 📂 目录结构（节选）

```
├─ src
│  ├─ assets/                  # 图片与静态资源
│  │  ├─ hero.avif             # 首页头图背景
│  │  ├─ feature-food.avif     # 主厨推荐图
│  │  ├─ meishi-banner.jpg     # 社区横幅
│  │  └─ …                     # 其他菜品/插图
│  ├─ components/              # 公共组件
│  │  ├─ NavBar.vue            # 顶部导航，含桌面/移动菜单
│  │  ├─ RecipeCard.vue        # 菜谱卡片，支持网格/列表布局
│  │  └─ Footer.vue            # 页脚信息
│  ├─ layouts/
│  │  ├─ DefaultLayout.vue     # 主布局（含 NavBar + Footer）
│  │  └─ AuthLayout.vue        # 登录/注册页使用的全屏布局
│  ├─ stores/                  # Pinia 状态管理
│  │  ├─ user.js               # 用户登录/注册/资料修改（localStorage 模拟）
│  │  ├─ recipes.js            # 菜谱与主厨推荐数据
│  │  └─ forum.js              # 社区帖子与发帖逻辑
│  ├─ views/                   # 页面级组件
│  │  ├─ HomeView.vue          # 首页（头图、分类、推荐、列表）
│  │  ├─ RecipeDetail.vue      # 菜谱详情（食材/步骤）
│  │  ├─ ForumView.vue         # 社区列表与弹窗详情
│  │  ├─ LoginView.vue         # 登录
│  │  ├─ RegisterView.vue      # 注册
│  │  └─ ProfileView.vue       # 个人中心
│  └─ router/index.js          # 路由配置与布局切换
├─ README.md                   # 项目说明
└─ package.json                # 依赖与脚本
```

## 🚀 本地运行

1. **安装依赖**
   ```bash
   npm install
   ```
2. **启动开发服务器**
   ```bash
   npm run dev
   ```
3. **访问**：浏览器打开提示的本地地址（默认 `http://localhost:5173/`）。

> 若遇到依赖安装缓慢，建议切换国内镜像源再执行 `npm install`。

## 🧪 模拟数据说明

- 菜谱数据（含主厨推荐）存放于 `src/stores/recipes.js`。
- 社区帖子及新增逻辑位于 `src/stores/forum.js`。
- 用户信息模拟于 `src/stores/user.js`，使用 `localStorage` 保留登录状态。

## 🧩 Vuetify 组件与语法说明

- **`<v-app-bar>` / `<v-navigation-drawer>`**：配合 `v-model="drawer"` 控制移动端抽屉开关，`app-bar-nav-icon` 作为触发器。
- **`<v-parallax>`**：传入 `:src="heroImage"` 与 `height="550"` 实现全幅滚动视差背景。
- **`<v-slide-group>` 与 `<v-slide-group-item>`**：用于分类滑动标签，`show-arrows` 开启导航箭头，可自定义卡片点击逻辑。
- **`<v-card>` 组合**：大量使用 `rounded`、`elevation`、`variant`、`link` 等属性快速构建卡片式 UI，嵌套 `<v-card-item>`、`<v-card-text>`、`<v-card-actions>` 分层。
- **`<v-dialog>`**：社区帖子详情和发布弹窗均使用 `v-model` 双向绑定开关，并通过 `<v-card>` 作为内容容器。
- **`<v-btn>` 与 `router-link`**：`to="/forum"` 或 `:to="\`/recipe/${id}\`` 能直接实现路由跳转；`variant="text/flat/tonal"` 快速切换按钮样式。
- **`<v-img>`**：支持 `cover`、`gradient` 均用于大图+渐变遮罩；`v-slot:placeholder` 在 `RecipeCard` 中展示加载状态。
- **实用类**：`class="d-flex align-center"`、`gap-*` 等是 Vuetify 提供的工具类，统一响应式布局；`rounded="pill"`、`density="compact"` 等用于快速调整组件形态。

## 📸 界面截图（可选）

若需在 README 中展示效果，可在 `assets` 中加入截图并在此处引用。

## 📄 许可证

本项目仅用于学习与课程展示，如需商用请根据实际情况调整与扩展。
