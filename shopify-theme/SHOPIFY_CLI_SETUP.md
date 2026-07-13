# Shopify CLI 接入与上传测试步骤

这份文档面向把当前 `shopify-theme/` 目录接入真实 Shopify 店铺进行测试。

当前这套主题默认基于以下品牌策略：

- `ZENORA`
- `极简通勤 / 都市轻奢 / 先锋设计感`
- `女装为主，男装为辅`
- `美国 / 欧洲（英国单独 GBP 价格带）`

## 一、准备条件

- 已安装 Shopify CLI
- 已有一个 Shopify 开发店铺或可访问的测试店铺
- 已登录 Shopify 账号并有主题编辑权限

官方文档：

- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli)
- [Theme Commands](https://shopify.dev/docs/api/shopify-cli/theme)
- [Shopify Themes Architecture](https://shopify.dev/docs/storefronts/themes/architecture)

## 二、本地接入方式

建议步骤：

1. 在空目录创建一个新主题壳：

```bash
shopify theme init dawn-like-test
```

2. 进入新目录：

```bash
cd dawn-like-test
```

3. 删除或备份默认生成的主题文件后，把当前项目里的 `shopify-theme/` 内容复制进去。

4. 登录店铺：

```bash
shopify login --store your-store.myshopify.com
```

5. 启动本地预览：

```bash
shopify theme dev
```

这会提供一个开发预览链接，可直接在浏览器中查看。

## 三、上传到测试主题

如果本地预览正常，再执行：

```bash
shopify theme push --unpublished
```

这样会把主题上传为未发布主题，适合内部测试。

## 四、需要在 Shopify 后台完成的配置

### 1. 菜单

建议建立：

- 主导航：New In / Women / Men / About / FAQ
- 页脚导航：Women / Men / About / FAQ / Shipping Policy / Contact

然后在主题编辑器里把菜单绑定到：

- `Header`
- `Footer`

### 2. 页面模板分配

创建两个页面：

- `About`
- `FAQ`

然后分别分配模板：

- `page.about`
- `page.faq`

### 3. 集合与商品

建议至少准备：

- 一个首页精选集合（建议 `Best Sellers` 或 `Womenswear`）
- 一个 womenswear 集合
- 一个 menswear capsule 集合
- 一个真实可售商品，带多变体和多媒体

这样可以真实验证：

- `featured-collection`
- `main-collection-grid`
- `main-product`

### 4. Search & Discovery 筛选

到 Shopify 后台安装并配置 `Search & Discovery`，否则集合页的原生 filters 不会显示完整效果。

建议至少开启：

- Availability
- Price
- Product type
- Size
- Color

### 5. Shopify Markets

为了验证这套多市场文案和价格逻辑，建议至少配置：

- United States
- United Kingdom
- Europe

这里的 `United Kingdom` 建议理解为欧洲市场下单独管理的 GBP 价格层，而不是一套完全独立的品牌策略。

并检查：

- 币种切换
- 文案语言
- 税费和运费展示

## 五、当前主题已包含的能力

- Online Store 2.0 JSON templates
- section group header / footer
- locales 基础文件
- collection 原生 filters 基础接入
- product 变体切换
- variant 不可用态基础禁用
- product media 缩略图切换
- ajax add-to-cart 基础流程
- cart drawer 基础结构

## 六、上传测试时重点检查

1. 产品无图或媒体较少时，商品页是否仍然稳定
2. 多 option 变体组合时，禁用态是否符合实际库存
3. `cart/add.js` 在目标店铺主题上下文中是否正常返回
4. filters 与排序同时使用时 URL 参数是否正确保留
5. 动态结账按钮是否与支付设置兼容

## 七、当前仍建议继续完善的部分

- 更完整的 variant availability matrix
- 购物车抽屉内的数量修改和删除
- 更丰富的无刷新筛选体验
- 更完整的无障碍属性
- locales 扩展到更多目标语言
- 与真实品牌素材、图片、产品 metafields 的联动
