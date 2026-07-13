# Shopify 品牌初始化数据清单

这份清单面向一个准备上线的 `ZENORA` 多市场服装独立站，覆盖：

- `menus`
- `pages`
- `collections`
- `products`
- `metafields`
- `filters`
- `markets`

当前建议品牌方向：

- 品牌定位：`极简通勤 / 都市轻奢 / 先锋设计感`
- 品类结构：`女装为主，男装为辅`
- 目标市场：`美国 / 欧洲（英国单独 GBP 价格带）`
- 价格带：
  - `USD 49.99 - 499.99`
  - `EUR 49.99 - 499.99`
  - `GBP 39.99 - 399.99`

## 一、Menus

### 主导航 `main-menu`

| Title | Link |
|---|---|
| New In | `/collections/new-in` |
| Women | `/collections/womenswear` |
| Men | `/collections/menswear` |
| About | `/pages/about` |
| FAQ | `/pages/faq` |

### 页脚导航 `footer-menu`

| Title | Link |
|---|---|
| Women | `/collections/womenswear` |
| Men | `/collections/menswear` |
| About | `/pages/about` |
| FAQ | `/pages/faq` |
| Shipping Policy | `/policies/shipping-policy` |
| Returns Policy | `/policies/refund-policy` |
| Contact | `/pages/contact` |

## 二、Pages

建议先建这些页面：

| Page Title | Handle | Template |
|---|---|---|
| About | `about` | `page.about` |
| FAQ | `faq` | `page.faq` |
| Contact | `contact` | `page` 或后续自定义 |
| Size Guide | `size-guide` | `page` |
| Shipping Policy | Shopify policy | Shopify policy |
| Returns Policy | Shopify policy | Shopify policy |

## 三、Collections

建议首发集合：

| Collection Title | Handle | Type | Purpose |
|---|---|---|---|
| New In | `new-in` | Manual / Automated | 首页和主推新款 |
| Womenswear | `womenswear` | Automated | 女装主集合 |
| Menswear Capsule | `menswear` | Automated | 男装辅集合，控制款数与风格一致性 |
| Commute Tailoring | `tailoring` | Automated | 通勤西装、衬衫、裤装、轻外套 |
| Dresses | `dresses` | Automated | 女装核心视觉与转化入口 |
| Layering Pieces | `layering-pieces` | Automated | 衬衫、轻针织、内搭与叠穿单品 |
| Best Sellers | `best-sellers` | Manual | 首页与广告承接 |
| Outerwear | `outerwear` | Automated | 高价带单品承接 |
| Occasion Edit | `occasion-edit` | Automated | 晚间、活动、节日穿搭场景 |

建议 collection 条件字段优先使用：

- `product type`
- `tag`
- `vendor`
- `price`
- `inventory stock`

## 四、Products

建议先准备 12-24 个真实商品，优先保证女装足够完整，再补男装 capsule 和高客单单品。

### 女装建议

| Product Title | Suggested Handle | Price Band | Notes |
|---|---|---|---|
| Elara Linen Midi Dress | `elara-linen-midi-dress` | `119 USD / 119 EUR / 99 GBP` | 核心视觉款 |
| Noa Weekend Dress | `noa-weekend-dress` | `99 / 99 / 79` | 中低价带入口 |
| Sloane Relaxed Shirt | `sloane-relaxed-shirt` | `84 / 84 / 69` | 可跨季 |
| Mira Tailored Pant | `mira-tailored-pant` | `96 / 96 / 79` | 通勤场景 |
| Celine Soft Set | `celine-soft-set` | `129 / 129 / 109` | 套装高转化 |
| Talia Summer Top | `talia-summer-top` | `79 / 79 / 59` | 低门槛加购 |
| Vera Sculpted Blazer | `vera-sculpted-blazer` | `229 / 229 / 189` | 先锋通勤感外套 |
| Inez Column Skirt | `inez-column-skirt` | `109 / 109 / 89` | 女装搭配扩展款 |

### 男装建议

| Product Title | Suggested Handle | Price Band | Notes |
|---|---|---|---|
| Rowan Overshirt | `rowan-overshirt` | `124 / 124 / 99` | 清爽叠穿与通勤层次 |
| Kael Pleated Trouser | `kael-pleated-trouser` | `146 / 146 / 119` | 男装主推裤装 |
| Ellis Drawstring Trouser | `ellis-drawstring-trouser` | `109 / 109 / 89` | 轻正式与城市日常 |
| Adrian Tailored Blazer | `adrian-tailored-blazer` | `249 / 249 / 199` | 高客单承接 |
| Luca Lightweight Overshirt | `luca-lightweight-overshirt` | `139 / 139 / 109` | 过渡季核心 |
| Mason Knit Polo | `mason-knit-polo` | `99 / 99 / 79` | 男装主图款 |
| Theo City Jacket | `theo-city-jacket` | `299 / 299 / 239` | 男装高价带代表 |

### 商品数据字段建议

每个商品至少补齐：

- 标题
- handle
- product type
- vendor
- 描述
- 主图 + 细节图 + 场景图
- 颜色
- 尺码
- 售价
- compare-at price
- 库存
- SKU
- 重量
- 材质
- 洗护方式

## 五、Metafields

建议先在 Shopify 后台建这些 product metafields：

| Namespace.Key | Type | Example | Use |
|---|---|---|---|
| `custom.fit_notes` | multi_line_text_field | `Fits true to size...` | 商品页 fit note |
| `custom.materials` | multi_line_text_field | `55% linen, 45% viscose` | 面料展示 |
| `custom.care_instructions` | multi_line_text_field | `Cold wash...` | 洗护说明 |
| `custom.model_info` | single_line_text_field | `Model is 177 cm and wears size S` | 模特信息 |
| `custom.size_guide` | metaobject_reference 或 rich text | `Size table` | 尺码指南 |
| `custom.shipping_note` | multi_line_text_field | `US delivery 6-10 business days` | 市场物流文案 |
| `custom.market_badge` | single_line_text_field | `Localized market pricing` | 商品卖点徽标 |
| `custom.gender_segment` | single_line_text_field | `women` / `men` / `unisex` | 过滤与集合归类 |

如果你后面要做更完整的品牌内容，也建议加：

- `custom.fabric_story`
- `custom.occasion`
- `custom.style_pairing`

## 六、Filters

通过 `Shopify Search & Discovery` 建议启用：

| Filter | Source |
|---|---|
| Availability | Shopify default |
| Price | Shopify default |
| Product type | Shopify default |
| Vendor | Shopify default |
| Size | Variant option |
| Color | Variant option |
| Gender Segment | Metafield `custom.gender_segment` |

集合页第一阶段建议最多展示这些筛选：

1. Availability
2. Price
3. Size
4. Color
5. Product type

## 七、Markets

建议 Markets 初始配置：

| Market | Currency | Language | Notes |
|---|---|---|---|
| United States | USD | English | 主首发市场 |
| United Kingdom | GBP | English | 欧洲市场中的独立 GBP 价格带 |
| Europe | EUR | English + 后续德语/法语 | 欧元区主市场 |

建议检查：

- `Domains / subfolders`
- `Regional pricing`
- `Tax inclusion`
- `Shipping rates`
- `Duties handling`
- `Language publishing`

## 八、Policies 与基础运营信息

至少先配置：

| Item | Recommendation |
|---|---|
| Support email | `support@zenora.com` |
| Returns window | `14 days` |
| US shipping estimate | `6-10 business days` |
| UK shipping estimate | `4-8 business days` |
| EU shipping estimate | `5-10 business days` |
| Free shipping threshold | 根据市场分别设置 |

## 九、Theme Editor 分配建议

首页：

- `hero-banner`
- `trust-strip`
- `category-grid`
- `featured-collection`
- `brand-story`
- `editorial-columns`

商品页：

- `main-product`

集合页：

- `main-collection-banner`
- `main-collection-grid`

页面：

- `page.about`
- `page.faq`

## 十、上线前最小测试集

上线前至少用真实数据验证这 6 项：

1. 不同市场的价格展示是否正确
2. 女装主集合与男装 capsule 的筛选是否正确
3. 多变体商品是否能正常切换和下单
4. 购物车抽屉是否能加减和删除
5. 退换货与配送文案是否与目标市场一致
6. About / FAQ / Contact 页面是否都已绑定模板
