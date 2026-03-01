# 🛸 Rick & Morty Angular Application

A modern Angular application that displays characters from the Rick & Morty universe using a clean, scalable architecture.

This project demonstrates:

- ✅ Standalone Angular Architecture
- ✅ Lazy Loaded Feature Routes
- ✅ Clean Architecture (Repository Pattern + DI)
- ✅ Dependency Inversion
- ✅ Angular Material Theming (Light/Dark)
- ✅ Signals for State Management
- ✅ Vitest Unit Testing
- ✅ Accessible & Keyboard-Friendly UI

Data is fetched from the public Rick and Morty API.

---

# 📸 Features

- Character Gallery
- Character Details Page
- Lazy Loaded Feature Modules
- Reusable Shared Components
- Dynamic Theme Switching (Light/Dark)
- Persistent Theme (localStorage)
- Clean Folder Structure
- Swappable Data Layer (API / Mock)
- Basic Unit Testing Setup

---

# 🏗️ Architecture Overview

The application follows a **feature-based clean architecture** structure.

```
src/
 └── app/
     ├── core                   # Global models & singleton services
     │
     ├── features/
     │     │
     ├── shared/
     │    └── components/
     │
     ├── app.routes.ts
     ├── app.config.ts
     └── main.ts

 └── styles/
      ├── _theme-colors.scss
      |--- global.scss
      └── styles.scss
```

---

# 🔄 Clean Architecture & Dependency Inversion

The app separates concerns into:

- UI Layer (Components)
- Domain Layer (Models / Abstractions)
- Data Layer (API Implementations)

Dependency injection is configured in:

```
app/app.config.ts
```

You can swap implementations using a provider pattern:

```ts
{
  provide: CharacterRepository,
  useClass: CharacterApiRepository
}
```

To switch to a mock repository:

```ts
{
  provide: CharacterRepository,
  useClass: CharacterMockRepository
}
```

This allows:

- Easy testing
- Backend flexibility
- Improved maintainability

---

# 🎨 Theming System

The app uses Angular Material theming.

## Theme files

```
src/styles/_theme-colors.scss
src/styles.scss
```

## ThemeService

Located in:

```
app/core/services/theme.service.ts
```

Responsibilities:

- Maintains current theme using Angular Signals
- Persists theme to localStorage
- Detects system color scheme
- Applies theme class to body element

Supported themes:

- Light Theme
- Dark Theme

Theme can be toggled from the landing page.

---

# 🧩 Routing

Routes are defined in:

```
app/app.routes.ts
```

Feature routes are lazy loaded for performance optimization.

Example navigation:

```
/characters
/character/:id
```

---

# 🚀 Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
ng serve
```

Open in browser:

```
http://localhost:4200/
```

The application reloads automatically when files change.

---

# 🏗️ Production Build

Build the application:

```bash
ng build
```

Output files are generated in:

```
dist/
```

---

# 🧪 Testing

Unit tests use **Vitest** via Angular CLI.

Run tests:

```bash
ng test
```

Example test files:

```
app/shared/components/card/card.spec.ts
app/features/characters/service/character.spec.ts
```

Current tests include:

- Component creation tests
- Service instantiation tests

---

# 📦 State Management

The application primarily uses:

- Angular Signals
- Component-level state
- Service-based abstraction

The architecture is ready for:

- NgRx integration
- Signal-based global stores
- Advanced state patterns

---

# 🌐 Data Source

Character data is fetched from:

Rick and Morty API  
https://rickandmortyapi.com

---

# ♿ Accessibility

- Keyboard navigation support
- Accessible clickable cards
- Semantic HTML usage

---

# 📈 Performance Optimizations

- Lazy loaded feature routes
- Standalone components
- Tree-shakable providers
- Optimized Angular Material theming

---

# 🛠️ Tech Stack

- Angular - 21 (Standalone API)
- Angular Material
- TypeScript
- SCSS
- Vitest

---

# 🔮 Future Improvements

- View Transitions API integration
- NgRx store integration
- Infinite scroll pagination
- Skeleton loaders
- PWA support
- SSR support
- Advanced unit & integration tests

---

# 👨‍💻 Author

Built as a clean architecture Angular reference project.

---

# 📄 License

This project is for educational and portfolio purposes.
