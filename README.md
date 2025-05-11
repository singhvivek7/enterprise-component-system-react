# Traya Health Assignment - Vivek

Enterprise Component System

## Tech Stack

- **React.js** - Frontend library for building user interfaces
- **TypeScript** - Strongly typed programming language that builds on JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management solution
- **Webpack** - Module bundler for JavaScript applications
- **Babel** - JavaScript compiler

## Featured Components

### 1. DataGrid

- Virtual scrolling for 10,000+ rows
- Column freezing and resizing
- Advanced filtering and sorting
- Custom cell renderers
- CSV and Excel export functionality

### 2. Modal System

- Stacked modals support
- Drag-to-resize capability
- Focus management for accessibility
- Custom transition animations

### 3. MultiStepForm

- Complex validation logic
- Conditional branching based on user input
- Form state persistence
- Progress tracking

### 4. HierarchicalTree

- Lazy loading for large datasets
- Drag-and-drop node reordering
- Custom node rendering
- Create & delete file/folder
- Efficient state management

### 5. DashboardLayout

- Grid-based positioning
- Resizable panels
- Collapsible sections
- Layout persistence

## Getting Started

### Prerequisites

- Node.js (v16.x or later)
- npm (v8.x or later) or pnpm (v10.x.x or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/singhvivek7/enterprise-component-system-react.git
   cd enterprise-component-system-react
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

### Development

Start the development server:

```bash
pnpm dev
# or
npm run dev
```

This will start the development server at `http://localhost:3000`.

### Building for Production

Build the application for production:

```bash
pnpm build
# or
npm run build
```

### Running the Production Build Locally

After building the application, you can test the production build locally:

```bash
pnpm start
# or
npm start
```

This will start a local server at `http://localhost:3000`.

## Project Structure

```
enterprise-component-system-react/
├── .babelrc        # Babel configuration
├── webpack.common.js      # Common webpack configuration
├── webpack.dev.js      # Dev webpack configuration
├── webpack.prod.js      # Prod webpack configuration
├── tsconfig.json          # TypeScript configuration
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/          # Reusable UI
│   │   ├── DataGrid/
│   │   ├── Modal/
│   │   ├── MultiStepForm/
│   │   ├── HierarchicalTree/
│   │   └── DashboardLayout/
│   ├── stores/             # Zustand state management
│   ├── lib/               # Utility lib
│   ├── pages/             # Application pages
│   ├── App.tsx            # Main application component
│   └── index.tsx          # Application entry point
│   └── index.css          # Styling
└── public/                # Static files
```

## Configuration

### Webpack

The project uses a custom Webpack configuration that includes:

- Environment-specific optimizations
- Code splitting for optimal bundle sizes
- Asset optimization
- Hot Module Replacement for development

### Babel

Custom Babel configuration includes:

- Support for modern JavaScript features
- TypeScript transpilation
- Environment-specific polyfills

### TypeScript

TypeScript is configured in strict mode, providing enhanced type safety throughout the project.

## Accessibility

All components are built with accessibility in mind, following WCAG guidelines to ensure the application is usable by everyone.

## Deployment

The application can be deployed to various cloud platforms like Vercel, Netlify, AWS, or Azure.

For a live demonstration, visit [https://enterprise-component-system-react.netlify.app/](https://enterprise-component-system-react.netlify.app/)
