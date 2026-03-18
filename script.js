// ========================================
// STARTER THEME DOCUMENTATION - JAVASCRIPT
// ========================================

class DocumentationApp {
  constructor() {
    this.currentDoc = null;
    this.searchIndex = [];
    this.isDarkMode = this.loadThemePreference();
    this.sidebarOpen = false;
    this.init();
  }

  // Initialize app
  init() {
    this.setupTheme();
    this.setupEventListeners();
    this.buildSearchIndex();
    this.loadHomepage();
  }

  // Setup event listeners
  setupEventListeners() {
    // Navigation links
    document.querySelectorAll(".nav-link, .quick-link-btn").forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e));
    });

    // Theme toggle
    document
      .getElementById("themeToggle")
      .addEventListener("click", () => this.toggleTheme());

    // Menu toggle
    document
      .getElementById("menuToggle")
      .addEventListener("click", () => this.toggleSidebar());

    // Search functionality
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", (e) => this.handleSearch(e));
    searchInput.addEventListener("blur", () => this.closeSearchModal());

    // Close sidebar when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => this.closeSidebar());
    });

    // Close sidebar when clicking outside
    document.addEventListener("click", (e) => {
      const sidebar = document.querySelector(".sidebar");
      const menuToggle = document.getElementById("menuToggle");
      if (sidebar && sidebar.classList.contains("open")) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
          this.closeSidebar();
        }
      }
    });
  }

  // Handle theme toggle
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.setupTheme();
    localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
  }

  // Setup theme
  setupTheme() {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");

    if (this.isDarkMode) {
      body.classList.add("dark-mode");
      themeToggle.textContent = "☀️";
    } else {
      body.classList.remove("dark-mode");
      themeToggle.textContent = "🌙";
    }
  }

  // Load theme preference
  loadThemePreference() {
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // Toggle sidebar
  toggleSidebar() {
    this.sidebarOpen ? this.closeSidebar() : this.openSidebar();
  }

  // Open sidebar
  openSidebar() {
    document.querySelector(".sidebar").classList.add("open");
    this.sidebarOpen = true;
  }

  // Close sidebar
  closeSidebar() {
    document.querySelector(".sidebar").classList.remove("open");
    this.sidebarOpen = false;
  }

  // Handle navigation click
  handleNavClick(e) {
    e.preventDefault();
    const doc = e.currentTarget.getAttribute("data-doc");
    if (doc) {
      this.loadDocument(doc);
    }
  }

  // Load document
  async loadDocument(docName) {
    try {
      // Update active nav link
      document
        .querySelectorAll(".nav-link, .quick-link-btn")
        .forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("data-doc") === docName) {
            link.classList.add("active");
          }
        });

      // Fetch markdown file
      const response = await fetch(`${docName}.md`);
      if (!response.ok) {
        throw new Error(`Failed to load ${docName}.md`);
      }

      const markdown = await response.text();
      this.currentDoc = {
        name: docName,
        content: markdown,
      };

      // Convert markdown to HTML and render
      const html = this.markdownToHtml(markdown);
      this.renderContent(html);

      // Update table of contents
      this.buildTableOfContents();

      // Clear search modal
      this.closeSearchModal();

      // Scroll to top
      document.querySelector(".content-area").scrollTop = 0;
    } catch (error) {
      console.error("Error loading document:", error);
      this.renderError(`Failed to load documentation for "${docName}"`);
    }
  }

  // Load homepage
  loadHomepage() {
    const contentArea = document.getElementById("content-area");
    contentArea.innerHTML = `
            <div class="welcome">
                <h1>📚 Welcome to Starter Theme Documentation</h1>
                <p>Complete WordPress theme documentation powered with Timber, ACF Pro, and Bootstrap 5.3</p>
                <div class="quick-links">
                    <a href="#" data-doc="README" class="quick-link-btn">Get Started</a>
                    <a href="#" data-doc="QUICK-REFERENCE" class="quick-link-btn">Quick Reference</a>
                    <a href="#" data-doc="DEVELOPER-GUIDE" class="quick-link-btn">Developer Guide</a>
                </div>
            </div>
        `;
    document.getElementById("tocSidebar").classList.remove("visible");
    this.setupEventListeners();
  }

  // Render content
  renderContent(html) {
    const contentArea = document.getElementById("content-area");
    contentArea.innerHTML = `<div class="markdown-content">${html}</div>`;

    // Show/hide TOC based on content
    const toc = document.getElementById("tocSidebar");
    const headings = contentArea.querySelectorAll("h2, h3, h4");
    if (headings.length > 0) {
      toc.classList.add("visible");
    } else {
      toc.classList.remove("visible");
    }
  }

  // Render error
  renderError(message) {
    const contentArea = document.getElementById("content-area");
    contentArea.innerHTML = `
            <div class="markdown-content">
                <h1>❌ Error</h1>
                <p>${message}</p>
                <p><a href="#" data-doc="README" class="quick-link-btn">Return to Homepage</a></p>
            </div>
        `;
    this.setupEventListeners();
  }

  // Build table of contents
  buildTableOfContents() {
    const contentArea = document.getElementById("content-area");
    const headings = contentArea.querySelectorAll("h2, h3, h4");
    const tocNav = document.getElementById("tocNav");

    tocNav.innerHTML = "";

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const id = `toc-${index}`;
      heading.id = id;

      const link = document.createElement("a");
      link.href = "#" + id;
      link.className = `toc-link toc-h${level}`;
      link.textContent = heading.textContent;

      link.addEventListener("click", (e) => {
        e.preventDefault();
        heading.scrollIntoView({ behavior: "smooth" });
        this.updateActiveTOC();
      });

      tocNav.appendChild(link);
    });

    // Track scroll to update active TOC link
    document
      .querySelector(".content-area")
      .addEventListener("scroll", () => this.updateActiveTOC());
  }

  // Update active TOC link
  updateActiveTOC() {
    const contentArea = document.querySelector(".content-area");
    const headings = contentArea.querySelectorAll("h2, h3, h4");
    const tocLinks = document.querySelectorAll(".toc-link");
    let activeIndex = 0;

    headings.forEach((heading, index) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 200) {
        activeIndex = index;
      }
    });

    tocLinks.forEach((link, index) => {
      link.classList.toggle("active", index === activeIndex);
    });
  }

  // Build search index
  async buildSearchIndex() {
    const docs = [
      "README",
      "QUICK-REFERENCE",
      "DEVELOPER-GUIDE",
      "DOCUMENTATION",
      "BLOCKS-GUIDE",
      "CONFIG-GUIDE",
      "COMPONENTS-GUIDE",
      "BEM-GUIDE",
      "JAVASCRIPT-GUIDE",
      "GDPR-GUIDE",
      "OPTIONAL-FEATURES",
      "WOOCOMMERCE-GUIDE",
      "WOOCOMMERCE-QUICK-REF",
      "STYLE-SHEET",
      "TODO",
    ];

    for (const doc of docs) {
      try {
        const response = await fetch(`${doc}.md`);
        if (response.ok) {
          const content = await response.text();
          this.indexDocument(doc, content);
        }
      } catch (error) {
        console.warn(`Failed to index ${doc}`);
      }
    }
  }

  // Index document
  indexDocument(docName, content) {
    const lines = content.split("\n");
    lines.forEach((line, index) => {
      if (line.trim().length > 0) {
        const heading = line.match(/^#+\s+(.+)$/);
        const text = heading ? heading[1] : line;

        this.searchIndex.push({
          doc: docName,
          text: text,
          isHeading: !!heading,
        });
      }
    });
  }

  // Handle search
  handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const modal = document.getElementById("searchModal");
    const resultsContainer = document.getElementById("searchResults");

    if (!query) {
      this.closeSearchModal();
      return;
    }

    const results = this.searchIndex
      .filter((entry) => entry.text.toLowerCase().includes(query))
      .slice(0, 10);

    if (results.length === 0) {
      resultsContainer.innerHTML =
        '<div class="search-result-empty">No results found</div>';
    } else {
      resultsContainer.innerHTML = results
        .map(
          (result, index) => `
                <div class="search-result-item" onclick="app.loadDocument('${
                  result.doc
                }')">
                    <div class="search-result-title">${result.doc}</div>
                    <div class="search-result-snippet">${this.highlightMatch(
                      result.text,
                      query,
                    )}</div>
                </div>
            `,
        )
        .join("");
    }

    modal.classList.add("visible");
  }

  // Highlight search match
  highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, "gi");
    return text
      .replace(
        regex,
        '<mark style="background-color: rgba(245, 158, 11, 0.3);">$1</mark>',
      )
      .substring(0, 100);
  }

  // Close search modal
  closeSearchModal() {
    document.getElementById("searchModal").classList.remove("visible");
  }

  // ========================================
  // MARKDOWN TO HTML CONVERTER
  // ========================================

  markdownToHtml(markdown) {
    let html = markdown;

    // Escape HTML
    html = html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Headers (h1-h6)
    html = html.replace(/^### (.*?)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*?)$/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*?)$/gm, "<h1>$1</h1>");
    html = html.replace(/^#### (.*?)$/gm, "<h4>$1</h4>");
    html = html.replace(/^##### (.*?)$/gm, "<h5>$1</h5>");
    html = html.replace(/^###### (.*?)$/gm, "<h6>$1</h6>");

    // Code blocks
    html = html.replace(
      /```(.*?)\n([\s\S]*?)```/g,
      "<pre><code>$2</code></pre>",
    );

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

    // Italic
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/_(.+?)_/g, "<em>$1</em>");

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Blockquotes
    html = html.replace(/^> (.*?)$/gm, "<blockquote>$1</blockquote>");

    // Horizontal rule
    html = html.replace(/^---$/gm, "<hr>");
    html = html.replace(/^\*\*\*$/gm, "<hr>");

    // Unordered lists
    html = this.parseUnorderedLists(html);

    // Ordered lists
    html = this.parseOrderedLists(html);

    // Tables
    html = this.parseTables(html);

    // Line breaks - convert multiple newlines to paragraphs
    html = html.replace(/\n\n/g, "</p><p>");
    html = html.replace(/\n/g, "<br>");

    // Wrap in paragraphs
    const lines = html.split("</p><p>");
    html = lines
      .map((line) => {
        line = line.trim();
        if (line && !line.match(/^<(h[1-6]|pre|ul|ol|blockquote|table|hr)/)) {
          if (!line.startsWith("<p>")) line = "<p>" + line;
          if (!line.endsWith("</p>")) line = line + "</p>";
        }
        return line;
      })
      .join("");

    // Unescape code blocks
    html = html
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");

    return html;
  }

  // Parse unordered lists
  parseUnorderedLists(html) {
    const lines = html.split("\n");
    let result = [];
    let inList = false;

    lines.forEach((line) => {
      const match = line.match(/^- (.*)$/);
      if (match) {
        if (!inList) {
          result.push("<ul>");
          inList = true;
        }
        result.push(`<li>${match[1]}</li>`);
      } else {
        if (inList && line.trim()) {
          result.push("</ul>");
          inList = false;
        }
        result.push(line);
      }
    });

    if (inList) {
      result.push("</ul>");
    }

    return result.join("\n");
  }

  // Parse ordered lists
  parseOrderedLists(html) {
    const lines = html.split("\n");
    let result = [];
    let inList = false;

    lines.forEach((line) => {
      const match = line.match(/^\d+\. (.*)$/);
      if (match) {
        if (!inList) {
          result.push("<ol>");
          inList = true;
        }
        result.push(`<li>${match[1]}</li>`);
      } else {
        if (inList && line.trim()) {
          result.push("</ol>");
          inList = false;
        }
        result.push(line);
      }
    });

    if (inList) {
      result.push("</ol>");
    }

    return result.join("\n");
  }

  // Parse tables (markdown table format)
  parseTables(html) {
    const tablePattern = /\|(.+)\n\|[-\s|:]+\n((?:\|.+\n)*)/g;

    return html.replace(tablePattern, (match, header, rows) => {
      const headerCells = header
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell);
      const rowsArray = rows
        .trim()
        .split("\n")
        .filter((row) => row);

      let table = "<table><thead><tr>";
      headerCells.forEach((cell) => {
        table += `<th>${cell}</th>`;
      });
      table += "</tr></thead><tbody>";

      rowsArray.forEach((row) => {
        const cells = row
          .split("|")
          .map((cell) => cell.trim())
          .filter((cell) => cell);
        table += "<tr>";
        cells.forEach((cell) => {
          table += `<td>${cell}</td>`;
        });
        table += "</tr>";
      });

      table += "</tbody></table>";
      return table;
    });
  }
}

// Initialize app when DOM is ready
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new DocumentationApp();
});
