// Header navigation functionality
class HeaderNavigation {
  constructor() {
    this.menuBtn = document.querySelector(".header__menu-btn");
    this.nav = document.querySelector(".header__nav");
    this.navLinks = document.querySelectorAll(".header__nav-link");
    this.isMenuOpen = false;

    this.init();
  }

  init() {
    // Add event listeners
    this.menuBtn.addEventListener("click", () => this.toggleMenu());

    // Close menu when clicking outside
    document.addEventListener("click", (e) => this.handleOutsideClick(e));

    // Handle keyboard navigation
    document.addEventListener("keydown", (e) => this.handleKeydown(e));

    // Close menu when window is resized to desktop
    window.addEventListener("resize", () => this.handleResize());

    // Close menu when clicking on nav links (mobile)
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMenu());
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  openMenu() {
    this.menuBtn.classList.add("is-active");
    this.nav.classList.add("is-active");
    document.body.style.overflow = "hidden";

    // Focus management
    this.menuBtn.setAttribute("aria-expanded", "true");

    // Focus first nav link
    const firstLink = this.nav.querySelector(".header__nav-link");
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }

  closeMenu() {
    this.menuBtn.classList.remove("is-active");
    this.nav.classList.remove("is-active");
    document.body.style.overflow = "";

    // Focus management
    this.menuBtn.setAttribute("aria-expanded", "false");
    this.menuBtn.focus();
  }

  handleOutsideClick(e) {
    // Close menu if clicking outside nav and menu button
    if (
      this.isMenuOpen &&
      !this.nav.contains(e.target) &&
      !this.menuBtn.contains(e.target)
    ) {
      this.closeMenu();
    }
  }

  handleKeydown(e) {
    if (!this.isMenuOpen) return;

    // Close menu on Escape key
    if (e.key === "Escape") {
      this.closeMenu();
      return;
    }

    // Handle tab navigation within menu
    if (e.key === "Tab") {
      const focusableElements = this.nav.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Trap focus within menu
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  handleResize() {
    // Close menu if window is resized to desktop size
    if (window.innerWidth >= 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }
}

// Initialize header navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HeaderNavigation();
});
