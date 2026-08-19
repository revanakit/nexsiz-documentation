/**
 * NEXSIZ Documentation — Core UI
 * Sidebar, theme, mobile nav, active link, code copy
 */

(function () {
  "use strict";

  const STORAGE_THEME = "nexsiz-docs-theme";

  /* ---------- Theme ---------- */
  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_THEME);
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_THEME, theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  /* ---------- Sidebar / Mobile ---------- */
  function initSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const toggle = document.getElementById("menu-toggle");

    if (!sidebar || !toggle) return;

    function open() {
      sidebar.classList.add("open");
      if (overlay) overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function close() {
      sidebar.classList.remove("open");
      if (overlay) overlay.classList.remove("open");
      document.body.style.overflow = "";
    }

    toggle.addEventListener("click", () => {
      if (sidebar.classList.contains("open")) close();
      else open();
    });

    if (overlay) {
      overlay.addEventListener("click", close);
    }

    sidebar.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 900) close();
      });
    });
  }

  /* ---------- Active nav link ---------- */
  function highlightActiveNav() {
    const path = window.location.pathname.replace(/\/$/, "") || "/";
    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      let linkPath = href.replace(/^\.\.\//, "/").replace(/^\.\//, "/");
      if (!linkPath.startsWith("/")) {
        const base = path.substring(0, path.lastIndexOf("/") + 1);
        linkPath = (base + linkPath).replace(/\/+/g, "/");
      }

      const linkFile = href.split("/").pop();
      const currentFile = path.split("/").pop() || "index.html";

      if (
        href === path ||
        linkFile === currentFile ||
        (path === "/" && (href === "/" || href === "index.html" || href.endsWith("/index.html")))
      ) {
        link.classList.add("active");
      }
    });
  }

  /* ---------- Code copy buttons ---------- */
  function initCodeCopy() {
    document.querySelectorAll("pre").forEach((pre) => {
      if (pre.parentElement.classList.contains("code-block")) return;

      const wrapper = document.createElement("div");
      wrapper.className = "code-block";
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.type = "button";
      btn.textContent = "Copy";
      btn.addEventListener("click", async () => {
        const text = pre.textContent || "";
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = "Copied";
          setTimeout(() => (btn.textContent = "Copy"), 1500);
        } catch {
          btn.textContent = "Failed";
          setTimeout(() => (btn.textContent = "Copy"), 1500);
        }
      });
      wrapper.appendChild(btn);
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(getPreferredTheme());
    initSidebar();
    highlightActiveNav();
    initCodeCopy();

    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  });
})();
