<div align="center">
  <img src="./public/favicon.svg" alt="UI-DEN Logo" width="120" height="120" />
  <h1>🏛️ UI-DEN (Foundation)</h1>
  <p><strong>A High-Performance, Aesthetic UI Foundation for Professional Dashboards.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/SolidJS-2C4F7C?style=for-the-badge&logo=solid&logoColor=white" alt="SolidJS" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </p>
</div>

<br />

UI-DEN is not just a template; it's a solid architectural foundation for building premium web applications. Developed with **SolidJS**, **SolidStart**, and **Tailwind CSS v4.0**, it combines extreme performance with high-end premium design aesthetics.

---

## ✨ Key Features

### 🚀 Extreme Performance
Built purely on **SolidJS** for lightning-fast, highly reactive updates. UI-DEN operates without the overhead of a Virtual DOM, providing buttery-smooth 60fps animations and transitions across the entire dashboard.

### 🎨 Premium Aesthetics & Glassmorphism
A heavily curated, modern aesthetic featuring:
- Beautiful frosted glass effects (Backdrop blur)
- Soft, realistic shadows
- Vibrant dynamic gradients
- 20 distinct accent colors and 20 unique background generative textures.

### 🌓 Advanced Personalization Engine
UI-DEN ships with a globally accessible Personalization Panel allowing users to toggle:
- **Theme Mode**: Light & Dark modes seamlessly supported.
- **Layout Type**: Switch instantly between **Wide** (full width) and **Centered** (max 1280px) layouts.
- **Accent Color**: Choose from 20 carefully crafted color palettes (e.g., Indigo, Emerald, Sunset, Cosmic).
- **Background Style**: Select from Solid, Dots, Grid, Mesh, Aurora, Glass, and more.

### 🌍 Instant Internationalization (i18n)
Out-of-the-box, fully reactive localization support. Switch between languages instantly without reloading:
- 🇺🇸 English (US)
- 🇲🇾 Bahasa Melayu
- 🇨🇳 Chinese (Simplified)

### 📱 Responsive & Adaptive Navigation
A unified navigation experience that works everywhere.
- **Desktop**: A powerful, collapsible Sidebar (`SideNav`) with perfectly synced width, icon, and text transitions.
- **Mobile**: A condensed, accessible hamburger menu overlay.

---

## 🛠️ Technology Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Core Framework** | [SolidJS](https://www.solidjs.com/) | Declarative, efficient, and flexible JavaScript library for building user interfaces. |
| **Meta-Framework** | [SolidStart](https://start.solidjs.com/) | The Solid framework for building web applications (currently in alpha but blazing fast). |
| **Styling** | [Tailwind CSS v4.0](https://tailwindcss.com/) | A utility-first CSS framework packed with classes that can be composed to build any design. |
| **Icons** | [Solid Icons](https://solid-icons.github.io/solid-icons/) | Huge collection of icons (using the Heroicons pack `solid-icons/hi`). |
| **Testing** | [Vitest](https://vitest.dev/) & [Playwright](https://playwright.dev/) | Sub-millisecond testing framework and reliable end-to-end testing. |

---

## 📂 Project Structure

```text
📦 learn-solid-tailwind
 ┣ 📂 public/              # Static assets (Favicons, images)
 ┣ 📂 src/
 ┃ ┣ 📂 components/        # Reusable UI components
 ┃ ┃ ┣ 📂 composite/       # Complex, multi-part components (e.g., LoginForm)
 ┃ ┃ ┣ 📂 display/         # Presentational (Card, Modal, Heading, Tooltip)
 ┃ ┃ ┣ 📂 input/           # Interactive (Button, TextField, Dropdown, Toggles)
 ┃ ┃ ┣ 📂 layout/          # Page wrappers and strict Layout containers
 ┃ ┃ ┗ 📂 navigation/      # SideNav, TopNav, PersonalizationPanel
 ┃ ┣ 📂 lib/               # Core business logic, i18n dictionaries, and global stores
 ┃ ┣ 📂 routes/            # File-based routing (SolidStart)
 ┃ ┃ ┣ 📂 protected/       # Authenticated dashboard views
 ┃ ┃ ┣ 📜 index.tsx        # Public landing page
 ┃ ┃ ┗ 📜 [...404].tsx     # Catch-all strictly designed 404 page
 ┃ ┣ 📜 app.css            # Global CSS, CSS variables, custom animations
 ┃ ┣ 📜 app.tsx            # Main application root and layout providers
 ┃ ┗ 📜 entry-*.tsx        # Client and Server entry points
 ┗ 📜 package.json         # Dependencies and scripts
```

---

## 🚀 Getting Started

### 1. Prerequisite
Ensure you have Node.js 22+ installed.

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Development Server
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### 4. Build for Production
Create an optimized production build:
```bash
npm run build
npm run start
```

---

## 🔐 Authentication Mock

The application includes a fully designed authentication flow with protected routes logic. To access the `protected` dashboard views (e.g., Overview, Analytics, Settings), use the following credentials on the Login Modal:

- **Username**: `admin`
- **Password**: `admin`

*Note: This is a purely frontend mock for demonstration purposes.*

---

## 🤝 Contributing

UI-DEN focuses heavily on pixel-perfect alignment. When contributing or adding new components:
1. Ensure `transition-all` and `duration-300` are used consistently for state changes.
2. Adhere to the glassmorphism aesthetic guidelines defined in the global `.bg-surface` and `.bg-nav` classes.
3. Test layout integrity in both `Centered` and `Wide` view modes.

---

<div align="center">
  <br />
  <p><i>Built with ❤️ for developers who refuse to compromise between aesthetics and performance.</i></p>
</div>
