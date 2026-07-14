# 搭建服装跨境独立站

- Thread ID: `019ea7e4-d4e1-7980-8957-e6b156ccdae7`
- 历史主题：ZENORA、跨境服装独立站、Shopify Dawn 结构、商品/集合/关于/FAQ 页面、购物车和后台初始化文档。
- 总恢复清单：`/Users/sdy08/Documents/bingbing/Codex项目历史恢复清单.md`

## 在线版本

仓库根目录是可直接部署到 GitHub Pages 的 ZENORA 静态站，入口为 `index.html`。

配套运营后台入口为 `admin.html`，覆盖订单、商品库存、客户、营销、数据分析和实时流量。GitHub Pages 版本使用演示经营数据，并读取当前浏览器产生的真实前台事件；正式运营需连接服务端数据源和管理员鉴权。

`shopify-theme/` 保存可通过 Shopify CLI 上传和联调的主题源码，不参与 GitHub Pages 的运行。

## 本地预览

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000/index.html`。

后台地址：`http://localhost:8000/admin.html`
