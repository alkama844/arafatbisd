/**
 * CORE APPLICATION LOGIC
 * MD. YEASIR ARAFAT — ELECTRICAL & ELECTRONIC PORTFOLIO
 * Theme switching, sticky header, mobile drawer, scroll animations, navigation spy.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeader();
  initMobileDrawer();
  initNavigationSpy();
  initScrollReveal();
  initBackToTop();
  initImageFallback();
});

/* --------------------------------------------------------------------------
   THEME SWITCHING SYSTEM (Dark AMOLED vs Clean Light Engineering)
   -------------------------------------------------------------------------- */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const root = document.documentElement;

  // Retrieve saved preference or check OS preference
  const savedTheme = localStorage.getItem('mya_theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    applyTheme(savedTheme);
  } else {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  }

  // Listen to OS changes if user hasn't set manual override
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    if (!localStorage.getItem('mya_theme')) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('mya_theme', newTheme);
    });
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle-btn');

  root.setAttribute('data-theme', theme);

  if (toggleBtn) {
    const label = theme === 'dark' ? 'Switch to light engineering theme' : 'Switch to dark AMOLED theme';
    toggleBtn.setAttribute('aria-label', label);
    toggleBtn.setAttribute('title', label);
  }

  // Redraw oscilloscope with theme colors if active
  const canvas = document.getElementById('oscilloscope-canvas');
  if (canvas && window.dispatchEvent) {
    window.dispatchEvent(new Event('resize'));
  }
}

/* --------------------------------------------------------------------------
   HEADER & STICKY BEHAVIOR
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const openBtn = document.getElementById('mobile-menu-open');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    if (openBtn) {
      openBtn.setAttribute('aria-expanded', 'false');
      openBtn.focus();
    }
    document.body.style.overflow = '';
  };

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  // Close on outside backdrop click
  drawer.addEventListener('click', e => {
    if (e.target === drawer) {
      closeDrawer();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Auto-close when clicking any navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/* --------------------------------------------------------------------------
   ACTIVE SECTION NAVIGATION SPY
   -------------------------------------------------------------------------- */
function initNavigationSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links .mobile-nav-link');

  if (sections.length === 0) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveLinks(id);
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));

  function updateActiveLinks(activeId) {
    desktopLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   INTERSECTION OBSERVER SCROLL REVEAL
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (reveals.length === 0) return;

  // If user prefers reduced motion, reveal all immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '150px 0px 100px 0px'
  });

  reveals.forEach(el => observer.observe(el));

  // Fallback: check elements on scroll and after initial load
  const revealCheck = () => {
    const triggerBottom = window.innerHeight * 1.15;
    reveals.forEach(el => {
      if (!el.classList.contains('revealed')) {
        const box = el.getBoundingClientRect();
        if (box.top < triggerBottom) {
          el.classList.add('revealed');
        }
      }
    });
  };

  window.addEventListener('scroll', revealCheck, { passive: true });
  setTimeout(revealCheck, 200);
  setTimeout(revealCheck, 600);
}

/* --------------------------------------------------------------------------
   BACK TO TOP CONTROL
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    } else {
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   IMAGE FALLBACK (Graceful Handling)
   -------------------------------------------------------------------------- */
function initImageFallback() {
  const img = document.querySelector('.portrait-img');
  if (!img) return;

  img.addEventListener('error', () => {
    console.warn('Portrait image failed to load, applying technical monogram fallback.');
    const parent = img.parentElement;
    if (parent) {
      parent.innerHTML = `
        <div style="width: 280px; height: 360px; background: var(--bg-tertiary); border: 2px dashed var(--border-accent); border-radius: var(--radius-lg); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; color: var(--accent-cyan);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 600;">MD. YEASIR ARAFAT</div>
          <div style="font-size: 0.75rem; color: var(--text-tertiary);">Portrait placeholder</div>
        </div>
      `;
    }
  });
}
