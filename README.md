**Nexsiz Documentation Site**

<p align="center">
  <img src="assets/nexsiz-mascot.png" width="400" height="400" alt="Logo">
</p>


Official documentation website for **Nexsiz** — Stateful Network Protocol Fuzzer.

Pure static site (HTML + CSS + JavaScript), hosted on GitHub Pages.

## Structure

```
├── index.html                 # Landing / Overview
├── 404.html
├── assets/
│   ├── css/                   # Design system
│   ├── js/                    # Navigation, theme, code copy
│   └── img/                   # Logo and assets
├── guide/                     # Getting started
├── architecture/              # Design & layers
├── features/                  # Protocol models, coverage, …
├── nxs/                       # Existence scripts
├── reference/                 # CLI, config, env
├── advanced/                  # LibAFL, Frida, extending
└── security/                  # Policy & authorised use
```

## Local preview

No build step required. Serve the root directory with any static server:

```bash
# Python
python3 -m http.server 8080

# or npx
npx serve .
```

Open `http://localhost:8080`.

## GitHub Pages

1. Repository Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: `main` / root (`/`)
4. Save

Site will be available at:

`https://revanakit.github.io/nexsiz-documentation/`

## Design

- **Aesthetic**: Dark ops / cyan accent
- **Stack**: HTML5 + CSS custom properties + vanilla JS
- **Theme toggle**: dark (default) / light
- **Responsive**: collapsible sidebar on mobile

## Development phases

| Phase | Status | Scope |
|-------|--------|-------|
| 0 | Done | Skeleton, design system, navigation, all page shells |
| 1 | Planned | Priority content (Getting Started, Architecture, CLI, NXS) |
| 2 | Planned | Feature depth (models, integrity, coverage, snapshot) |
| 3 | Planned | Advanced + security + polish |

## Licence

Documentation content follows the same Apache-2.0 licence as Nexsiz unless otherwise noted.

---

*Authorised use only. Always run against isolated targets under explicit authorisation.*
