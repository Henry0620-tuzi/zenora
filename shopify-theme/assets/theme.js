document.documentElement.classList.add('js');

const themeRoot = window.Shopify?.routes?.root || window.themeRoutes?.root || '/';
const focusableSelector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
let lastFocusedElement = null;
const cartQuantityTimers = new Map();

function moneyFormat(cents, format) {
  if (typeof cents === 'string') cents = cents.replace('.', '');
  const value = Number(cents || 0) / 100;
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const placeholder = format && format.match(placeholderRegex) ? format.match(placeholderRegex)[1] : 'amount';
  const withDelimiters = (amount, precision = 2, thousands = ',', decimal = '.') => {
    if (Number.isNaN(amount) || amount == null) return '0';
    const number = amount.toFixed(precision);
    const parts = number.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
    return parts.join(decimal);
  };

  switch (placeholder) {
    case 'amount_no_decimals':
      return format.replace(placeholderRegex, withDelimiters(value, 0));
    case 'amount_with_comma_separator':
      return format.replace(placeholderRegex, withDelimiters(value, 2, '.', ','));
    case 'amount_no_decimals_with_comma_separator':
      return format.replace(placeholderRegex, withDelimiters(value, 0, '.', ','));
    default:
      return format.replace(placeholderRegex, withDelimiters(value, 2));
  }
}

function initQuantityButtons(scope = document) {
  scope.querySelectorAll('[data-quantity-wrapper]').forEach((wrapper) => {
    const input = wrapper.querySelector('input[name="quantity"]');
    if (!input || wrapper.dataset.bound === 'true') return;
    wrapper.dataset.bound = 'true';

    wrapper.querySelectorAll('[data-quantity-button]').forEach((button) => {
      button.addEventListener('click', () => {
        const next = Number(input.value || 1) + Number(button.dataset.quantityButton);
        input.value = Math.max(1, next);
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  });
}

function initFacets(scope = document) {
  scope.querySelectorAll('[data-collection-section]').forEach((section) => {
    if (section.dataset.bound === 'true') return;
    section.dataset.bound = 'true';

    const facetsForm = section.querySelector('[data-facets-form]');
    const sortForm = section.querySelector('[data-sort-form]');

    if (facetsForm) {
      facetsForm.addEventListener('change', (event) => {
        const target = event.target;
        if (!target.matches('input, select') || target.type === 'number') return;
        updateCollectionSection(section, buildSearchParams(facetsForm));
      });

      facetsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        updateCollectionSection(section, buildSearchParams(facetsForm));
      });
    }

    if (sortForm) {
      sortForm.addEventListener('change', (event) => {
        if (!event.target.matches('select')) return;
        updateCollectionSection(section, buildSearchParams(sortForm));
      });
    }

    section.addEventListener('click', (event) => {
      const link = event.target.closest('[data-facet-link]');
      if (!link) return;
      event.preventDefault();
      updateCollectionSection(section, link.getAttribute('href') || '');
    });
  });
}

function buildSearchParams(form) {
  const params = new URLSearchParams();
  const formData = new FormData(form);
  for (const [key, value] of formData.entries()) {
    const normalized = String(value).trim();
    if (normalized === '') continue;
    params.append(key, normalized);
  }
  return params.toString();
}

function setCollectionStatus(section, message = '') {
  const status = section.querySelector('[data-collection-status]');
  if (!status) return;
  status.textContent = message;
}

async function updateCollectionSection(section, queryOrUrl = '') {
  if (!section) return;

  if (section._abortController) {
    section._abortController.abort();
  }

  const controller = new AbortController();
  section._abortController = controller;

  const sectionId = section.dataset.sectionId;
  const baseUrl = section.dataset.sectionUrl || window.location.pathname;
  const requestUrl = new URL(baseUrl, window.location.origin);

  if (queryOrUrl.startsWith('http') || queryOrUrl.startsWith('/')) {
    const nextUrl = new URL(queryOrUrl, window.location.origin);
    requestUrl.search = nextUrl.search;
  } else {
    requestUrl.search = queryOrUrl ? `?${queryOrUrl}` : '';
  }

  const historyUrl = `${requestUrl.pathname}${requestUrl.search}`;
  requestUrl.searchParams.set('section_id', sectionId);

  section.setAttribute('aria-busy', 'true');
  setCollectionStatus(section, window.themeCollectionStrings?.loading || 'Updating collection...');

  try {
    const response = await fetch(requestUrl.toString(), {
      signal: controller.signal,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    if (!response.ok) {
      throw new Error(`Collection request failed with ${response.status}`);
    }

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const replacement = doc.querySelector('[data-collection-section]');

    if (!replacement) {
      throw new Error('Collection section render failed');
    }

    section.replaceWith(replacement);
    window.history.replaceState({}, '', historyUrl);
    initFacets(document);

    const countText = replacement.querySelector('[data-collection-count]')?.textContent?.trim() || '';
    setCollectionStatus(replacement, countText);
    const resultsHead = replacement.querySelector('[data-collection-results-head]');
    resultsHead?.focus();
  } catch (error) {
    if (error.name === 'AbortError') return;
    setCollectionStatus(section, error.message || 'Collection update failed');
  } finally {
    section.removeAttribute('aria-busy');
    if (section._abortController === controller) {
      delete section._abortController;
    }
  }
}

function renderCartDrawer(cart) {
  const drawer = document.querySelector('[data-cart-drawer]');
  const body = drawer?.querySelector('[data-cart-drawer-body]');
  if (!drawer || !body) return;

  if (!cart || !cart.items || cart.items.length === 0) {
    body.innerHTML = `
      <div class="cart-drawer__empty">
        <p class="section-copy">${window.themeStrings?.cartEmpty || 'Your cart is currently empty.'}</p>
        <a class="button button--primary" href="${window.themeRoutes?.allProductsCollection || '/collections/all'}">${window.themeStrings?.shop || 'Shop'}</a>
      </div>
    `;
    updateCartCount(0);
    return;
  }

  const itemsMarkup = cart.items.map((item) => {
    const quantityId = `CartDrawerQuantity-${String(item.key).replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const image = item.featured_image
      ? `<div class="cart-drawer-item__media"><img src="${item.featured_image.url}" alt="${item.featured_image.alt || item.product_title}" loading="lazy"></div>`
      : '<div class="cart-drawer-item__media"></div>';

    return `
      <article class="cart-drawer-item">
        ${image}
        <div class="cart-drawer-item__content">
          <p class="product-meta__title"><a href="${item.url}">${item.product_title}</a></p>
          <p class="section-copy">${item.variant_title || ''}</p>
          <div class="results-head">
            <span>${item.quantity} × ${moneyFormat(item.final_price, window.themeMoneyFormat || '${{amount}}')}</span>
            <strong>${moneyFormat(item.final_line_price, window.themeMoneyFormat || '${{amount}}')}</strong>
          </div>
          <div class="cart-drawer-item__controls" data-line-key="${item.key}">
            <button type="button" class="qty-button" data-cart-line-change="-1" aria-label="${window.themeStrings?.cartDecreaseQuantity || 'Decrease quantity'}">-</button>
            <label class="visually-hidden" for="${quantityId}">${window.themeStrings?.cartQuantityLabel || 'Quantity'}</label>
            <input
              id="${quantityId}"
              class="cart-drawer-item__quantity-input"
              data-cart-line-quantity
              type="number"
              inputmode="numeric"
              min="0"
              step="1"
              value="${item.quantity}"
              aria-label="${window.themeStrings?.cartQuantityLabel || 'Quantity'}"
            >
            <button type="button" class="qty-button" data-cart-line-change="1" aria-label="${window.themeStrings?.cartIncreaseQuantity || 'Increase quantity'}">+</button>
            <button type="button" class="muted-link" data-cart-line-remove="true">${window.themeStrings?.cartRemove || 'Remove'}</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  body.innerHTML = `
    <div class="cart-drawer-items">${itemsMarkup}</div>
    <div class="cart-drawer__footer">
      <div class="results-head">
        <span>${window.themeStrings?.cartSubtotal || 'Subtotal'}</span>
        <strong>${moneyFormat(cart.total_price, window.themeMoneyFormat || '${{amount}}')}</strong>
      </div>
      <p class="section-copy">${window.themeStrings?.cartTaxesNotice || ''}</p>
      <div class="cart-drawer__actions">
        <a class="button button--secondary" href="${window.themeRoutes?.cart || '/cart'}">${window.themeStrings?.cartView || 'View cart'}</a>
        <a class="button button--primary" href="/checkout">${window.themeStrings?.cartCheckout || 'Checkout'}</a>
      </div>
    </div>
  `;

  updateCartCount(cart.item_count || 0);
}

function setCartDrawerStatus(message = '', isError = false) {
  const status = document.querySelector('[data-cart-drawer-status]');
  if (!status) return;
  status.textContent = message;
  status.classList.toggle('has-error', Boolean(isError));
}

function setProductStatus(container, message = '', isError = false) {
  const status = container.querySelector('[data-product-status]');
  if (!status) return;
  status.textContent = message;
  status.classList.toggle('has-error', Boolean(isError));
}

function setCartLineLoading(lineWrapper, isLoading) {
  if (!lineWrapper) return;
  lineWrapper.classList.toggle('is-loading', isLoading);
  lineWrapper.querySelectorAll('button, input').forEach((control) => {
    control.disabled = isLoading;
    control.setAttribute('aria-disabled', String(isLoading));
  });
}

async function commitCartLineQuantity(drawer, lineWrapper, key, quantity) {
  const body = drawer.querySelector('[data-cart-drawer-body]');
  setCartLineLoading(lineWrapper, true);
  body?.setAttribute('aria-busy', 'true');
  setCartDrawerStatus(window.themeStrings?.cartUpdating || 'Updating item...');

  try {
    const cart = await changeCartLine(key, quantity);
    renderCartDrawer(cart);
    setCartDrawerStatus('');
  } catch (error) {
    setCartDrawerStatus(window.themeStrings?.cartError || error.message, true);
  } finally {
    body?.removeAttribute('aria-busy');
  }
}

function trapCartDrawerFocus(event) {
  const drawer = document.querySelector('[data-cart-drawer]');
  if (!drawer || drawer.hidden || event.key !== 'Tab') return;

  const panel = drawer.querySelector('[data-cart-drawer] .cart-drawer__panel, .cart-drawer__panel');
  if (!panel) return;

  const focusable = Array.from(panel.querySelectorAll(focusableSelector)).filter((node) => node.offsetParent !== null);
  if (focusable.length === 0) {
    event.preventDefault();
    panel.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function openCartDrawer(trigger = document.activeElement) {
  const drawer = document.querySelector('[data-cart-drawer]');
  if (!drawer) return;
  lastFocusedElement = trigger || document.activeElement;
  drawer.hidden = false;
  document.body.classList.add('cart-drawer-open');
  const panel = drawer.querySelector('.cart-drawer__panel');
  panel?.focus();
}

function closeCartDrawer() {
  const drawer = document.querySelector('[data-cart-drawer]');
  if (!drawer) return;
  drawer.hidden = true;
  document.body.classList.remove('cart-drawer-open');
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

async function fetchCart() {
  const response = await fetch(`${themeRoot}cart.js`);
  if (!response.ok) throw new Error('Cart request failed');
  return response.json();
}

async function addToCart(form) {
  const formData = new FormData(form);
  const response = await fetch(`${themeRoot}cart/add.js`, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.description || 'Add to cart failed');
  }

  return response.json();
}

async function changeCartLine(key, quantity) {
  const response = await fetch(`${themeRoot}cart/change.js`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: key,
      quantity
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.description || 'Cart update failed');
  }

  return response.json();
}

function updateCartCount(count) {
  document.querySelectorAll('[data-cart-count]').forEach((node) => {
    node.textContent = ` (${count})`;
  });
}

function updateVariantView(container, variant, strings) {
  const idInput = container.querySelector('[data-variant-id-input]');
  const addButton = container.querySelector('[data-add-to-cart]');
  const addButtonText = addButton?.querySelector('.button__text');
  const price = container.querySelector('[data-product-price]');
  const comparePrice = container.querySelector('[data-compare-price]');
  const availability = container.querySelector('[data-product-availability]');
  const badge = container.querySelector('[data-product-badge]');
  const optionLabels = container.querySelectorAll('.product-option__label');
  const productData = JSON.parse(container.querySelector('[data-product-json]').textContent);

  if (!variant) {
    if (idInput) idInput.value = '';
    if (addButton) {
      addButton.disabled = true;
      if (addButtonText) {
        addButtonText.textContent = strings.unavailable;
      } else {
        addButton.textContent = strings.unavailable;
      }
    }
    if (availability) availability.textContent = strings.optionUnavailable;
    if (badge) badge.textContent = strings.optionUnavailable;
    setProductStatus(container, strings.optionUnavailable, true);
    if (comparePrice) {
      comparePrice.hidden = true;
      comparePrice.textContent = '';
    }
    return;
  }

  optionLabels.forEach((label) => label.classList.remove('is-disabled'));

  container.querySelectorAll('[data-product-option]').forEach((fieldset, optionIndex) => {
    const currentSelections = getSelectedOptions(container);
    fieldset.querySelectorAll('input').forEach((input) => {
      const testSelections = [...currentSelections];
      testSelections[optionIndex] = input.value;
      const matchingVariants = productData.variants.filter((item) =>
        item.options.every((value, index) => {
          if (!testSelections[index]) return true;
          return value === testSelections[index];
        })
      );
      const exists = matchingVariants.length > 0;
      const hasAvailableMatch = matchingVariants.some((item) => item.available);
      input.disabled = !exists;
      const label = fieldset.querySelector(`label[for="${input.id}"]`);
      if (label) {
        label.classList.toggle('is-disabled', !exists || !hasAvailableMatch);
      }
    });
  });

  if (idInput) idInput.value = variant.id;

  if (price) {
    price.textContent = moneyFormat(variant.price, window.themeMoneyFormat || '${{amount}}');
  }

  if (comparePrice) {
    if (variant.compare_at_price && variant.compare_at_price > variant.price) {
      comparePrice.hidden = false;
      comparePrice.textContent = moneyFormat(variant.compare_at_price, window.themeMoneyFormat || '${{amount}}');
    } else {
      comparePrice.hidden = true;
      comparePrice.textContent = '';
    }
  }

  if (availability) {
    availability.textContent = variant.available ? strings.priceBadge : strings.soldOut;
  }

  if (badge) {
    badge.textContent = variant.available ? strings.priceBadge : strings.soldOut;
  }

  if (addButton) {
    addButton.disabled = !variant.available;
    if (addButtonText) {
      addButtonText.textContent = variant.available ? strings.addToCart : strings.soldOut;
    } else {
      addButton.textContent = variant.available ? strings.addToCart : strings.soldOut;
    }
  }

  if (variant.available) {
    setProductStatus(container, '', false);
  } else {
    setProductStatus(container, strings.soldOut, true);
  }

  const url = new URL(window.location.href);
  url.searchParams.set('variant', variant.id);
  window.history.replaceState({}, '', url.toString());
}

function getSelectedOptions(container) {
  return Array.from(container.querySelectorAll('[data-product-option]')).map((fieldset) => {
    const checked = fieldset.querySelector('input:checked');
    return checked ? checked.value : '';
  });
}

function findMatchingVariant(productData, selected) {
  return productData.variants.find((item) =>
    item.options.every((value, index) => value === selected[index])
  );
}

function initProductForms(scope = document) {
  scope.querySelectorAll('[data-product-root]').forEach((container) => {
    if (container.dataset.bound === 'true') return;
    const jsonNode = container.querySelector('[data-product-json]');
    if (!jsonNode) return;

    container.dataset.bound = 'true';
    const productData = JSON.parse(jsonNode.textContent);
    const strings = {
      addToCart: container.dataset.stringAddToCart || 'Add to cart',
      soldOut: container.dataset.stringSoldOut || 'Sold out',
      unavailable: container.dataset.stringUnavailable || 'Unavailable',
      priceBadge: container.dataset.stringPriceBadge || '',
      optionUnavailable: container.dataset.stringOptionUnavailable || 'Unavailable',
      added: container.dataset.stringAdded || 'Added to cart',
      statusError: container.dataset.stringStatusError || 'Please choose an available option.',
      selectVariant: container.dataset.stringSelectVariant || 'Select a valid variant before adding to cart.'
    };

    const form = container.querySelector('form[action*="/cart/add"]');
    const submitButton = container.querySelector('[data-add-to-cart]');

    if (form && !form.dataset.bound) {
      form.dataset.bound = 'true';
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!submitButton) return;

        const selected = getSelectedOptions(container);
        const variant = findMatchingVariant(productData, selected);
        if (!variant || !variant.available) {
          setProductStatus(container, !variant ? strings.selectVariant : strings.statusError, true);
          updateVariantView(container, variant, strings);
          return;
        }

        submitButton.setAttribute('aria-busy', 'true');
        submitButton.disabled = true;
        setProductStatus(container, '', false);

        try {
          await addToCart(form);
          const cart = await fetchCart();
          renderCartDrawer(cart);
          openCartDrawer(submitButton);
          setProductStatus(container, strings.added, false);
          setCartDrawerStatus(window.themeStrings?.cartAdded || strings.added);
        } catch (error) {
          setProductStatus(container, error.message, true);
          setCartDrawerStatus(error.message, true);
        } finally {
          submitButton.removeAttribute('aria-busy');
          const latestSelected = getSelectedOptions(container);
          const latestVariant = findMatchingVariant(productData, latestSelected);
          updateVariantView(container, latestVariant, strings);
        }
      });
    }

    const update = () => {
      const selected = getSelectedOptions(container);
      const variant = findMatchingVariant(productData, selected);
      updateVariantView(container, variant, strings);
    };

    container.querySelectorAll('[data-product-option] input').forEach((input) => {
      input.addEventListener('change', update);
    });

    update();
  });
}

function initMediaGallery(scope = document) {
  scope.querySelectorAll('[data-media-gallery]').forEach((gallery) => {
    if (gallery.dataset.bound === 'true') return;
    gallery.dataset.bound = 'true';

    const slides = gallery.querySelectorAll('[data-media-slide]');
    const buttons = gallery.querySelectorAll('[data-media-thumb]');

    const activate = (id) => {
      slides.forEach((slide) => {
        const isActive = slide.dataset.mediaSlide === id;
        slide.classList.toggle('is-active', isActive);
        slide.hidden = !isActive;
        slide.setAttribute('aria-hidden', String(!isActive));
      });
      buttons.forEach((button) => {
        const isActive = button.dataset.mediaThumb === id;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-current', String(isActive));
      });
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => activate(button.dataset.mediaThumb));
    });
  });
}

function initCartDrawer(scope = document) {
  const drawer = scope.querySelector('[data-cart-drawer]');
  if (!drawer || drawer.dataset.bound === 'true') return;
  drawer.dataset.bound = 'true';

  scope.querySelectorAll('[data-open-cart-drawer]').forEach((link) => {
    link.addEventListener('click', async (event) => {
      event.preventDefault();
      openCartDrawer(link);
      setCartDrawerStatus('');
      const body = drawer.querySelector('[data-cart-drawer-body]');
      if (body) body.innerHTML = `<p class="section-copy">${window.themeStrings?.cartLoading || 'Updating your cart...'}</p>`;
      try {
        const cart = await fetchCart();
        renderCartDrawer(cart);
      } catch (error) {
        if (body) body.innerHTML = `<p class="section-copy">${error.message}</p>`;
        setCartDrawerStatus(error.message, true);
      }
    });
  });

  scope.querySelectorAll('[data-cart-drawer-close]').forEach((button) => {
    button.addEventListener('click', closeCartDrawer);
  });

  drawer.addEventListener('click', async (event) => {
    const changeButton = event.target.closest('[data-cart-line-change]');
    const removeButton = event.target.closest('[data-cart-line-remove]');
    const lineWrapper = event.target.closest('[data-line-key]');

    if (!lineWrapper) return;
    const key = lineWrapper.dataset.lineKey;
    const body = drawer.querySelector('[data-cart-drawer-body]');

    try {
      if (changeButton) {
        const input = lineWrapper.querySelector('[data-cart-line-quantity]');
        const currentQty = Number(input?.value || '1');
        const nextQty = Math.max(0, currentQty + Number(changeButton.dataset.cartLineChange));
        if (input) input.value = String(nextQty);
        cartQuantityTimers.delete(key);
        await commitCartLineQuantity(drawer, lineWrapper, key, nextQty);
      }

      if (removeButton) {
        cartQuantityTimers.delete(key);
        await commitCartLineQuantity(drawer, lineWrapper, key, 0);
      }
    } catch (error) {
      setCartDrawerStatus(window.themeStrings?.cartError || error.message, true);
    }
  });

  drawer.addEventListener('change', async (event) => {
    const quantityInput = event.target.closest('[data-cart-line-quantity]');
    const lineWrapper = event.target.closest('[data-line-key]');
    if (!quantityInput || !lineWrapper) return;

    const key = lineWrapper.dataset.lineKey;
    const nextQty = Math.max(0, Number(quantityInput.value || 0));
    quantityInput.value = String(nextQty);
    if (cartQuantityTimers.has(key)) {
      window.clearTimeout(cartQuantityTimers.get(key));
      cartQuantityTimers.delete(key);
    }
    await commitCartLineQuantity(drawer, lineWrapper, key, nextQty);
  });

  drawer.addEventListener('input', (event) => {
    const quantityInput = event.target.closest('[data-cart-line-quantity]');
    const lineWrapper = event.target.closest('[data-line-key]');
    if (!quantityInput || !lineWrapper) return;
    quantityInput.value = quantityInput.value.replace(/[^\d]/g, '');
    const key = lineWrapper.dataset.lineKey;
    const nextQty = Math.max(0, Number(quantityInput.value || 0));
    if (cartQuantityTimers.has(key)) {
      window.clearTimeout(cartQuantityTimers.get(key));
    }
    cartQuantityTimers.set(key, window.setTimeout(() => {
      cartQuantityTimers.delete(key);
      commitCartLineQuantity(drawer, lineWrapper, key, nextQty);
    }, 600));
  });

  drawer.addEventListener('keydown', (event) => {
    const quantityInput = event.target.closest('[data-cart-line-quantity]');
    if (!quantityInput) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      quantityInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeCartDrawer();
    trapCartDrawerFocus(event);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initQuantityButtons();
  initFacets();
  initProductForms();
  initMediaGallery();
  initCartDrawer();
});
