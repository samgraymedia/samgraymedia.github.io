# 📚 Starter Theme Documentation Website

A beautiful, modern single-page documentation site built with plain HTML, CSS, and JavaScript.

## ✨ Features

- **Responsive Design** – Works perfectly on desktop, tablet, and mobile
- **Dark Mode** – Built-in theme toggle with persistent preference
- **Real-time Search** – Instantly search across all documentation files
- **Table of Contents** – Auto-generated TOC for easy navigation
- **Markdown Support** – Converts all your .md files to beautiful HTML
- **Sidebar Navigation** – Organized by category for quick access
- **Smooth Scrolling** – Professional animations and transitions
- **No Dependencies** – 100% vanilla HTML, CSS, and JavaScript
- **SEO Friendly** – Proper semantic markup

## 🚀 Quick Start

1. Place all the files in the same directory as your markdown files:

   - `index.html`
   - `styles.css`
   - `script.js`
   - Your `.md` files (README.md, BLOCKS-GUIDE.md, etc.)

2. Open `index.html` in your browser – that's it!

## 📂 File Structure

```
documentation/
├── index.html              # Main HTML file
├── styles.css              # All styling & responsive design
├── script.js               # App logic & markdown conversion
├── README.md               # Your existing docs
├── QUICK-REFERENCE.md
├── DEVELOPER-GUIDE.md
├── BLOCKS-GUIDE.md
├── CONFIG-GUIDE.md
├── COMPONENTS-GUIDE.md
├── BEM-GUIDE.md
├── JAVASCRIPT-GUIDE.md
├── GDPR-GUIDE.md
├── OPTIONAL-FEATURES.md
├── WOOCOMMERCE-GUIDE.md
├── WOOCOMMERCE-QUICK-REF.md
├── STYLE-SHEET.md
├── DOCUMENTATION.md
└── TODO.md
```

## 🎨 Design Features

### Header

- Logo & title at the top
- Search bar for instant search
- Dark mode toggle
- Mobile menu button

### Sidebar Navigation

- Organized into sections:
  - **Start Here** – README, Quick Reference
  - **Core Guides** – Main developer resources
  - **Specialized Guides** – All topic-specific docs
  - **Utilities** – TODO list and other tools
- Active page highlighting
- Smooth hover effects

### Main Content Area

- Beautiful markdown rendering
- Proper typography hierarchy
- Code blocks with syntax highlighting
- Tables with styling
- Blockquotes and lists
- Link highlighting

### Table of Contents (Right Side)

- Auto-generated from document headings
- Smooth scroll navigation
- Active link tracking
- Shows on desktop, hidden on mobile

### Search Modal

- Real-time search results
- Highlights matching text
- Shows document source
- Click to navigate

## 🌓 Dark Mode

The site automatically detects your system preference (light/dark) but you can toggle it anytime with the moon/sun button. Your preference is saved in browser local storage.

## 📱 Responsive Breakpoints

- **Desktop (1024px+)** – Full sidebar + TOC
- **Tablet (768px-1024px)** – Adjusted layout
- **Mobile (<768px)** – Hamburger menu, hidden TOC, optimized spacing

## 🔍 Search Functionality

- Searches across all document headings and content
- Results show document name and preview text
- Click any result to jump to that document
- Displays up to 10 results

## 🎯 How It Works

1. **Markdown Parsing** – The `script.js` file includes a markdown-to-HTML converter that:

   - Converts headers, bold, italic, lists
   - Handles code blocks and inline code
   - Parses tables and blockquotes
   - Creates links and formatting

2. **Dynamic Loading** – Clicking navigation links:

   - Fetches the selected `.md` file
   - Converts to HTML
   - Renders in the main content area
   - Generates table of contents

3. **Search Indexing** – On page load:
   - All markdown files are indexed
   - Creates searchable entries
   - Real-time filtering on user input

## 🎨 Customization

All styling uses CSS variables defined in the `:root` selector. Easy to customize:

```css
:root {
  --color-primary: #2563eb; /* Main blue */
  --color-secondary: #7c3aed; /* Purple accent */
  --color-accent: #f59e0b; /* Orange */
  /* ... more variables ... */
}
```

Edit these to match your brand colors.

## 💡 Tips

- **Local Server**: For best results, serve from a local web server:

  ```bash
  # Python 3
  python3 -m http.server 8000

  # Python 2
  python -m SimpleHTTPServer 8000

  # Node (npx)
  npx http-server
  ```

- **Browser Support**: Works on all modern browsers (Chrome, Firefox, Safari, Edge)

- **Markdown Format**: Your existing markdown files should work as-is – the converter handles:
  - Headers, lists, bold/italic
  - Code blocks with triple backticks
  - Tables with pipe syntax
  - Links in `[text](url)` format

## 📝 Notes

- The markdown converter handles the common markdown syntax used in your guides
- Complex markdown like advanced table formatting may need adjustments
- All markdown files must be in the same directory as `index.html`

## 🎁 Bonus Features

- Automatic active link highlighting
- Smooth scroll behavior
- Custom scrollbar styling
- Loading animation
- Error handling with fallback messages
- Mobile-friendly hamburger menu
- Accessibility-friendly markup

---

**Ready to use!** Just open `index.html` in your browser and start browsing your documentation.
