const ZENORA_LANGUAGES = {
  en: { label: 'English', short: 'EN', locale: 'en' },
  'zh-CN': { label: '简体中文', short: '中文', locale: 'zh-CN' },
  fr: { label: 'Français', short: 'FR', locale: 'fr' },
  de: { label: 'Deutsch', short: 'DE', locale: 'de' },
  es: { label: 'Español', short: 'ES', locale: 'es' },
  ja: { label: '日本語', short: '日本語', locale: 'ja' }
};

const ZENORA_TRANSLATION_API = 'https://translate.googleapis.com/translate_a/single';
const ZENORA_LANGUAGE_KEY = 'zenora-language';
const ZENORA_CACHE_PREFIX = 'zenora-translation-v3:';
const ZENORA_SEPARATOR = '\n[[ZENORA_TRANSLATION_BREAK]]\n';
const ZENORA_BATCH_LIMIT = 3200;
const ZENORA_PROTECTED_TERMS = {
  ZENORA: '[[[0]]]',
  USD: '[[[1]]]',
  EUR: '[[[2]]]',
  GBP: '[[[3]]]',
  'support@zenora.com': '[[[4]]]'
};

const zenoraTranslationState = {
  nodes: [],
  originalTitle: document.title,
  controller: null,
  requestId: 0,
  textOriginals: new WeakMap(),
  attributeOriginals: new WeakMap()
};

function shouldTranslateText(value, parent) {
  const text = value.trim();
  if (!text || !parent) return false;
  if (parent.closest('[data-no-translate], .language-switcher')) return false;
  if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'SVG'].includes(parent.tagName)) return false;
  if (/^(ZENORA|support@zenora\.com|[\d\s.,%+\-/$€£*×]+|[XSML-]+)$/i.test(text)) return false;
  return /[A-Za-z]/.test(text);
}

function collectTranslatableNodes() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let node;

  while ((node = walker.nextNode())) {
    if (!shouldTranslateText(node.nodeValue, node.parentElement)) continue;
    const original = zenoraTranslationState.textOriginals.get(node) || node.nodeValue;
    zenoraTranslationState.textOriginals.set(node, original);
    nodes.push({
      node,
      original,
      value: original.trim(),
      leading: original.match(/^\s*/)?.[0] || '',
      trailing: original.match(/\s*$/)?.[0] || ''
    });
  }

  document.querySelectorAll('[placeholder], [aria-label], [title]').forEach((element) => {
    ['placeholder', 'aria-label', 'title'].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (!value || !/[A-Za-z]/.test(value) || element.closest('[data-no-translate]')) return;
      const originals = zenoraTranslationState.attributeOriginals.get(element) || {};
      const original = originals[attribute] || value;
      originals[attribute] = original;
      zenoraTranslationState.attributeOriginals.set(element, originals);
      nodes.push({ element, attribute, original, value: original });
    });
  });

  zenoraTranslationState.nodes = nodes;
}

function createLanguageSwitcher() {
  const actions = document.querySelector('.header-actions');
  if (!actions || actions.querySelector('.language-switcher')) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'language-switcher';
  wrapper.dataset.noTranslate = 'true';
  wrapper.innerHTML = `
    <span class="language-switcher__icon" aria-hidden="true">◎</span>
    <label class="sr-only" for="zenora-language">Language</label>
    <select id="zenora-language" class="language-switcher__select" aria-label="Language">
      ${Object.entries(ZENORA_LANGUAGES)
        .map(([code, language]) => `<option value="${code}">${language.label}</option>`)
        .join('')}
    </select>
    <span class="language-switcher__status" role="status" aria-live="polite"></span>
  `;
  actions.append(wrapper);

  wrapper.querySelector('select').addEventListener('change', (event) => {
    setLanguage(event.target.value);
  });
}

function setTranslationStatus(message = '', type = '') {
  const switcher = document.querySelector('.language-switcher');
  const status = switcher?.querySelector('.language-switcher__status');
  if (!switcher || !status) return;
  switcher.dataset.status = type;
  status.textContent = message;
}

function buildBatches(nodes) {
  const batches = [];
  let current = [];
  let size = 0;

  nodes.forEach((item) => {
    const nextSize = item.value.length + ZENORA_SEPARATOR.length;
    if (current.length && size + nextSize > ZENORA_BATCH_LIMIT) {
      batches.push(current);
      current = [];
      size = 0;
    }
    current.push(item);
    size += nextSize;
  });

  if (current.length) batches.push(current);
  return batches;
}

function readCache(language, values) {
  try {
    const key = `${ZENORA_CACHE_PREFIX}${language}:${values.join('|')}`;
    const cached = sessionStorage.getItem(key);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
}

function writeCache(language, values, translations) {
  try {
    const key = `${ZENORA_CACHE_PREFIX}${language}:${values.join('|')}`;
    sessionStorage.setItem(key, JSON.stringify(translations));
  } catch {
    // Translation still works if storage is unavailable.
  }
}

function protectTranslationTerms(value) {
  return Object.entries(ZENORA_PROTECTED_TERMS).reduce(
    (result, [term, placeholder]) => result.split(term).join(placeholder),
    value
  );
}

function restoreTranslationTerms(value) {
  return Object.entries(ZENORA_PROTECTED_TERMS).reduce(
    (result, [term, placeholder]) => result.split(placeholder).join(term),
    value
  );
}

async function translateBatch(items, language, signal) {
  const values = items.map((item) => item.value);
  const cached = readCache(language, values);
  if (cached) return cached;

  const params = new URLSearchParams({
    client: 'gtx',
    sl: 'en',
    tl: language,
    dt: 't',
    q: values.map(protectTranslationTerms).join(ZENORA_SEPARATOR)
  });
  const response = await fetch(`${ZENORA_TRANSLATION_API}?${params}`, { signal });
  if (!response.ok) throw new Error(`Translation request failed (${response.status})`);

  const data = await response.json();
  const translatedText = (data[0] || []).map((part) => part[0]).join('');
  const translations = translatedText
    .split(/\s*\[\[ZENORA_TRANSLATION_BREAK\]\]\s*/)
    .map((value) => restoreTranslationTerms(value.trim()));

  if (translations.length !== items.length) {
    throw new Error('The translation service returned an incomplete result.');
  }

  writeCache(language, values, translations);
  return translations;
}

function applyTranslation(item, value) {
  if (item.node) {
    item.node.nodeValue = `${item.leading}${value}${item.trailing}`;
    return;
  }
  item.element?.setAttribute(item.attribute, value);
}

function restoreEnglish() {
  zenoraTranslationState.nodes.forEach((item) => applyTranslation(item, item.original.trim()));
  document.title = zenoraTranslationState.originalTitle;
  document.documentElement.lang = 'en';
  document.documentElement.dir = 'ltr';
}

async function setLanguage(language, { initial = false } = {}) {
  if (!ZENORA_LANGUAGES[language]) language = 'en';
  const select = document.querySelector('#zenora-language');
  if (select) select.value = language;

  zenoraTranslationState.controller?.abort();
  zenoraTranslationState.controller = new AbortController();
  const requestId = ++zenoraTranslationState.requestId;
  restoreEnglish();
  localStorage.setItem(ZENORA_LANGUAGE_KEY, language);

  if (language === 'en') {
    setTranslationStatus('', 'ready');
    return;
  }

  document.documentElement.lang = ZENORA_LANGUAGES[language].locale;
  document.body.classList.add('is-translating');
  setTranslationStatus('Translating…', 'loading');

  try {
    const titleItem = { value: zenoraTranslationState.originalTitle };
    const batches = buildBatches([...zenoraTranslationState.nodes, titleItem]);

    for (const batch of batches) {
      const translations = await translateBatch(
        batch,
        language,
        zenoraTranslationState.controller.signal
      );
      if (requestId !== zenoraTranslationState.requestId) return;
      batch.forEach((item, index) => {
        if (item === titleItem) document.title = translations[index];
        else applyTranslation(item, translations[index]);
      });
    }

    setTranslationStatus('✓', 'ready');
  } catch (error) {
    if (error.name === 'AbortError') return;
    restoreEnglish();
    if (select) select.value = 'en';
    localStorage.setItem(ZENORA_LANGUAGE_KEY, 'en');
    setTranslationStatus('Translation unavailable', 'error');
    if (!initial) console.warn(error);
  } finally {
    if (requestId === zenoraTranslationState.requestId) {
      document.body.classList.remove('is-translating');
    }
  }
}

function initZenoraTranslation() {
  createLanguageSwitcher();
  collectTranslatableNodes();
  const savedLanguage = localStorage.getItem(ZENORA_LANGUAGE_KEY) || 'en';
  setLanguage(savedLanguage, { initial: true });
}

async function translateCurrentPage() {
  const currentLanguage = localStorage.getItem(ZENORA_LANGUAGE_KEY) || 'en';
  collectTranslatableNodes();
  await setLanguage(currentLanguage, { initial: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initZenoraTranslation, { once: true });
} else {
  initZenoraTranslation();
}

window.zenoraTranslateCurrentPage = translateCurrentPage;
