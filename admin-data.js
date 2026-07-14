window.ZENORA_ADMIN_DATA = {
  overview: {
    revenue: 28460,
    orders: 237,
    visitors: 18420,
    conversionRate: 1.29,
    averageOrderValue: 120.08,
    returningCustomerRate: 27.4
  },
  revenueSeries: [
    { day: '07/01', revenue: 2680, orders: 21, visitors: 1510 },
    { day: '07/02', revenue: 3120, orders: 25, visitors: 1680 },
    { day: '07/03', revenue: 2860, orders: 23, visitors: 1710 },
    { day: '07/04', revenue: 4290, orders: 34, visitors: 2240 },
    { day: '07/05', revenue: 3880, orders: 31, visitors: 2050 },
    { day: '07/06', revenue: 4610, orders: 38, visitors: 2460 },
    { day: '07/07', revenue: 7020, orders: 65, visitors: 2770 }
  ],
  funnel: [
    { label: '访问网站', value: 18420 },
    { label: '浏览商品', value: 11260 },
    { label: '加入购物车', value: 1260 },
    { label: '开始结账', value: 684 },
    { label: '完成订单', value: 237 }
  ],
  channels: [
    { name: 'Meta Ads', visitors: 6240, orders: 96, revenue: 11920, roas: 3.8 },
    { name: 'Google Search', visitors: 4380, orders: 54, revenue: 6720, roas: 4.2 },
    { name: 'TikTok', visitors: 3610, orders: 39, revenue: 4380, roas: 2.7 },
    { name: 'Direct', visitors: 2480, orders: 31, revenue: 3460, roas: null },
    { name: 'Email', visitors: 1710, orders: 17, revenue: 1980, roas: 8.1 }
  ],
  countries: [
    { name: 'United States', code: 'US', visitors: 8420, revenue: 13240, conversion: 1.48 },
    { name: 'United Kingdom', code: 'GB', visitors: 3180, revenue: 5260, conversion: 1.42 },
    { name: 'Germany', code: 'DE', visitors: 2460, revenue: 3540, conversion: 1.18 },
    { name: 'France', code: 'FR', visitors: 2260, revenue: 3280, conversion: 1.16 },
    { name: 'Other Europe', code: 'EU', visitors: 2100, revenue: 3140, conversion: 1.05 }
  ],
  liveVisitors: [
    { page: '/product.html', source: 'Meta Ads', country: 'US', device: 'Mobile', duration: '4m 18s' },
    { page: '/collection.html', source: 'Google', country: 'GB', device: 'Desktop', duration: '2m 41s' },
    { page: '/index.html', source: 'Direct', country: 'DE', device: 'Mobile', duration: '1m 09s' },
    { page: '/product.html', source: 'TikTok', country: 'FR', device: 'Mobile', duration: '38s' },
    { page: '/faq.html', source: 'Email', country: 'US', device: 'Tablet', duration: '5m 02s' }
  ],
  orders: [
    { id: 'ZEN-1048', date: '2026-07-14 09:42', customer: 'Emma Wilson', email: 'emma@example.com', country: 'US', total: 236, payment: 'Paid', fulfillment: 'Unfulfilled', items: 2, channel: 'Meta Ads' },
    { id: 'ZEN-1047', date: '2026-07-14 09:18', customer: 'Sophie Martin', email: 'sophie@example.com', country: 'FR', total: 129, payment: 'Paid', fulfillment: 'Processing', items: 1, channel: 'Google' },
    { id: 'ZEN-1046', date: '2026-07-14 08:51', customer: 'Olivia Brown', email: 'olivia@example.com', country: 'GB', total: 196, payment: 'Paid', fulfillment: 'Fulfilled', items: 2, channel: 'Email' },
    { id: 'ZEN-1045', date: '2026-07-14 08:24', customer: 'Mia Johnson', email: 'mia@example.com', country: 'US', total: 118, payment: 'Pending', fulfillment: 'On hold', items: 1, channel: 'TikTok' },
    { id: 'ZEN-1044', date: '2026-07-13 22:17', customer: 'Anna Müller', email: 'anna@example.com', country: 'DE', total: 267, payment: 'Refunded', fulfillment: 'Returned', items: 3, channel: 'Direct' },
    { id: 'ZEN-1043', date: '2026-07-13 21:05', customer: 'Isabella Clark', email: 'isabella@example.com', country: 'US', total: 146, payment: 'Paid', fulfillment: 'Fulfilled', items: 1, channel: 'Meta Ads' }
  ],
  products: [
    { id: 'the-elara-linen-midi-dress', name: 'The Elara Linen Midi Dress', sku: 'ZEN-ELARA', inventory: 68, sold: 84, revenue: 9912, status: 'Active' },
    { id: 'the-celine-soft-set', name: 'The Celine Soft Set', sku: 'ZEN-CELINE', inventory: 24, sold: 52, revenue: 6708, status: 'Low stock' },
    { id: 'the-rowan-overshirt', name: 'The Rowan Overshirt', sku: 'ZEN-ROWAN', inventory: 41, sold: 38, revenue: 4712, status: 'Active' },
    { id: 'the-noa-weekend-dress', name: 'The Noa Weekend Dress', sku: 'ZEN-NOA', inventory: 15, sold: 42, revenue: 4116, status: 'Low stock' },
    { id: 'the-mira-tailored-pant', name: 'The Mira Tailored Pant', sku: 'ZEN-MIRA', inventory: 0, sold: 36, revenue: 2808, status: 'Out of stock' },
    { id: 'the-talia-summer-top', name: 'The Talia Summer Top', sku: 'ZEN-TALIA', inventory: 92, sold: 27, revenue: 2133, status: 'Active' }
  ],
  customers: [
    { name: 'Emma Wilson', email: 'emma@example.com', country: 'US', orders: 4, spent: 584, segment: 'VIP', lastOrder: '2026-07-14' },
    { name: 'Olivia Brown', email: 'olivia@example.com', country: 'GB', orders: 3, spent: 426, segment: 'Returning', lastOrder: '2026-07-14' },
    { name: 'Sophie Martin', email: 'sophie@example.com', country: 'FR', orders: 1, spent: 129, segment: 'New', lastOrder: '2026-07-14' },
    { name: 'Anna Müller', email: 'anna@example.com', country: 'DE', orders: 5, spent: 812, segment: 'VIP', lastOrder: '2026-07-13' },
    { name: 'Mia Johnson', email: 'mia@example.com', country: 'US', orders: 1, spent: 118, segment: 'At risk', lastOrder: '2026-07-14' }
  ],
  campaigns: [
    { name: 'Women First Launch', channel: 'Meta Ads', status: 'Active', spend: 3140, revenue: 11920, conversions: 96, roas: 3.8 },
    { name: 'City Wardrobe Search', channel: 'Google', status: 'Active', spend: 1600, revenue: 6720, conversions: 54, roas: 4.2 },
    { name: 'Summer Edit Creatives', channel: 'TikTok', status: 'Paused', spend: 1620, revenue: 4380, conversions: 39, roas: 2.7 },
    { name: 'WELCOME10 Flow', channel: 'Email', status: 'Active', spend: 244, revenue: 1980, conversions: 17, roas: 8.1 }
  ],
  activity: [
    { time: '09:42', type: 'order', text: '新订单 ZEN-1048，金额 $236' },
    { time: '09:36', type: 'traffic', text: 'Meta Ads 访问量较昨日同期上升 18%' },
    { time: '09:21', type: 'inventory', text: 'The Noa Weekend Dress 库存低于 20 件' },
    { time: '09:03', type: 'marketing', text: 'WELCOME10 邮件自动化带来 3 笔订单' },
    { time: '08:47', type: 'refund', text: '订单 ZEN-1044 已完成退款' }
  ]
};
