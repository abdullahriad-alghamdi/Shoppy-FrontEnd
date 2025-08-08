# Shoppy FrontEnd

Shoppy is a modern e-commerce frontend built with React, TypeScript, and Redux Toolkit. It features user and admin dashboards, authentication, product management, and more. The app is designed to work with mock data (for local development) or a backend API (for production).

## Features

- Browse products, filter by category/price, and search by name
- Add/remove products from cart
- User authentication (register, login, protected routes)
- Admin dashboard for managing products, categories, users, and orders
- Form validation and user profile editing
- Loading, success, and error messages
- Pagination (bonus)

## Demo

The app uses mock data from `public/mock/e-commerce/` for local development. In production, it connects to a backend API (see `.env.example`).

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abdullahriad-alghamdi/Shoppy-FrontEnd.git
   cd Shoppy-FrontEnd
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   - Copy `.env.example` to `.env` and fill in your backend URL and other variables as needed.

   ```bash
   cp .env.example .env
   # Edit .env to set VITE_BACKEND_URL, etc.
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at `http://localhost:3003`.

5. **Build for production:**
   ```bash
   npm run build
   # or
   yarn build
   ```

## Usage Notes

- Mock data is available in `public/mock/e-commerce/`. You can send HTTP requests to these resources for local development.
- For production, configure your backend API URL in `.env` using `VITE_BACKEND_URL`.
- Asset files in `public/assets/` are served from the root path. Use `/assets/filename.ext` in your code.

## Project Structure

- `src/` — Main source code (components, pages, redux slices, routes, styles)
- `public/` — Static assets and mock data
- `.env.example` — Example environment variables

## Contributing

Pull requests and feedback are welcome! Please review code and provide constructive suggestions.

## License

MIT
