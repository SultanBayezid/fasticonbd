# FastIconBD — eCommerce HTML Template

![License: MIT](https://img.shields.io/badge/License-MIT-4f46e5.svg)
![HTML5](https://img.shields.io/badge/HTML5-semantic-E34F26.svg)
![CSS3](https://img.shields.io/badge/CSS3-custom%20properties-1572B6.svg)
![JS](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E.svg)
![Responsive](https://img.shields.io/badge/Responsive-all%20devices-10b981.svg)

**FastIconBD** is a free, open-source, fully responsive **eCommerce website template** built with plain **HTML5, CSS3 and vanilla JavaScript** — no frameworks, no jQuery, no build tools, no external dependencies. Clone it, open `index.html` in any browser and it just works, online or offline.

The project started back in **April 2024** as a WordPress-powered store and was later rebuilt from scratch as a lightweight static template, keeping the original repository history and release date intact.

---

## Pages (14 ready to use)

| # | Page | File |
|---|------|------|
| 1 | Home (hero slider, deals, tabs, blog preview) | `index.html` |
| 2 | Shop with sidebar filters, sorting & pagination | `shop.html` |
| 3 | Product detail (gallery, tabs, reviews) | `product.html` |
| 4 | Shopping cart | `cart.html` |
| 5 | Checkout (billing, shipping, payments) | `checkout.html` |
| 6 | Wishlist | `wishlist.html` |
| 7 | Login | `login.html` |
| 8 | Register | `register.html` |
| 9 | About us (stats, values, team) | `about.html` |
| 10 | Contact (form + map) | `contact.html` |
| 11 | Blog listing + sidebar | `blog.html` |
| 12 | Blog post (article, comments) | `blog-single.html` |
| 13 | FAQs (accordion) | `faq.html` |
| 14 | 404 error page | `404.html` |

## Features

- **100% responsive** — mobile-first layout with a drawer navigation, tested from 320 px to 4K
- **14 production-ready pages** covering the full purchase journey
- **Vanilla JavaScript interactions**: hero slider, product tabs, deal-of-the-day countdown, quantity steppers, image gallery, accordions, grid/list view toggle, price range slider, toast notifications, scroll reveal animations
- **Demo cart & wishlist state** persisted in `localStorage` (cart/wishlist badges update live)
- **Theming via CSS custom properties** — change the whole palette from one `:root` block
- **Original SVG artwork** — every product image, hero illustration, avatar and map is a lightweight, hand-built SVG created for this project (no stock photos, no copyright concerns)
- **Accessible & SEO-friendly** — semantic landmarks, skip link, ARIA labels, keyboard-friendly controls, `meta` descriptions on every page
- **Bangladesh-ready demo content** — BDT (৳) pricing and local payment methods (bKash, Nagad, cash on delivery) out of the box
- **Zero dependencies** — no jQuery, no Bootstrap, no web fonts to download, works offline

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/SultanBayezid/fasticonbd.git
   ```
2. Open `index.html` in your browser. That's it — no build step, no server required.

To serve it locally (optional):

```bash
# any static server works, e.g.
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Project Structure

```
fasticonbd/
├── index.html              # Home
├── shop.html               # Product catalog
├── product.html            # Product detail
├── cart.html               # Shopping cart
├── checkout.html           # Checkout
├── wishlist.html           # Wishlist
├── login.html              # Sign in
├── register.html           # Sign up
├── about.html              # About us
├── contact.html            # Contact
├── blog.html               # Blog listing
├── blog-single.html        # Blog post
├── faq.html                # FAQs
├── 404.html                # Error page
├── assets/
│   ├── css/style.css       # Single, well-commented stylesheet
│   ├── js/main.js          # All interactions, vanilla JS
│   ├── favicon.svg
│   └── img/                # Original SVG demo artwork
│       ├── products/       # 16 product images
│       ├── hero/           # Hero slide illustrations
│       ├── blog/           # Blog covers
│       ├── banners/        # Promo banner art
│       ├── avatars/        # Team/testimonial avatars
│       └── map.svg         # Contact map
├── LICENSE                 # MIT
├── CHANGELOG.md
└── README.md
```

## Customization

**Colors & theme** — edit the design tokens at the top of `assets/css/style.css`:

```css
:root {
  --primary: #4f46e5;   /* brand color */
  --accent:  #f59e0b;   /* deal / CTA color */
  --dark:    #0f172a;   /* headings, header, footer */
  --radius:  14px;      /* global corner radius */
}
```

**Products** — product cards are plain HTML (see any `.product-card` block). Copy a block, swap the image, name, category and price. Prices use the `৳` character directly.

**Demo data disclaimer** — names, testimonials, reviews, contact details and statistics in this template are fictional demo content. Replace them with your real data before going live. All forms are demos: `main.js` intercepts submissions and shows a toast — wire them to your own backend (Laravel, Node.js, Django, headless CMS, anything) as needed.

**Images** — all demo graphics are SVG files under `assets/img/`. Replace them with your product photos (JPEG/WebP recommended for photography).

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 100+ |
| Firefox | 100+ |
| Safari | 15.4+ |
| Edge | 100+ |
| Samsung Internet | 17+ |

The template uses modern CSS (`grid`, `aspect-ratio`, `:has()` for radio cards, CSS custom properties) and graceful fallbacks elsewhere.

## Contributing

Issues and pull requests are welcome at <https://github.com/SultanBayezid/fasticonbd>. For major changes, please open an issue first to discuss what you would like to change.

## Author

**Sultan Bayezid** — Senior Full Stack Software Engineer, Bangladesh

- **Email**: [sultanbayezidai@gmail.com](mailto:sultanbayezidai@gmail.com)
- **Website**: [https://lastlineweb.com](https://lastlineweb.com)
- **GitHub**: [https://github.com/SultanBayezid](https://github.com/SultanBayezid)

## License

Released as open-source software under the [MIT License](LICENSE).

Copyright (c) 2026 **Sultan Bayezid**. You are free to use, modify and distribute this template for personal and commercial projects — attribution is appreciated but not required.
