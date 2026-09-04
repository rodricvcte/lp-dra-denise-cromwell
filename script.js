// Always start at the top on load/refresh, ignoring browser scroll restoration
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
function forceScrollTop() { window.scrollTo(0, 0); }
forceScrollTop();
window.addEventListener("load", forceScrollTop);
window.addEventListener("pageshow", forceScrollTop);
setTimeout(forceScrollTop, 0);

// Load-in effect: reveal hero elements shortly after the page paints
function triggerLoadEffects() {
  document.querySelectorAll("[data-load]").forEach((el) => el.classList.add("is-loaded"));
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => requestAnimationFrame(() => setTimeout(triggerLoadEffects, 60)));
} else {
  requestAnimationFrame(() => setTimeout(triggerLoadEffects, 60));
}

// Mobile fullscreen menu
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");

function openMobileMenu() {
  mobileMenu.classList.add("is-open");
  navToggle.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeMobileMenu() {
  mobileMenu.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}
navToggle.addEventListener("click", openMobileMenu);
mobileClose.addEventListener("click", closeMobileMenu);
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Header shadow on scroll
const header = document.getElementById("header");
window.addEventListener(
  "scroll",
  () => header.classList.toggle("is-scrolled", window.scrollY > 8),
  { passive: true }
);

// Active nav link by visible section
const navLinks = document.querySelectorAll(".nav a[href^='#']");
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window && sections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        }
      });
    },
    { threshold: 0.45 }
  );
  sections.forEach((section) => navObserver.observe(section));
}

// Reveal on scroll
const revealEls = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// WhatsApp floating bubble
const waBubble = document.getElementById("waBubble");
if (waBubble) {
  let bubbleShown = false;
  function showWaBubble() {
    if (bubbleShown) return;
    bubbleShown = true;
    waBubble.classList.add("is-visible");
    setTimeout(() => waBubble.classList.remove("is-visible"), 6000);
  }
  setTimeout(showWaBubble, 4000);
  window.addEventListener("scroll", () => { if (window.scrollY > 400) showWaBubble(); }, { passive: true, once: true });
}
