# ZENORA Shopify Theme Blueprint

This folder contains a Shopify Online Store 2.0 theme scaffold that converts the static prototype into a Dawn-style section architecture.

## Included theme architecture

- `layout/theme.liquid`
- `config/settings_schema.json`
- `assets/base.css`
- `sections/header-group.json`
- `sections/footer-group.json`
- `sections/*.liquid`
- `snippets/product-card.liquid`
- `templates/index.json`
- `templates/collection.json`
- `templates/product.json`
- `templates/page.about.json`
- `templates/page.faq.json`

## Section mapping

### Home

- `hero-banner`
- `trust-strip`
- `category-grid`
- `featured-collection`
- `brand-story`
- `editorial-columns`

### Collection

- `main-collection-banner`
- `main-collection-grid`

### Product

- `main-product`

### Page templates

- `main-about`
- `main-faq`

## Assumptions used

- Working brand: `ZENORA`
- Category: women-led contemporary apparel with a supporting menswear capsule
- Launch markets: United States and Europe
- Price bands:
  - USD `49.99-499.99`
  - EUR `49.99-499.99`
  - GBP `39.99-399.99`

## Next step in Shopify

1. Create a new local Shopify theme with Shopify CLI.
2. Copy this folder structure into the generated theme.
3. Upload assets and connect menus, collections, products, and pages in the theme editor.
4. Assign `page.about` and `page.faq` templates to the matching Shopify pages.
5. Extend product cards, filters, and variant interactions as needed.
