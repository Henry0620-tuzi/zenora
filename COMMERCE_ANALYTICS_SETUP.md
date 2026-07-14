# ZENORA 交易、营销与分析接入说明

当前 GitHub Pages 版本已经具备可用的交易前端、购物车、结账摘要、订阅表单、Cookie 同意和事件埋点框架。真实收款与第三方数据发送默认关闭，所有账号参数集中在 `store-config.js`。

## 1. 开启 Shopify 真实结账

在 `store-config.js` 中修改：

```js
checkout: {
  mode: 'shopify',
  shopifyDomain: 'your-store.myshopify.com'
}
```

然后为每个商品填写 Shopify Variant ID：

```js
shopifyVariants: {
  'Sand|S': '1234567890',
  'Sand|M': '1234567891'
}
```

配置完成后，结账页会把购物车转换成 Shopify Cart Permalink，并跳转到 Shopify 的安全结账页面。没有完整 Variant ID 的订单会继续保持测试模式，避免错误收款。

## 2. 接入邮件订阅

把 `newsletter.endpoint` 设置为你的邮件服务 API 或自建 Serverless 接口：

```js
newsletter: {
  endpoint: 'https://your-endpoint.example.com/subscribe',
  discountCode: 'WELCOME10'
}
```

接口应接受 JSON：

```json
{
  "email": "buyer@example.com",
  "source": "zenora_storefront",
  "attribution": {
    "utm_source": "instagram"
  }
}
```

推荐连接 Shopify Email、Klaviyo、Mailchimp 或 Brevo。不要把私密 API Key 写进前端文件，应通过 Serverless 函数代理。

## 3. 接入分析平台

填写公开的 Pixel ID：

```js
analytics: {
  ga4MeasurementId: 'G-XXXXXXXXXX',
  metaPixelId: '1234567890',
  tiktokPixelId: 'XXXXXXXXXX',
  collectorEndpoint: 'https://your-api.example.com/events'
}
```

只有用户点击 `Accept analytics` 后脚本才会加载。当前已经发送这些事件：

- `page_view`
- `view_item`
- `add_to_cart`
- `remove_from_cart`
- `begin_checkout`
- `sign_up`
- `consent_update`

UTM 参数和首次来源会保存在浏览器本地，并随订阅请求和事件一起传递。

## 4. 运营后台

后台入口：`admin.html`

当前后台包含：

- 经营总览和销售趋势
- 订单、支付、履约和退款列表
- 商品库存与低库存提醒
- 客户分群与消费金额
- 营销活动、预算、收入和 ROAS
- 渠道归因、国家市场和转化漏斗
- 实时访客、热门页面、设备分布
- 浏览器真实事件日志和 CSV 导出

GitHub Pages 无法安全保存管理员密钥，也不能保护后台页面。正式运营建议：

1. 使用 Shopify Admin API 和 Webhook 同步订单、退款、库存和客户。
2. 使用 Supabase、Cloudflare Workers 或其他后端保存事件和运营数据。
3. 为 `admin.html` 增加服务端登录、管理员角色和审计日志。
4. 使用 GA4 Data API 拉取跨设备、跨访客流量，而不是只读取浏览器本地事件。
5. 所有 Shopify Admin Token、数据库密钥和邮件服务密钥必须放在服务端环境变量中。

## 5. 上线前必做

1. 使用真实 Shopify 商品和 Variant ID 完成测试订单。
2. 配置支付、物流、税费、退款和 Shopify Markets。
3. 配置邮件接口并验证双重确认与退订。
4. 填写像素 ID，并在各平台的测试事件工具中验收。
5. 发布隐私政策、Cookie 政策和数据处理说明。
6. 使用正式域名，不要把 GitHub Pages 当作最终收款域名。
