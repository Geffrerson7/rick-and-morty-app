
# Rick and Morty Explorer

A web application built with React that allows users to explore characters and episodes from the Rick and Morty universe using the official API.

## Features

- **Character Explorer:** Browse characters and view their information.
- **Character Search:** Search for characters by name.
- **Character Details:** View character images, status, species, gender, origin, and location.
- **Episode Explorer:** Browse episodes and view their information.
- **Episode Details:** Explore episode information and its associated characters.
- **Nested Navigation:** Navigate from episodes to character details while preserving the episode context.
- **Dynamic Breadcrumbs:** Navigate between pages using reusable breadcrumbs.
- **Loading and Error States:** Display feedback while fetching data or when requests fail.
- **Responsive Design:** Adapt the interface to different screen sizes.

## Tech Stack

- **React** — UI development.
- **Vite** — Development server and build tool.
- **React Router** — Client-side routing and nested routes.
- **Tailwind CSS** — Utility-first styling.
- **Material Tailwind** — Breadcrumb navigation components.
- **Rick and Morty API** — Character and episode data.
- **JavaScript (ES6+)** — Application logic.
- **pnpm** — Package management.

## API

This project uses the public Rick and Morty API.

- API documentation: https://rickandmortyapi.com/documentation
- Base URL: https://rickandmortyapi.com/api

No API key is required.

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone <YOUR_REPOSITORY_URL>
   ```

2. Navigate to the project directory:

   ```bash
   cd <PROJECT_DIRECTORY>
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open the local URL displayed in your terminal, usually:

   ```text
   http://localhost:5173
   ```

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server. |
| `pnpm build` | Build the application for production. |
| `pnpm preview` | Preview the production build locally. |
| `pnpm lint` | Run ESLint to check code quality. |

## Application Routes

| Route | Description |
|---|---|
| `/` | Browse characters. |
| `/personaje/:id` | View character details. |
| `/episodios` | Browse episodes. |
| `/episodios/:episodioId` | View episode details. |
| `/episodios/:episodioId/personaje/:personajeId` | View a character from a specific episode. |
| `*` | Display the not-found page. |

## Project Structure

```text
src/
├── components/
│   ├── Breadcrumbs.jsx
│   ├── Layout.jsx
│   └── ...
├── helpers/
│   └── api.js
├── pages/
│   ├── Episodios.jsx
│   ├── EpisodioDetalle.jsx
│   ├── Personajes.jsx
│   ├── PersonajeDetalle.jsx
│   └── NotFound.jsx
├── App.jsx
└── main.jsx
```

This structure separates reusable components, API helpers, page components, and route configuration.

## Future Improvements

- Add pagination for characters and episodes.
- Improve search and filtering options.
- Add automated tests.
- Improve accessibility and keyboard navigation.
- Deploy the application to a hosting platform.

## Credits

Character and episode data provided by the [Rick and Morty API](https://rickandmortyapi.com/).

This project is an independent fan-made application and is not affiliated with the official Rick and Morty franchise.