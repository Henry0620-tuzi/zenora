# Shopify 后台建站操作清单

这是一份按执行顺序整理的 Shopify 后台建站 Runbook，适合把当前 `ZENORA` 主题真正接进一个测试店铺。

适用前提：

- 站点类型：女装为主、男装为辅的跨境独立站
- 品牌定位：极简通勤 / 都市轻奢 / 先锋设计感
- 市场：美国 / 欧洲（英国单独 GBP 价格带）
- 币种：USD / GBP / EUR
- 主题：当前目录内 `shopify-theme/`

## 第 1 步：创建或准备测试店铺

1. 登录 Shopify 后台
2. 准备一个开发店铺或测试店铺
3. 确认你有以下权限：
   - Themes
   - Products
   - Collections
   - Markets
   - Settings

## 第 2 步：上传主题

1. 先按 [SHOPIFY_CLI_SETUP.md](/Users/sdy08/Documents/Codex/2026-06-08/new-chat/shopify-theme/SHOPIFY_CLI_SETUP.md) 本地接入
2. 执行：

```bash
shopify theme dev
```

3. 本地预览没问题后执行：

```bash
shopify theme push --unpublished
```

4. 在 Shopify 后台：
   - `Online Store`
   - `Themes`
   - 找到刚上传的未发布主题
   - 点击 `Customize`

## 第 3 步：配置基础店铺信息

后台路径：

- `Settings` → `Store details`

填写建议：

- Store name: `ZENORA`
- Store email: 真实运营邮箱
- Sender email: 建议品牌邮箱
- Customer support email: `support@zenora.com`
- Store currency: 先用主市场货币，后续交给 Markets 管理
- Store time zone: 按运营团队所在地设置

## 第 4 步：创建导航菜单

后台路径：

- `Content` 或 `Online Store` → `Navigation`

### 主导航 `main-menu`

新建菜单项：

1. `New In` → `/collections/new-in`
2. `Women` → `/collections/womenswear`
3. `Men` → `/collections/menswear`
4. `About` → `/pages/about`
5. `FAQ` → `/pages/faq`

### 页脚导航 `footer-menu`

新建菜单项：

1. `Women` → `/collections/womenswear`
2. `Men` → `/collections/menswear`
3. `About` → `/pages/about`
4. `FAQ` → `/pages/faq`
5. `Shipping Policy` → 对应 policy
6. `Returns Policy` → 对应 policy
7. `Contact` → `/pages/contact`

## 第 5 步：创建页面

后台路径：

- `Online Store` → `Pages`

创建页面：

1. `About`
   - Handle: `about`
2. `FAQ`
   - Handle: `faq`
3. `Contact`
   - Handle: `contact`
4. `Size Guide`
   - Handle: `size-guide`

创建完成后，在主题编辑器中分配模板：

1. 打开页面模板选择器
2. `About` 页面分配 `page.about`
3. `FAQ` 页面分配 `page.faq`

## 第 6 步：配置政策页

后台路径：

- `Settings` → `Policies`

至少填写：

1. Refund policy
2. Privacy policy
3. Terms of service
4. Shipping policy
5. Contact information

建议先写清楚：

- 14 天退货
- 各市场物流时效
- 是否含税
- 是否预收关税

## 第 7 步：创建集合

后台路径：

- `Products` → `Collections`

建议按这个顺序建立：

1. `New In`
2. `Womenswear`
3. `Menswear Capsule`
4. `Commute Tailoring`
5. `Dresses`
6. `Best Sellers`
7. `Outerwear`
8. `Layering Pieces`

建议规则：

- `Womenswear`
  - product type contains `women`
  - 或 tag contains `women`
- `Menswear Capsule`
  - product type contains `men`
  - 或 tag contains `men`
- `Commute Tailoring`
  - product type contains `tailoring`
  - 或 tag contains `tailoring`
- `Dresses`
  - product type contains `dress`
  - 或 tag contains `dress`

`Best Sellers` 建议先用手动集合。

## 第 8 步：创建 Metafields

后台路径：

- `Settings` → `Custom data` → `Products`

依次创建：

1. `custom.fit_notes`
   - Type: `Multi-line text`
2. `custom.materials`
   - Type: `Multi-line text`
3. `custom.care_instructions`
   - Type: `Multi-line text`
4. `custom.model_info`
   - Type: `Single line text`
5. `custom.size_guide`
   - Type: `Rich text` 或 `Metaobject reference`
6. `custom.shipping_note`
   - Type: `Multi-line text`
7. `custom.market_badge`
   - Type: `Single line text`
8. `custom.gender_segment`
   - Type: `Single line text`

## 第 9 步：创建商品

后台路径：

- `Products` → `Add product`

每个商品都建议按这套顺序填：

1. Title
2. Description
3. Media
4. Category / Product type
5. Vendor
6. Tags
7. Pricing
8. Inventory
9. Shipping
10. Variants
11. Search engine listing
12. Metafields

建议首批优先上这些：

- 女装 8-12 款
- 男装 4-6 款
- 每款至少 2 个颜色
- 每款至少 4-5 个尺码

## 第 10 步：配置 Search & Discovery

后台路径：

- 安装并打开 `Shopify Search & Discovery`

优先启用：

1. Availability
2. Price
3. Product type
4. Size
5. Color
6. Gender Segment

这样集合页的原生筛选才会在当前主题里正确显示。

## 第 11 步：配置 Markets

后台路径：

- `Settings` → `Markets`

依次建立或检查：

1. United States
   - Currency: USD
   - Language: English
2. United Kingdom
   - Currency: GBP
   - Language: English
   - Note: 作为欧洲市场中的独立 GBP 价格带
3. Europe
   - Currency: EUR
   - Language: English
   - 后续再加 German / French

检查项：

1. 域名或子目录
2. 价格是否按市场显示
3. 税费是否按市场逻辑处理
4. 配送区域是否正确

## 第 12 步：绑定主题配置

后台路径：

- `Online Store` → `Themes` → `Customize`

在主题编辑器里做这些事：

1. Header 绑定 `main-menu`
2. Footer 绑定 `footer-menu`
3. 首页 `featured-collection` 建议先绑定 `Best Sellers` 或 `Womenswear`
4. 首页 category 区块优先围绕 `Women / Commute Tailoring / Layering Pieces / Menswear Capsule`
5. About / FAQ 页面确认已绑定模板

## 第 13 步：联调重点检查

优先手动验证：

1. 首页是否正常加载
2. 集合页筛选是否正确
3. 商品页变体切换是否正常
4. 不可售组合是否禁用
5. Add to cart 是否能 Ajax 加购
6. Cart drawer 是否能加减和删除
7. Cart 页面是否正常
8. 不同市场价格是否正确显示

## 第 14 步：上线前最低检查表

上线前请至少确认：

1. 邮箱和发件邮箱已配置
2. 菜单无死链
3. 页面模板分配正确
4. 商品图完整
5. 价格和 compare-at price 正确
6. 所有主推商品有库存
7. Filters 已正确显示
8. Markets 已配置
9. Policies 已填写
10. 购物车和结账链路已实际测试
