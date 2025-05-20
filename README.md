# Resource Hub

A Notion-inspired dark-themed web application for organizing and managing your favorite resources, links, and references. Built with Next.js and Tailwind CSS.

## Features

- 🎨 Dark theme with Notion-inspired design
- 📝 Add resources with title, link, description, and category
- 🏷️ Categorize resources (Design, Development, Productivity, Inspiration)
- 🔍 Filter resources by category
- 💾 Persistent storage using localStorage
- 📱 Responsive design for all devices

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React Hooks

## Getting Started

1. Clone the repository:

```bash
git clone <your-repo-url>
cd resources-hub
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Add a new resource:

   - Fill in the title and link (required)
   - Add an optional description
   - Select a category
   - Click "Add Resource"

2. Filter resources:

   - Use the category buttons at the top to filter resources
   - Click "All" to see all resources

3. View resources:
   - Resources are displayed in a responsive grid
   - Click on any resource card to open the link in a new tab

## Data Storage

Resources are stored in your browser's localStorage, so they persist between sessions. No server or database is required.

## License

MIT
