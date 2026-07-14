const adminData = window.ZENORA_ADMIN_DATA;
const storeConfig = window.ZENORA_STORE_CONFIG;
const adminState = {
  view: 'overview',
  range: 7,
  query: '',
  filter: 'all'
};

const pageTitles = {
  overview: '经营总览',
  orders: '订单交易',
  products: '商品库存',
  customers: '客户管理',
  marketing: '营销中心',
  analytics: '数据分析',
  traffic: '实时流量',
  settings: '系统连接'
};

function formatMoney(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

function scaleFactor() {
  return adminState.range === 7 ? 1 : adminState.range === 30 ? 4.12 : 12.4;
}

function scaled(value, decimals = 0) {
  const result = value * scaleFactor();
  return decimals ? result.toFixed(decimals) : Math.round(result);
}

function readLocalEvents() {
  try {
    return JSON.parse(localStorage.getItem('zenora-event-log-v1') || '[]');
  } catch {
    return [];
  }
}

function kpiCard(label, value, delta, icon) {
  const direction = delta >= 0 ? 'delta-up' : 'delta-down';
  const sign = delta >= 0 ? '↑' : '↓';
  return `<article class="admin-card kpi-card">
    <div class="kpi-card__top"><span>${label}</span><i class="kpi-card__icon">${icon}</i></div>
    <strong>${value}</strong>
    <span class="kpi-card__delta"><b class="${direction}">${sign} ${Math.abs(delta)}%</b> 较上一周期</span>
  </article>`;
}

function statusBadge(value) {
  const green = ['Paid', 'Fulfilled', 'Active', 'VIP', 'Returning'];
  const yellow = ['Pending', 'Processing', 'On hold', 'Low stock', 'At risk', 'New'];
  const red = ['Refunded', 'Returned', 'Out of stock', 'Paused'];
  const color = green.includes(value) ? 'green' : yellow.includes(value) ? 'yellow' : red.includes(value) ? 'red' : 'neutral';
  return `<span class="status status--${color}">${value}</span>`;
}

function revenueChart(series) {
  const width = 760;
  const height = 260;
  const pad = { left: 48, right: 20, top: 24, bottom: 34 };
  const max = Math.max(...series.map(item => item.revenue)) * 1.12;
  const x = index => pad.left + index * ((width - pad.left - pad.right) / (series.length - 1));
  const y = value => pad.top + (max - value) / max * (height - pad.top - pad.bottom);
  const points = series.map((item, index) => `${x(index)},${y(item.revenue)}`).join(' ');
  const area = `${pad.left},${height-pad.bottom} ${points} ${x(series.length-1)},${height-pad.bottom}`;
  const grid = [0, .25, .5, .75, 1].map(step => {
    const yy = pad.top + step * (height - pad.top - pad.bottom);
    const val = Math.round(max * (1-step));
    return `<line class="chart-grid-line" x1="${pad.left}" y1="${yy}" x2="${width-pad.right}" y2="${yy}"/><text class="chart-axis-label" x="0" y="${yy+4}">$${Math.round(val/1000)}k</text>`;
  }).join('');
  const labels = series.map((item,index) => `<text class="chart-axis-label" x="${x(index)}" y="${height-8}" text-anchor="middle">${item.day}</text>`).join('');
  const dots = series.map((item,index) => `<circle class="chart-dot" cx="${x(index)}" cy="${y(item.revenue)}" r="4"><title>${item.day} · ${formatMoney(item.revenue)}</title></circle>`).join('');
  return `<div class="chart-wrap"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="销售额趋势图">
    <defs><linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#aa6a46" stop-opacity=".26"/><stop offset="1" stop-color="#aa6a46" stop-opacity=".01"/></linearGradient></defs>
    ${grid}<polygon class="chart-area" points="${area}"/><polyline class="chart-line" points="${points}"/>${dots}${labels}
  </svg></div>`;
}

function funnelMarkup() {
  const max = adminData.funnel[0].value;
  return `<div class="funnel">${adminData.funnel.map((item, index) => {
    const percentage = item.value / max * 100;
    const prior = index ? adminData.funnel[index-1].value : item.value;
    const stepRate = item.value / prior * 100;
    return `<div class="funnel-row"><span>${item.label}</span><div class="funnel-bar"><i style="width:${Math.max(2,percentage)}%"></i></div><strong>${index ? stepRate.toFixed(1)+'%' : formatNumber(item.value)}</strong></div>`;
  }).join('')}</div>`;
}

function channelRows() {
  return adminData.channels.map(channel => `<div class="list-row"><b>${channel.name}</b><span>${formatNumber(scaled(channel.visitors))} 访问</span><span>${scaled(channel.orders)} 订单</span><strong>${formatMoney(scaled(channel.revenue))}</strong></div>`).join('');
}

function overviewView() {
  const o = adminData.overview;
  return `<div class="view-stack">
    <div class="admin-note">当前为演示数据模式，并混合显示此浏览器产生的真实前台事件。连接 Shopify、GA4 和数据采集接口后，可替换为真实经营数据。</div>
    <section class="kpi-grid">
      ${kpiCard('净销售额', formatMoney(scaled(o.revenue)), 18.4, '$')}
      ${kpiCard('订单数量', formatNumber(scaled(o.orders)), 12.7, '◎')}
      ${kpiCard('网站访客', formatNumber(scaled(o.visitors)), 22.1, '↗')}
      ${kpiCard('转化率', `${o.conversionRate}%`, -0.18, '%')}
    </section>
    <section class="section-grid section-grid--2">
      <article class="admin-card"><div class="card-head"><div><h2>销售趋势</h2><p>收入和订单随时间变化</p></div><button class="card-action" data-export="revenue">导出数据</button></div>${revenueChart(adminData.revenueSeries)}</article>
      <article class="admin-card"><div class="card-head"><div><h2>转化漏斗</h2><p>从访问到完成订单</p></div><strong>${o.conversionRate}%</strong></div>${funnelMarkup()}</article>
    </section>
    <section class="section-grid section-grid--3">
      <article class="admin-card"><div class="card-head"><div><h3>渠道表现</h3><p>流量、订单与销售额</p></div><button class="card-action" data-view-link="analytics">详情</button></div><div class="channel-list">${channelRows()}</div></article>
      <article class="admin-card"><div class="card-head"><div><h3>实时访客</h3><p>当前网站活动</p></div><div class="live-header"><i class="pulse"></i><strong>${adminData.liveVisitors.length + 17}</strong></div></div><div class="live-list">${adminData.liveVisitors.slice(0,4).map(item => `<div class="list-row"><b>${item.page}</b><span>${item.country}</span><span>${item.source}</span><strong>${item.duration}</strong></div>`).join('')}</div></article>
      <article class="admin-card"><div class="card-head"><div><h3>运营动态</h3><p>订单、营销和库存提醒</p></div></div><div class="activity-list">${adminData.activity.map(item => `<div class="activity-item"><time>${item.time}</time><i></i><span>${item.text}</span></div>`).join('')}</div></article>
    </section>
  </div>`;
}

function tableShell({ title, subtitle, type, filterOptions, headers, rows }) {
  return `<div class="view-stack"><section class="admin-card admin-card--flush">
    <div class="data-toolbar"><div><strong>${title}</strong><p style="margin:4px 0 0;color:var(--admin-muted);font-size:.8rem">${subtitle}</p></div><div class="toolbar-group"><button class="admin-button" data-export="${type}">导出 CSV</button><button class="admin-button admin-button--primary" data-primary-action="${type}">新建</button></div></div>
    <div class="data-toolbar"><div class="toolbar-group"><label class="search-field"><input type="search" placeholder="搜索名称、编号或邮箱" data-table-search></label>${filterOptions ? `<select class="admin-select" data-table-filter>${filterOptions}</select>` : ''}</div><span style="color:var(--admin-muted);font-size:.8rem" data-result-count>${rows.length} 条记录</span></div>
    <div class="table-scroll"><table class="admin-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody data-table-body>${rows.join('')}</tbody></table></div>
  </section></div>`;
}

function orderRows(data = adminData.orders) {
  return data.map(order => `<tr data-search="${[order.id,order.customer,order.email,order.country,order.channel,order.payment,order.fulfillment].join(' ').toLowerCase()}" data-filter="${order.payment}"><td><div class="table-primary"><strong>${order.id}</strong><span>${order.date}</span></div></td><td><div class="table-primary"><strong>${order.customer}</strong><span>${order.email}</span></div></td><td>${order.country}</td><td>${order.items}</td><td><strong>${formatMoney(order.total)}</strong></td><td>${statusBadge(order.payment)}</td><td>${statusBadge(order.fulfillment)}</td><td>${order.channel}</td><td><button class="card-action" data-row-action="${order.id}">查看</button></td></tr>`).join('');
}

function ordersView() {
  return tableShell({ title:'全部订单', subtitle:'支付、履约、退款和渠道归因', type:'orders', filterOptions:'<option value="all">全部付款状态</option><option>Paid</option><option>Pending</option><option>Refunded</option>', headers:['订单','客户','国家','商品数','金额','付款','履约','渠道','操作'], rows:[orderRows()] });
}

function productsView() {
  const rows = adminData.products.map(p => `<tr data-search="${`${p.name} ${p.sku} ${p.status}`.toLowerCase()}" data-filter="${p.status}"><td><div class="table-primary"><strong>${p.name}</strong><span>${p.sku}</span></div></td><td>${p.inventory}</td><td>${p.sold}</td><td><strong>${formatMoney(p.revenue)}</strong></td><td>${statusBadge(p.status)}</td><td><button class="card-action" data-row-action="${p.id}">编辑</button></td></tr>`);
  return tableShell({ title:'商品与库存', subtitle:'库存预警、销量和商品状态', type:'products', filterOptions:'<option value="all">全部状态</option><option>Active</option><option>Low stock</option><option>Out of stock</option>', headers:['商品','库存','已售','销售额','状态','操作'], rows });
}

function customersView() {
  const rows = adminData.customers.map(c => `<tr data-search="${`${c.name} ${c.email} ${c.country} ${c.segment}`.toLowerCase()}" data-filter="${c.segment}"><td><div class="table-primary"><strong>${c.name}</strong><span>${c.email}</span></div></td><td>${c.country}</td><td>${c.orders}</td><td><strong>${formatMoney(c.spent)}</strong></td><td>${statusBadge(c.segment)}</td><td>${c.lastOrder}</td><td><button class="card-action" data-row-action="${c.email}">查看</button></td></tr>`);
  return tableShell({ title:'客户资料', subtitle:'生命周期、消费金额和客户分群', type:'customers', filterOptions:'<option value="all">全部分群</option><option>VIP</option><option>Returning</option><option>New</option><option>At risk</option>', headers:['客户','国家','订单','累计消费','分群','最后订单','操作'], rows });
}

function marketingView() {
  return `<div class="view-stack">
    <section class="kpi-grid">
      ${kpiCard('营销收入', formatMoney(25000), 21.4, '↗')}
      ${kpiCard('广告花费', formatMoney(6604), 8.2, '$')}
      ${kpiCard('综合 ROAS', '3.78', 11.6, '×')}
      ${kpiCard('邮件订阅', formatNumber(1248), 28.3, '@')}
    </section>
    <section class="admin-card admin-card--flush"><div class="data-toolbar"><div><strong>营销活动</strong><p style="margin:4px 0 0;color:var(--admin-muted);font-size:.8rem">跨渠道预算、收入和转化</p></div><button class="admin-button admin-button--primary" data-primary-action="campaign">新建活动</button></div>
    <div class="table-scroll"><table class="admin-table"><thead><tr><th>活动</th><th>渠道</th><th>状态</th><th>花费</th><th>收入</th><th>转化</th><th>ROAS</th><th>操作</th></tr></thead><tbody>${adminData.campaigns.map(c=>`<tr><td><strong>${c.name}</strong></td><td>${c.channel}</td><td>${statusBadge(c.status)}</td><td>${formatMoney(c.spend)}</td><td><strong>${formatMoney(c.revenue)}</strong></td><td>${c.conversions}</td><td>${c.roas}</td><td><button class="card-action" data-row-action="${c.name}">管理</button></td></tr>`).join('')}</tbody></table></div></section>
    <section class="section-grid section-grid--2"><article class="admin-card"><div class="card-head"><div><h2>渠道收入占比</h2><p>各渠道贡献的销售额</p></div></div>${channelContribution()}</article><article class="admin-card"><div class="card-head"><div><h2>自动化建议</h2><p>基于当前漏斗的营销动作</p></div></div><div class="activity-list"><div class="activity-item"><time>01</time><i></i><span>针对 1,023 名加购未结账访客启动弃购邮件与再营销。</span></div><div class="activity-item"><time>02</time><i></i><span>The Noa Weekend Dress 库存偏低，暂停对应广告组。</span></div><div class="activity-item"><time>03</time><i></i><span>Email ROAS 最高，扩大 WELCOME10 自动化覆盖范围。</span></div></div></article></section>
  </div>`;
}

function channelContribution() {
  const total = adminData.channels.reduce((sum,c)=>sum+c.revenue,0);
  return `<div class="funnel">${adminData.channels.map(c=>`<div class="funnel-row"><span>${c.name}</span><div class="funnel-bar"><i style="width:${c.revenue/total*100}%"></i></div><strong>${(c.revenue/total*100).toFixed(1)}%</strong></div>`).join('')}</div>`;
}

function analyticsView() {
  return `<div class="view-stack">
    <section class="kpi-grid">${kpiCard('平均订单金额', formatMoney(adminData.overview.averageOrderValue), 5.8, '$')}${kpiCard('回头客占比', `${adminData.overview.returningCustomerRate}%`, 4.1, '○')}${kpiCard('加购率', '6.84%', 0.9, '+')}${kpiCard('结账完成率', '34.65%', -1.7, '%')}</section>
    <section class="section-grid section-grid--2"><article class="admin-card"><div class="card-head"><div><h2>渠道归因</h2><p>访客、订单、销售额与 ROAS</p></div></div><div class="channel-list">${adminData.channels.map(c=>`<div class="list-row"><b>${c.name}</b><span>${formatNumber(c.visitors)} 访客</span><span>${c.orders} 订单</span><strong>${c.roas ? c.roas+'×' : '自然'}</strong></div>`).join('')}</div></article><article class="admin-card"><div class="card-head"><div><h2>国家和市场</h2><p>访问、销售额和转化率</p></div></div><div class="country-list">${adminData.countries.map(c=>`<div class="list-row"><b>${c.name}</b><span>${formatNumber(c.visitors)} 访客</span><span>${c.conversion}% CVR</span><strong>${formatMoney(c.revenue)}</strong></div>`).join('')}</div></article></section>
    <section class="admin-card"><div class="card-head"><div><h2>转化漏斗诊断</h2><p>识别流失最大的环节</p></div><button class="card-action" data-export="funnel">导出</button></div>${funnelMarkup()}</section>
  </div>`;
}

function trafficView() {
  const localEvents = readLocalEvents();
  const minuteBars = [42,58,38,64,72,49,82,67,74,91,78,88,96,84,100,93,87,98,92,100];
  return `<div class="view-stack">
    <section class="section-grid section-grid--3"><article class="admin-card"><div class="card-head"><div><h2>当前在线</h2><p>最近 5 分钟活跃访客</p></div></div><div class="live-header"><i class="pulse"></i><strong class="live-number">${adminData.liveVisitors.length+17}</strong></div><div class="traffic-bars">${minuteBars.map((h,i)=>`<i class="traffic-bar ${i>16?'is-recent':''}" style="height:${h}%"></i>`).join('')}</div></article><article class="admin-card"><div class="card-head"><div><h2>热门页面</h2><p>当前访客正在浏览</p></div></div><div class="live-list"><div class="list-row"><b>/product.html</b><span>商品页</span><span>11 人</span><strong>41%</strong></div><div class="list-row"><b>/collection.html</b><span>集合页</span><span>8 人</span><strong>30%</strong></div><div class="list-row"><b>/index.html</b><span>首页</span><span>5 人</span><strong>19%</strong></div><div class="list-row"><b>/faq.html</b><span>FAQ</span><span>3 人</span><strong>10%</strong></div></div></article><article class="admin-card"><div class="card-head"><div><h2>设备分布</h2><p>实时设备与访问质量</p></div></div><div class="funnel"><div class="funnel-row"><span>Mobile</span><div class="funnel-bar"><i style="width:68%"></i></div><strong>68%</strong></div><div class="funnel-row"><span>Desktop</span><div class="funnel-bar"><i style="width:26%"></i></div><strong>26%</strong></div><div class="funnel-row"><span>Tablet</span><div class="funnel-bar"><i style="width:6%"></i></div><strong>6%</strong></div></div></article></section>
    <section class="section-grid section-grid--2"><article class="admin-card"><div class="card-head"><div><h2>实时访问明细</h2><p>页面、来源、国家和停留时长</p></div></div><div class="live-list">${adminData.liveVisitors.map(item=>`<div class="list-row"><b>${item.page}</b><span>${item.source}</span><span>${item.country} · ${item.device}</span><strong>${item.duration}</strong></div>`).join('')}</div></article><article class="admin-card"><div class="card-head"><div><h2>浏览器真实事件</h2><p>来自本设备前台同意分析后的事件</p></div><span class="status status--${localEvents.length?'green':'neutral'}">${localEvents.length} 条</span></div>${localEvents.length ? `<div class="activity-list">${localEvents.slice(0,10).map(event=>`<div class="activity-item"><time>${new Date(event.timestamp).toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'})}</time><i></i><span>${event.name} · ${event.path}</span></div>`).join('')}</div>` : `<div class="empty-state"><div><strong>暂无真实事件</strong><p>前台访客接受分析 Cookie 并产生浏览或交易行为后，将显示在这里。</p></div></div>`}</article></section>
  </div>`;
}

function settingsView() {
  const connections = [
    { icon:'S', name:'Shopify 交易与订单', ready: storeConfig.checkout.mode==='shopify' && storeConfig.checkout.shopifyDomain, description: storeConfig.checkout.shopifyDomain || '尚未填写店铺域名和 Variant ID' },
    { icon:'G', name:'Google Analytics 4', ready: Boolean(storeConfig.analytics.ga4MeasurementId), description: storeConfig.analytics.ga4MeasurementId || '尚未填写 Measurement ID' },
    { icon:'M', name:'Meta Pixel', ready: Boolean(storeConfig.analytics.metaPixelId), description: storeConfig.analytics.metaPixelId || '尚未填写 Pixel ID' },
    { icon:'T', name:'TikTok Pixel', ready: Boolean(storeConfig.analytics.tiktokPixelId), description: storeConfig.analytics.tiktokPixelId || '尚未填写 Pixel ID' },
    { icon:'@', name:'邮件订阅服务', ready: Boolean(storeConfig.newsletter.endpoint), description: storeConfig.newsletter.endpoint || '尚未填写订阅接口' },
    { icon:'DB', name:'统一事件采集接口', ready: Boolean(storeConfig.analytics.collectorEndpoint), description: storeConfig.analytics.collectorEndpoint || '尚未填写 Collector Endpoint' }
  ];
  return `<div class="view-stack"><div class="admin-note">这是 GitHub Pages 可运行的后台控制台，不具备安全的服务端身份验证。正式运营时应将后台部署到受保护域名，并通过 Shopify Admin API、GA4 Data API 或 Supabase 服务端函数读取真实数据，私密密钥不能写入前端。</div><section class="section-grid section-grid--2"><article class="admin-card"><div class="card-head"><div><h2>平台连接</h2><p>交易、营销和分析服务状态</p></div></div><div class="connection-list">${connections.map(c=>`<div class="connection-row"><i class="connection-icon">${c.icon}</i><div><strong>${c.name}</strong><p>${c.description}</p></div>${statusBadge(c.ready?'Active':'Not connected')}</div>`).join('')}</div></article><article class="admin-card"><div class="card-head"><div><h2>数据与安全</h2><p>正式运营需要完成</p></div></div><div class="activity-list"><div class="activity-item"><time>01</time><i></i><span>使用服务端管理员登录和角色权限，禁止公开访问后台。</span></div><div class="activity-item"><time>02</time><i></i><span>Shopify Webhook 同步订单、退款、库存和客户。</span></div><div class="activity-item"><time>03</time><i></i><span>事件采集接口写入数据库，建立访客匿名 ID 和会话。</span></div><div class="activity-item"><time>04</time><i></i><span>设置数据保留、删除请求、Cookie 同意和审计日志。</span></div></div><button class="admin-button admin-button--primary" style="margin-top:18px" data-open-docs>查看接入文档</button></article></section></div>`;
}

function renderView() {
  const content = document.querySelector('[data-admin-content]');
  document.querySelector('[data-page-title]').textContent = pageTitles[adminState.view];
  document.querySelectorAll('[data-view]').forEach(button => button.classList.toggle('is-active', button.dataset.view === adminState.view));
  const views = { overview:overviewView, orders:ordersView, products:productsView, customers:customersView, marketing:marketingView, analytics:analyticsView, traffic:trafficView, settings:settingsView };
  content.innerHTML = views[adminState.view]();
  bindViewInteractions();
}

function bindViewInteractions() {
  document.querySelector('[data-table-search]')?.addEventListener('input', filterTable);
  document.querySelector('[data-table-filter]')?.addEventListener('change', () => {
    const search = document.querySelector('[data-table-search]');
    if (search) search.value = '';
    filterTable();
  });
  document.querySelectorAll('[data-export]').forEach(button => button.addEventListener('click', () => exportData(button.dataset.export)));
  document.querySelectorAll('[data-view-link]').forEach(button => button.addEventListener('click', () => switchView(button.dataset.viewLink)));
  document.querySelectorAll('[data-primary-action]').forEach(button => button.addEventListener('click', () => showToast('该操作需要连接真实服务端后启用')));
  document.querySelectorAll('[data-row-action]').forEach(button => button.addEventListener('click', () => showToast(`已选择：${button.dataset.rowAction}`)));
  document.querySelector('[data-open-docs]')?.addEventListener('click', () => { window.location.href = './COMMERCE_ANALYTICS_SETUP.md'; });
}

function filterTable() {
  const search = document.querySelector('[data-table-search]')?.value.toLowerCase().trim() || '';
  const filter = document.querySelector('[data-table-filter]')?.value || 'all';
  adminState.query = search;
  adminState.filter = filter;
  let visible = 0;
  document.querySelectorAll('[data-table-body] tr').forEach(row => {
    const matchesSearch = !search || row.dataset.search.includes(search);
    const matchesFilter = filter === 'all' || row.dataset.filter === filter;
    row.hidden = !(matchesSearch && matchesFilter);
    if (!row.hidden) visible += 1;
  });
  const count = document.querySelector('[data-result-count]');
  if (count) count.textContent = `${visible} 条记录`;
}

function exportData(type) {
  const sources = { orders: adminData.orders, products: adminData.products, customers: adminData.customers, revenue: adminData.revenueSeries, funnel: adminData.funnel };
  const data = sources[type];
  if (!data) { showToast('暂无可导出数据'); return; }
  const headers = Object.keys(data[0]);
  const csv = [headers.join(','), ...data.map(row => headers.map(key => `"${String(row[key] ?? '').replaceAll('"','""')}"`).join(','))].join('\n');
  const blob = new Blob(['\ufeff'+csv], { type:'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `zenora-${type}-${new Date().toISOString().slice(0,10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showToast('CSV 已导出');
}

function showToast(message) {
  const toast = document.querySelector('[data-admin-toast]');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

function switchView(view) {
  if (!pageTitles[view]) return;
  adminState.view = view;
  adminState.query = '';
  adminState.filter = 'all';
  if (location.hash !== `#${view}`) history.replaceState({}, '', `#${view}`);
  document.querySelector('[data-sidebar]').classList.remove('is-open');
  renderView();
}

function initAdmin() {
  const initial = location.hash.slice(1);
  if (pageTitles[initial]) adminState.view = initial;
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => switchView(button.dataset.view)));
  document.querySelector('[data-menu-toggle]').addEventListener('click', () => document.querySelector('[data-sidebar]').classList.toggle('is-open'));
  document.querySelector('[data-range]').addEventListener('change', event => { adminState.range = Number(event.target.value); renderView(); });
  document.querySelector('[data-refresh]').addEventListener('click', event => { event.currentTarget.animate([{transform:'rotate(0)'},{transform:'rotate(360deg)'}],{duration:500}); renderView(); showToast('数据已刷新'); });
  window.addEventListener('hashchange', () => { const view = location.hash.slice(1); if (pageTitles[view]) switchView(view); });
  renderView();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAdmin, { once:true });
else initAdmin();
