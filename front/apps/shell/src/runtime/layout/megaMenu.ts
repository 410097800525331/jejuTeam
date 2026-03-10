let megaScrollBound = false;

const syncHeaderScrolledClass = () => {
  const header = document.querySelector<HTMLElement>(".header");
  if (!header) {
    return;
  }

  if (window.scrollY > 20) {
    header.classList.add("scrolled");
    return;
  }

  header.classList.remove("scrolled");
};

const bindScrollEffect = () => {
  if (megaScrollBound) {
    return;
  }

  megaScrollBound = true;
  window.addEventListener("scroll", syncHeaderScrolledClass);
  syncHeaderScrolledClass();
};

const bindDropdownHover = () => {
  const navItems = document.querySelectorAll<HTMLElement>(".nav-item");
  navItems.forEach((item) => {
    if (item.dataset.megaHoverBound === "true") {
      return;
    }

    const dropdown = item.querySelector<HTMLElement>(".mega-dropdown");
    if (!dropdown) {
      return;
    }

    item.dataset.megaHoverBound = "true";

    item.addEventListener("mouseenter", () => {
      document.querySelectorAll<HTMLElement>(".mega-dropdown.active").forEach((activeDropdown) => {
        if (activeDropdown !== dropdown) {
          activeDropdown.classList.remove("active");
        }
      });

      dropdown.classList.add("active");
    });

    item.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!item.matches(":hover")) {
          dropdown.classList.remove("active");
        }
      }, 200);
    });
  });
};

const bindPreviewHover = () => {
  const megaMenuItems = document.querySelectorAll<HTMLElement>(".mega-menu-item");
  megaMenuItems.forEach((menuItem) => {
    if (menuItem.dataset.previewHoverBound === "true") {
      return;
    }

    menuItem.dataset.previewHoverBound = "true";

    menuItem.addEventListener("mouseenter", () => {
      const dropdown = menuItem.closest<HTMLElement>(".mega-dropdown");
      const targetId = menuItem.getAttribute("data-preview");
      const targetImage = targetId ? document.getElementById(targetId) : null;

      if (!dropdown || !targetImage) {
        return;
      }

      dropdown.querySelectorAll<HTMLElement>(".preview-image").forEach((image) => {
        image.classList.remove("active");
      });

      targetImage.classList.add("active");

      const loader = dropdown.querySelector<HTMLElement>(".preview-loader");
      if (loader) {
        loader.style.display = "none";
      }
    });
  });
};

const initInitialPreviewImage = () => {
  document.querySelectorAll<HTMLElement>(".mega-dropdown").forEach((dropdown) => {
    if (dropdown.dataset.previewInit === "true") {
      return;
    }

    dropdown.dataset.previewInit = "true";

    const firstImage = dropdown.querySelector<HTMLElement>(".preview-image");
    if (firstImage) {
      firstImage.classList.add("active");
    }
  });
};

export const initMegaMenu = () => {
  bindScrollEffect();
  bindDropdownHover();
  bindPreviewHover();
  initInitialPreviewImage();
};
