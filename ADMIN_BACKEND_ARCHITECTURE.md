# ZENORA 正式后台架构建议

当前 `admin.html` 是可运行的运营控制台前端。要成为正式后台，推荐使用以下数据链路。

## 数据源

- Shopify Admin API：订单、商品、库存、客户、退款、折扣
- Shopify Webhooks：orders/create、orders/paid、orders/fulfilled、refunds/create、inventory_levels/update
- GA4 Data API：访问量、页面、国家、设备、转化事件
- Meta Marketing API：广告花费、点击、转化和 ROAS
- TikTok Business API：广告活动和归因数据
- 邮件平台 API：订阅、打开、点击、自动化收入

## 推荐服务端

- 数据库：PostgreSQL / Supabase
- API：Supabase Edge Functions、Cloudflare Workers 或 Next.js API
- 登录：Supabase Auth / Auth0 / Shopify App OAuth
- 定时同步：Cron / GitHub Actions / Cloudflare Cron Triggers

## 最小数据表

- `admin_users`
- `orders`
- `order_items`
- `products`
- `inventory_snapshots`
- `customers`
- `events`
- `sessions`
- `campaign_metrics`
- `daily_store_metrics`
- `audit_logs`

## 安全要求

1. 后台不得直接公开在无鉴权静态地址上。
2. 管理员 Token 和平台密钥只保存在服务端环境变量。
3. 每个写操作记录管理员、时间、对象和修改内容。
4. 按角色限制订单退款、库存修改、营销预算和数据导出权限。
5. 对客户邮箱、地址、订单和行为数据设置访问控制及保留周期。
