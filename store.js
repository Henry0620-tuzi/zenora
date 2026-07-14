const zenoraConfig = window.ZENORA_STORE_CONFIG;
const ZENORA_CART_KEY = 'zenora-cart-v1';
const ZENORA_CONSENT_KEY = 'zenora-consent-v1';
const ZENORA_ATTRIBUTION_KEY = 'zenora-attribution-v1';
const ZENORA_EVENT_LOG_KEY = 'zenora-event-log-v1';

const ZENORA_STORE_COPY = {
  en: {
    cart: 'Cart', cartTitle: 'Your cart', emptyTitle: 'Your cart is empty', emptyBody: 'Explore the ZENORA edit and add a piece to continue.', shop: 'Shop the collection', away: '{amount} away from free shipping', freeShipping: 'Free shipping unlocked', subtotal: 'Subtotal', shippingTaxes: 'Shipping, duties and taxes are calculated at checkout.', checkout: 'Checkout securely', continueShopping: 'Continue shopping', remove: 'Remove', quantity: 'Quantity', added: '{product} added to cart', secureCheckout: 'Secure checkout', reviewOrder: 'Review your order.', orderSummary: 'Order summary', estimatedShipping: 'Estimated shipping', free: 'Free', estimatedTotal: 'Estimated total', paymentRequired: 'Payment connection required', testMode: 'Test mode', testModeBody: 'Your cart is working. Add a Shopify domain and variant IDs in store-config.js to enable real payment.', continuePayment: 'Continue to secure payment', paymentHandoff: 'You will complete payment on the connected Shopify checkout.', clearCart: 'Clear cart', checkoutEmpty: 'Your cart is empty.', checkoutEmptyBody: 'Add a piece from the collection before continuing to checkout.', quickAdd: 'Quick add', cookieSettings: 'Cookie Settings', privacyTitle: 'Your privacy, your choice', privacyBody: 'Essential storage keeps your cart and language preference. With permission, analytics helps ZENORA understand visits and conversions.', essentialOnly: 'Essential only', acceptAnalytics: 'Accept analytics', submitting: 'Submitting…', newsletterTest: 'Test mode: connect your email provider to deliver {code}.', welcome: 'Welcome to ZENORA. Your code is {code}.', subscribeError: 'We could not complete the subscription. Please try again.'
  },
  'zh-CN': {
    cart: '购物车', cartTitle: '你的购物车', emptyTitle: '购物车是空的', emptyBody: '浏览 ZENORA 系列并添加商品后继续。', shop: '浏览商品系列', away: '还差 {amount} 即可免运费', freeShipping: '已享免运费', subtotal: '商品小计', shippingTaxes: '运费、关税及税费将在结账时计算。', checkout: '安全结账', continueShopping: '继续购物', remove: '删除', quantity: '数量', added: '{product} 已加入购物车', secureCheckout: '安全结账', reviewOrder: '核对你的订单。', orderSummary: '订单摘要', estimatedShipping: '预计运费', free: '免费', estimatedTotal: '预计总计', paymentRequired: '需要连接支付系统', testMode: '测试模式', testModeBody: '购物车已经可用。请在 store-config.js 中填写 Shopify 域名和商品变体 ID，以启用真实付款。', continuePayment: '继续安全付款', paymentHandoff: '你将在已连接的 Shopify 结账页面完成付款。', clearCart: '清空购物车', checkoutEmpty: '购物车是空的。', checkoutEmptyBody: '请先从商品系列中添加商品再继续结账。', quickAdd: '快速加入', cookieSettings: 'Cookie 设置', privacyTitle: '你的隐私，由你选择', privacyBody: '必要存储用于保存购物车和语言偏好。经你同意后，分析工具将帮助 ZENORA 了解访问和转化情况。', essentialOnly: '仅必要 Cookie', acceptAnalytics: '接受分析 Cookie', submitting: '正在提交…', newsletterTest: '测试模式：连接邮件服务后可发送优惠码 {code}。', welcome: '欢迎加入 ZENORA。你的优惠码是 {code}。', subscribeError: '订阅未能完成，请稍后重试。'
  },
  fr: {
    cart: 'Panier', cartTitle: 'Votre panier', emptyTitle: 'Votre panier est vide', emptyBody: 'Découvrez la sélection ZENORA et ajoutez un article.', shop: 'Voir la collection', away: 'Plus que {amount} pour la livraison offerte', freeShipping: 'Livraison offerte débloquée', subtotal: 'Sous-total', shippingTaxes: 'Livraison, droits et taxes calculés au paiement.', checkout: 'Paiement sécurisé', continueShopping: 'Continuer mes achats', remove: 'Supprimer', quantity: 'Quantité', added: '{product} ajouté au panier', secureCheckout: 'Paiement sécurisé', reviewOrder: 'Vérifiez votre commande.', orderSummary: 'Résumé de la commande', estimatedShipping: 'Livraison estimée', free: 'Offerte', estimatedTotal: 'Total estimé', paymentRequired: 'Connexion au paiement requise', testMode: 'Mode test', testModeBody: 'Le panier fonctionne. Ajoutez le domaine Shopify et les identifiants de variantes dans store-config.js.', continuePayment: 'Continuer vers le paiement', paymentHandoff: 'Le paiement sera finalisé sur Shopify.', clearCart: 'Vider le panier', checkoutEmpty: 'Votre panier est vide.', checkoutEmptyBody: 'Ajoutez un article avant de passer au paiement.', quickAdd: 'Ajout rapide', cookieSettings: 'Paramètres des cookies', privacyTitle: 'Votre vie privée, votre choix', privacyBody: 'Le stockage essentiel conserve votre panier et votre langue. Avec votre accord, les statistiques aident ZENORA à comprendre les conversions.', essentialOnly: 'Essentiels uniquement', acceptAnalytics: 'Accepter les statistiques', submitting: 'Envoi…', newsletterTest: 'Mode test : connectez votre service e-mail pour envoyer {code}.', welcome: 'Bienvenue chez ZENORA. Votre code est {code}.', subscribeError: 'Impossible de finaliser l’inscription.'
  },
  de: {
    cart: 'Warenkorb', cartTitle: 'Dein Warenkorb', emptyTitle: 'Dein Warenkorb ist leer', emptyBody: 'Entdecke die ZENORA Auswahl und füge einen Artikel hinzu.', shop: 'Kollektion ansehen', away: 'Noch {amount} bis zum kostenlosen Versand', freeShipping: 'Kostenloser Versand erreicht', subtotal: 'Zwischensumme', shippingTaxes: 'Versand, Zölle und Steuern werden beim Checkout berechnet.', checkout: 'Sicher zur Kasse', continueShopping: 'Weiter einkaufen', remove: 'Entfernen', quantity: 'Menge', added: '{product} wurde hinzugefügt', secureCheckout: 'Sicherer Checkout', reviewOrder: 'Bestellung prüfen.', orderSummary: 'Bestellübersicht', estimatedShipping: 'Geschätzter Versand', free: 'Kostenlos', estimatedTotal: 'Geschätzte Gesamtsumme', paymentRequired: 'Zahlungsanbindung erforderlich', testMode: 'Testmodus', testModeBody: 'Der Warenkorb funktioniert. Shopify-Domain und Varianten-IDs in store-config.js ergänzen.', continuePayment: 'Weiter zur sicheren Zahlung', paymentHandoff: 'Die Zahlung wird im verbundenen Shopify-Checkout abgeschlossen.', clearCart: 'Warenkorb leeren', checkoutEmpty: 'Dein Warenkorb ist leer.', checkoutEmptyBody: 'Füge vor dem Checkout einen Artikel hinzu.', quickAdd: 'Schnell hinzufügen', cookieSettings: 'Cookie-Einstellungen', privacyTitle: 'Deine Privatsphäre, deine Wahl', privacyBody: 'Notwendiger Speicher bewahrt Warenkorb und Sprache. Mit Zustimmung helfen Analysen ZENORA bei der Conversion-Auswertung.', essentialOnly: 'Nur notwendig', acceptAnalytics: 'Analysen akzeptieren', submitting: 'Wird gesendet…', newsletterTest: 'Testmodus: E-Mail-Dienst verbinden, um {code} zu senden.', welcome: 'Willkommen bei ZENORA. Dein Code lautet {code}.', subscribeError: 'Die Anmeldung konnte nicht abgeschlossen werden.'
  },
  es: {
    cart: 'Carrito', cartTitle: 'Tu carrito', emptyTitle: 'Tu carrito está vacío', emptyBody: 'Explora la colección ZENORA y añade una prenda.', shop: 'Ver la colección', away: 'Faltan {amount} para el envío gratuito', freeShipping: 'Envío gratuito desbloqueado', subtotal: 'Subtotal', shippingTaxes: 'Envío, aranceles e impuestos se calculan al pagar.', checkout: 'Pago seguro', continueShopping: 'Seguir comprando', remove: 'Eliminar', quantity: 'Cantidad', added: '{product} añadido al carrito', secureCheckout: 'Pago seguro', reviewOrder: 'Revisa tu pedido.', orderSummary: 'Resumen del pedido', estimatedShipping: 'Envío estimado', free: 'Gratis', estimatedTotal: 'Total estimado', paymentRequired: 'Se requiere conectar el pago', testMode: 'Modo de prueba', testModeBody: 'El carrito funciona. Añade el dominio de Shopify y los ID de variantes en store-config.js.', continuePayment: 'Continuar al pago seguro', paymentHandoff: 'Completarás el pago en Shopify.', clearCart: 'Vaciar carrito', checkoutEmpty: 'Tu carrito está vacío.', checkoutEmptyBody: 'Añade una prenda antes de continuar al pago.', quickAdd: 'Añadir rápido', cookieSettings: 'Configuración de cookies', privacyTitle: 'Tu privacidad, tu elección', privacyBody: 'El almacenamiento esencial conserva carrito e idioma. Con permiso, las estadísticas ayudan a ZENORA a entender las conversiones.', essentialOnly: 'Solo esenciales', acceptAnalytics: 'Aceptar estadísticas', submitting: 'Enviando…', newsletterTest: 'Modo de prueba: conecta el servicio de correo para enviar {code}.', welcome: 'Bienvenido a ZENORA. Tu código es {code}.', subscribeError: 'No se pudo completar la suscripción.'
  },
  ja: {
    cart: 'カート', cartTitle: 'ショッピングカート', emptyTitle: 'カートは空です', emptyBody: 'ZENORA コレクションから商品を追加してください。', shop: 'コレクションを見る', away: '送料無料まであと {amount}', freeShipping: '送料無料になりました', subtotal: '小計', shippingTaxes: '送料、関税、税金はチェックアウト時に計算されます。', checkout: '安全にチェックアウト', continueShopping: '買い物を続ける', remove: '削除', quantity: '数量', added: '{product} をカートに追加しました', secureCheckout: '安全なチェックアウト', reviewOrder: '注文内容を確認してください。', orderSummary: '注文概要', estimatedShipping: '配送料の見積り', free: '無料', estimatedTotal: '合計見積り', paymentRequired: '決済接続が必要です', testMode: 'テストモード', testModeBody: 'カートは動作しています。store-config.js に Shopify ドメインとバリアント ID を追加してください。', continuePayment: '安全な支払いへ進む', paymentHandoff: '接続済みの Shopify チェックアウトで支払いを完了します。', clearCart: 'カートを空にする', checkoutEmpty: 'カートは空です。', checkoutEmptyBody: 'チェックアウト前に商品を追加してください。', quickAdd: 'クイック追加', cookieSettings: 'Cookie 設定', privacyTitle: 'プライバシー設定', privacyBody: '必須ストレージはカートと言語設定を保存します。同意後、分析により ZENORA の訪問とコンバージョンを改善します。', essentialOnly: '必須のみ', acceptAnalytics: '分析を許可', submitting: '送信中…', newsletterTest: 'テストモード：メールサービス接続後に {code} を送信できます。', welcome: 'ZENORA へようこそ。コードは {code} です。', subscribeError: '登録を完了できませんでした。'
  }
};

const zenoraStore = {
  cart: readJson(ZENORA_CART_KEY, []),
  consent: readJson(ZENORA_CONSENT_KEY, null),
  drawer: null
};

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The storefront remains usable without persistent storage.
  }
}

function slugify(value = '') {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function money(value) {
  return new Intl.NumberFormat(zenoraConfig.locale, {
    style: 'currency',
    currency: zenoraConfig.currency
  }).format(value);
}

function storeCopy(key, variables = {}) {
  const language = localStorage.getItem('zenora-language') || 'en';
  const dictionary = ZENORA_STORE_COPY[language] || ZENORA_STORE_COPY.en;
  return (dictionary[key] || ZENORA_STORE_COPY.en[key] || key).replace(/\{(\w+)\}/g, (_, name) => variables[name] ?? '');
}

function cartCount() {
  return zenoraStore.cart.reduce((total, item) => total + item.quantity, 0);
}

function cartSubtotal() {
  return zenoraStore.cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function itemKey(item) {
  return `${item.id}:${item.color || ''}:${item.size || ''}`;
}

function saveCart() {
  writeJson(ZENORA_CART_KEY, zenoraStore.cart);
  updateCartCount();
  renderCartDrawer();
  renderCheckout();
}

function addToCart(product, options = {}) {
  const nextItem = {
    id: product.id,
    title: product.title,
    price: product.price,
    imageClass: product.imageClass || 'image-one',
    color: options.color || product.defaultColor || '',
    size: options.size || product.defaultSize || '',
    quantity: Math.max(1, Number(options.quantity) || 1)
  };
  const key = itemKey(nextItem);
  const existing = zenoraStore.cart.find((item) => itemKey(item) === key);
  if (existing) existing.quantity += nextItem.quantity;
  else zenoraStore.cart.push(nextItem);
  saveCart();
  trackEvent('add_to_cart', {
    currency: zenoraConfig.currency,
    value: nextItem.price * nextItem.quantity,
    items: [analyticsItem(nextItem)]
  });
  showToast(storeCopy('added', { product: product.title }));
  openCartDrawer();
}

function updateCartLine(key, quantity) {
  const item = zenoraStore.cart.find((entry) => itemKey(entry) === key);
  if (!item) return;
  if (quantity <= 0) zenoraStore.cart = zenoraStore.cart.filter((entry) => itemKey(entry) !== key);
  else item.quantity = Math.min(99, quantity);
  saveCart();
}

function analyticsItem(item) {
  return {
    item_id: item.id,
    item_name: item.title,
    item_variant: [item.color, item.size].filter(Boolean).join(' / '),
    price: item.price,
    quantity: item.quantity || 1
  };
}

function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const fields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const attribution = readJson(ZENORA_ATTRIBUTION_KEY, {});
  let changed = false;
  fields.forEach((field) => {
    if (params.get(field)) {
      attribution[field] = params.get(field);
      changed = true;
    }
  });
  if (!attribution.first_landing_page) {
    attribution.first_landing_page = window.location.href;
    attribution.referrer = document.referrer || 'direct';
    changed = true;
  }
  if (changed) writeJson(ZENORA_ATTRIBUTION_KEY, attribution);
  return attribution;
}

function trackEvent(name, parameters = {}) {
  const payload = {
    event: name,
    ...parameters,
    attribution: readJson(ZENORA_ATTRIBUTION_KEY, {})
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent('zenora:analytics', { detail: payload }));

  if (!zenoraStore.consent?.analytics) return;
  const eventLog = readJson(ZENORA_EVENT_LOG_KEY, []);
  eventLog.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    parameters,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
    attribution: payload.attribution
  });
  writeJson(ZENORA_EVENT_LOG_KEY, eventLog.slice(0, 500));

  if (zenoraConfig.analytics.collectorEndpoint) {
    fetch(zenoraConfig.analytics.collectorEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(() => {});
  }
  if (typeof window.gtag === 'function') window.gtag('event', name, parameters);
  if (typeof window.fbq === 'function') window.fbq('trackCustom', name, parameters);
  if (window.ttq?.track) window.ttq.track(name, parameters);
}

function loadAnalytics() {
  if (!zenoraStore.consent?.analytics || document.documentElement.dataset.analyticsLoaded) return;
  document.documentElement.dataset.analyticsLoaded = 'true';
  const { ga4MeasurementId, metaPixelId, tiktokPixelId } = zenoraConfig.analytics;

  if (ga4MeasurementId) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4MeasurementId)}`;
    document.head.append(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ga4MeasurementId, { anonymize_ip: true });
  }

  if (metaPixelId) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.append(script);
    window.fbq = window.fbq || function fbq() { (window.fbq.queue = window.fbq.queue || []).push(arguments); };
    window.fbq('init', metaPixelId);
    window.fbq('track', 'PageView');
  }

  if (tiktokPixelId) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=' + encodeURIComponent(tiktokPixelId);
    document.head.append(script);
    window.ttq = window.ttq || { track() {} };
  }
}

function createCartDrawer() {
  if (document.querySelector('[data-store-cart]')) return;
  const drawer = document.createElement('div');
  drawer.className = 'store-cart';
  drawer.dataset.storeCart = '';
  drawer.dataset.noTranslate = 'true';
  drawer.hidden = true;
  drawer.innerHTML = `
    <button class="store-cart__backdrop" type="button" data-cart-close aria-label="Close cart"></button>
    <aside class="store-cart__panel" role="dialog" aria-modal="true" aria-labelledby="StoreCartTitle" tabindex="-1">
      <header class="store-cart__header">
        <div>
          <p class="eyebrow">ZENORA</p>
          <h2 id="StoreCartTitle">${storeCopy('cartTitle')}</h2>
        </div>
        <button class="icon-button" type="button" data-cart-close aria-label="Close cart">×</button>
      </header>
      <div class="store-cart__body" data-cart-body></div>
    </aside>`;
  document.body.append(drawer);
  zenoraStore.drawer = drawer;
  drawer.querySelectorAll('[data-cart-close]').forEach((button) => button.addEventListener('click', closeCartDrawer));
  drawer.addEventListener('click', handleCartClick);
  drawer.addEventListener('change', handleCartChange);
}

function renderCartDrawer() {
  const body = zenoraStore.drawer?.querySelector('[data-cart-body]');
  if (!body) return;
  if (!zenoraStore.cart.length) {
    body.innerHTML = `
      <div class="empty-cart">
        <span class="empty-cart__mark">0</span>
        <h3>${storeCopy('emptyTitle')}</h3>
        <p>${storeCopy('emptyBody')}</p>
        <a class="button primary" href="./collection.html">${storeCopy('shop')}</a>
      </div>`;
    return;
  }

  const subtotal = cartSubtotal();
  const remaining = Math.max(0, zenoraConfig.freeShippingThreshold - subtotal);
  body.innerHTML = `
    <div class="shipping-progress">
      <p>${remaining > 0 ? storeCopy('away', { amount: money(remaining) }) : storeCopy('freeShipping')}</p>
      <span><i style="width:${Math.min(100, subtotal / zenoraConfig.freeShippingThreshold * 100)}%"></i></span>
    </div>
    <div class="store-cart__items">
      ${zenoraStore.cart.map((item) => `
        <article class="store-cart__item" data-cart-key="${itemKey(item)}">
          <div class="store-cart__image ${item.imageClass}" aria-hidden="true"></div>
          <div class="store-cart__info">
            <div class="store-cart__title-row">
              <div>
                <strong>${item.title}</strong>
                <span>${[item.color, item.size].filter(Boolean).join(' / ')}</span>
              </div>
              <strong>${money(item.price * item.quantity)}</strong>
            </div>
            <div class="store-cart__controls">
              <button type="button" data-cart-delta="-1" aria-label="Decrease quantity">−</button>
              <input type="number" min="1" max="99" value="${item.quantity}" data-cart-quantity aria-label="${storeCopy('quantity')}">
              <button type="button" data-cart-delta="1" aria-label="Increase quantity">+</button>
              <button type="button" class="text-button" data-cart-remove>${storeCopy('remove')}</button>
            </div>
          </div>
        </article>`).join('')}
    </div>
    <footer class="store-cart__footer">
      <div class="order-line"><span>${storeCopy('subtotal')}</span><strong>${money(subtotal)}</strong></div>
      <p>${storeCopy('shippingTaxes')}</p>
      <a class="button primary full-width" href="./checkout.html" data-checkout-link>${storeCopy('checkout')}</a>
      <button type="button" class="text-button full-width" data-cart-close>${storeCopy('continueShopping')}</button>
    </footer>`;
  requestCurrentTranslation();
}

function handleCartClick(event) {
  const wrapper = event.target.closest('[data-cart-key]');
  if (!wrapper) {
    if (event.target.closest('[data-cart-close]')) closeCartDrawer();
    return;
  }
  const key = wrapper.dataset.cartKey;
  const item = zenoraStore.cart.find((entry) => itemKey(entry) === key);
  if (!item) return;
  const delta = event.target.closest('[data-cart-delta]');
  if (delta) updateCartLine(key, item.quantity + Number(delta.dataset.cartDelta));
  if (event.target.closest('[data-cart-remove]')) {
    trackEvent('remove_from_cart', { currency: zenoraConfig.currency, value: item.price * item.quantity, items: [analyticsItem(item)] });
    updateCartLine(key, 0);
  }
}

function handleCartChange(event) {
  const input = event.target.closest('[data-cart-quantity]');
  const wrapper = event.target.closest('[data-cart-key]');
  if (!input || !wrapper) return;
  updateCartLine(wrapper.dataset.cartKey, Math.max(1, Number(input.value) || 1));
}

function openCartDrawer() {
  if (!zenoraStore.drawer) return;
  zenoraStore.drawer.hidden = false;
  document.body.classList.add('cart-is-open');
  zenoraStore.drawer.querySelector('.store-cart__panel')?.focus();
}

function closeCartDrawer() {
  if (!zenoraStore.drawer) return;
  zenoraStore.drawer.hidden = true;
  document.body.classList.remove('cart-is-open');
}

function updateCartCount() {
  document.querySelectorAll('[data-store-cart-link]').forEach((link) => {
    link.textContent = `${storeCopy('cart')} (${cartCount()})`;
  });
}

function bindHeaderCart() {
  document.querySelectorAll('.header-actions a').forEach((link) => {
    if (!/^Cart\s*\(/i.test(link.textContent.trim())) return;
    link.dataset.storeCartLink = '';
    link.dataset.noTranslate = 'true';
    link.href = './checkout.html';
    link.addEventListener('click', (event) => {
      event.preventDefault();
      openCartDrawer();
    });
  });
  updateCartCount();
}

function bindProductPage() {
  const purchase = document.querySelector('.purchase-box');
  const title = document.querySelector('.product-title')?.textContent.trim();
  if (!purchase || !title) return;
  const product = zenoraConfig.products[slugify(title)] || zenoraConfig.products['the-elara-linen-midi-dress'];
  let quantity = 1;
  let size = document.querySelector('.size-grid button.active')?.textContent.trim() || product.defaultSize;
  let color = document.querySelector('.option-head span:last-child')?.textContent.trim() || product.defaultColor;
  const quantityValue = purchase.querySelector('.qty-control span');

  document.querySelectorAll('.size-grid button').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('.size-grid button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    size = button.textContent.trim();
  }));
  document.querySelectorAll('.swatch-row .swatch').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('.swatch-row .swatch').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    color = button.getAttribute('aria-label') || product.defaultColor;
    const label = document.querySelector('.option-head span:last-child');
    if (label) label.textContent = color;
  }));
  purchase.querySelectorAll('.qty-control button').forEach((button, index) => button.addEventListener('click', () => {
    quantity = Math.max(1, Math.min(10, quantity + (index === 0 ? -1 : 1)));
    if (quantityValue) quantityValue.textContent = quantity;
  }));

  const actions = purchase.querySelectorAll('.button');
  if (actions[0]) {
    actions[0].href = '#';
    actions[0].addEventListener('click', (event) => {
      event.preventDefault();
      addToCart(product, { quantity, size, color });
    });
  }
  if (actions[1]) {
    actions[1].href = './checkout.html';
    actions[1].addEventListener('click', (event) => {
      event.preventDefault();
      addToCart(product, { quantity, size, color });
      window.location.href = './checkout.html';
    });
  }
  trackEvent('view_item', { currency: zenoraConfig.currency, value: product.price, items: [analyticsItem({ ...product, quantity: 1 })] });
}

function bindProductCards() {
  document.querySelectorAll('.product-card').forEach((card) => {
    const titleNode = card.querySelector('.product-name');
    if (!titleNode || card.querySelector('[data-quick-add]')) return;
    const title = titleNode.textContent.trim();
    const product = zenoraConfig.products[slugify(title)];
    if (!product) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quick-add';
    button.dataset.quickAdd = product.id;
    button.dataset.noTranslate = 'true';
    button.textContent = storeCopy('quickAdd');
    button.addEventListener('click', () => addToCart(product));
    card.querySelector('.product-meta')?.append(button);
  });
}

function buildShopifyCheckoutUrl() {
  const domain = zenoraConfig.checkout.shopifyDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  if (zenoraConfig.checkout.mode !== 'shopify' || !domain) return '';
  const variants = zenoraStore.cart.map((item) => {
    const product = zenoraConfig.products[item.id];
    const variantKey = [item.color, item.size].filter(Boolean).join('|');
    const variantId = product?.shopifyVariants?.[variantKey];
    return variantId ? `${variantId}:${item.quantity}` : '';
  }).filter(Boolean);
  if (variants.length !== zenoraStore.cart.length) return '';
  return `https://${domain}/cart/${variants.join(',')}`;
}

function renderCheckout() {
  const root = document.querySelector('[data-checkout-root]');
  if (!root) return;
  root.dataset.noTranslate = 'true';
  const subtotal = cartSubtotal();
  const shipping = subtotal >= zenoraConfig.freeShippingThreshold ? 0 : zenoraConfig.shippingFlatRate;
  const checkoutUrl = buildShopifyCheckoutUrl();
  root.innerHTML = zenoraStore.cart.length ? `
    <div class="checkout-layout">
      <section class="checkout-card">
        <p class="eyebrow">${storeCopy('secureCheckout')}</p>
        <h1>${storeCopy('reviewOrder')}</h1>
        <div class="checkout-items">
          ${zenoraStore.cart.map((item) => `
            <article class="checkout-item">
              <div class="checkout-item__image ${item.imageClass}"></div>
              <div><strong>${item.title}</strong><span>${[item.color, item.size].filter(Boolean).join(' / ')} · Qty ${item.quantity}</span></div>
              <strong>${money(item.price * item.quantity)}</strong>
            </article>`).join('')}
        </div>
        <a class="text-link" href="./collection.html">${storeCopy('continueShopping')}</a>
      </section>
      <aside class="checkout-card checkout-summary">
        <h2>${storeCopy('orderSummary')}</h2>
        <div class="order-line"><span>${storeCopy('subtotal')}</span><strong>${money(subtotal)}</strong></div>
        <div class="order-line"><span>${storeCopy('estimatedShipping')}</span><strong>${shipping ? money(shipping) : storeCopy('free')}</strong></div>
        <div class="order-line order-line--total"><span>${storeCopy('estimatedTotal')}</span><strong>${money(subtotal + shipping)}</strong></div>
        ${checkoutUrl ? `
          <a class="button primary full-width" href="${checkoutUrl}" data-live-checkout>${storeCopy('continuePayment')}</a>
          <p class="checkout-note">${storeCopy('paymentHandoff')}</p>` : `
          <button class="button primary full-width" type="button" disabled>${storeCopy('paymentRequired')}</button>
          <div class="test-mode-notice"><strong>${storeCopy('testMode')}</strong><p>${storeCopy('testModeBody')}</p></div>`}
        <button class="text-button full-width" type="button" data-clear-cart>${storeCopy('clearCart')}</button>
      </aside>
    </div>` : `
      <div class="checkout-empty">
        <p class="eyebrow">ZENORA checkout</p>
        <h1>${storeCopy('checkoutEmpty')}</h1>
        <p>${storeCopy('checkoutEmptyBody')}</p>
        <a class="button primary" href="./collection.html">${storeCopy('shop')}</a>
      </div>`;

  root.querySelector('[data-live-checkout]')?.addEventListener('click', () => {
    trackEvent('begin_checkout', {
      currency: zenoraConfig.currency,
      value: subtotal + shipping,
      items: zenoraStore.cart.map(analyticsItem)
    });
  });
  root.querySelector('[data-clear-cart]')?.addEventListener('click', () => {
    zenoraStore.cart = [];
    saveCart();
  });
  requestCurrentTranslation();
}

function bindNewsletter() {
  document.querySelectorAll('.signup-form').forEach((form) => {
    if (form.dataset.storeBound) return;
    form.dataset.storeBound = 'true';
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');
    const status = document.createElement('p');
    status.className = 'form-status';
    status.setAttribute('role', 'status');
    form.append(status);
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!input?.value || !input.checkValidity()) {
        input?.reportValidity();
        return;
      }
      button.disabled = true;
      status.textContent = storeCopy('submitting');
      try {
        if (!zenoraConfig.newsletter.endpoint) {
          status.textContent = storeCopy('newsletterTest', { code: zenoraConfig.newsletter.discountCode });
          trackEvent('newsletter_test_submit', { location: window.location.pathname });
          return;
        }
        const response = await fetch(zenoraConfig.newsletter.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email: input.value, source: 'zenora_storefront', attribution: captureAttribution() })
        });
        if (!response.ok) throw new Error('Subscription failed');
        status.textContent = storeCopy('welcome', { code: zenoraConfig.newsletter.discountCode });
        input.value = '';
        trackEvent('sign_up', { method: 'email' });
      } catch {
        status.textContent = storeCopy('subscribeError');
      } finally {
        button.disabled = false;
      }
    });
  });
}

function createCookieBanner({ force = false } = {}) {
  document.querySelector('.consent-banner')?.remove();
  if (zenoraStore.consent && !force) {
    loadAnalytics();
    return;
  }
  const banner = document.createElement('aside');
  banner.className = 'consent-banner';
  banner.dataset.noTranslate = 'true';
  banner.innerHTML = `
    <div>
      <strong>${storeCopy('privacyTitle')}</strong>
      <p>${storeCopy('privacyBody')}</p>
    </div>
    <div class="consent-banner__actions">
      <button type="button" class="button secondary" data-consent="essential">${storeCopy('essentialOnly')}</button>
      <button type="button" class="button primary" data-consent="all">${storeCopy('acceptAnalytics')}</button>
    </div>`;
  document.body.append(banner);
  banner.addEventListener('click', (event) => {
    const choice = event.target.closest('[data-consent]')?.dataset.consent;
    if (!choice) return;
    zenoraStore.consent = { essential: true, analytics: choice === 'all', date: new Date().toISOString() };
    writeJson(ZENORA_CONSENT_KEY, zenoraStore.consent);
    banner.remove();
    loadAnalytics();
    trackEvent('consent_update', { analytics: zenoraStore.consent.analytics });
  });
}

function addCookieSettingsLinks() {
  document.querySelectorAll('.footer-links').forEach((footer) => {
    if (footer.querySelector('[data-cookie-settings]')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'footer-cookie-button';
    button.dataset.cookieSettings = '';
    button.dataset.noTranslate = 'true';
    button.textContent = storeCopy('cookieSettings');
    button.addEventListener('click', () => createCookieBanner({ force: true }));
    footer.append(button);
  });
}

function requestCurrentTranslation() {
  const currentLanguage = document.documentElement.lang;
  if (!currentLanguage || currentLanguage === 'en' || typeof window.zenoraTranslateCurrentPage !== 'function') return;
  window.requestAnimationFrame(() => window.zenoraTranslateCurrentPage());
}

function showToast(message) {
  let toast = document.querySelector('.store-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'store-toast';
    toast.setAttribute('role', 'status');
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toast._timer);
  toast._timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

function initStore() {
  captureAttribution();
  createCartDrawer();
  bindHeaderCart();
  bindProductPage();
  bindProductCards();
  bindNewsletter();
  addCookieSettingsLinks();
  createCookieBanner();
  renderCartDrawer();
  renderCheckout();
  trackEvent('page_view', { page_path: window.location.pathname, page_title: document.title });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeCartDrawer();
  });
  document.addEventListener('change', (event) => {
    if (event.target.id !== 'zenora-language') return;
    window.setTimeout(() => {
      updateCartCount();
      renderCartDrawer();
      renderCheckout();
      document.querySelectorAll('[data-quick-add]').forEach((button) => { button.textContent = storeCopy('quickAdd'); });
      document.querySelectorAll('[data-cookie-settings]').forEach((button) => { button.textContent = storeCopy('cookieSettings'); });
      if (document.querySelector('.consent-banner')) createCookieBanner({ force: true });
    }, 0);
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initStore, { once: true });
else initStore();

window.zenoraStore = { addToCart, openCartDrawer, trackEvent };
