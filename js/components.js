/**
 * COMPONENT RENDERER
 * Dynamically binds verified data from PORTFOLIO_CONFIG to DOM elements.
 * Allows instant updates through js/config.js.
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.PORTFOLIO_CONFIG;
  if (!config) {
    console.error('PORTFOLIO_CONFIG is not loaded.');
    return;
  }

  renderHeroBadges(config);
  renderExperience(config);
  renderEducation(config);
  renderCertifications(config);
  renderSkills(config);
  renderAchievements(config);
  renderContactDetails(config);
  renderFooter(config);
});

/* --------------------------------------------------------------------------
   HERO BADGES STRIP
   -------------------------------------------------------------------------- */
function renderHeroBadges(config) {
  const container = document.getElementById('hero-badges-container');
  if (!container || !config.profile.technicalHighlights) return;

  container.innerHTML = config.profile.technicalHighlights.map(spec => `
    <div class="tech-spec-badge" style="background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.75rem 1rem;">
      <div style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--accent-cyan);">${escapeHtml(spec.label)}</div>
      <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 0.15rem;">${escapeHtml(spec.desc)}</div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   EXPERIENCE TIMELINE
   -------------------------------------------------------------------------- */
function renderExperience(config) {
  const container = document.getElementById('experience-timeline');
  if (!container || !config.experience) return;

  container.innerHTML = config.experience.map((job, index) => `
    <article class="timeline-item reveal-on-scroll delay-${index + 1}">
      <div class="timeline-node" aria-hidden="true"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <div>
            <h3 class="timeline-role">${escapeHtml(job.role)}</h3>
            <div class="timeline-company">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
                <path d="M9 22v-4h6v4"/>
                <path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/>
                <path d="M12 10h.01"/><path d="M12 14h.01"/>
                <path d="M16 10h.01"/><path d="M16 14h.01"/>
                <path d="M8 10h.01"/><path d="M8 14h.01"/>
              </svg>
              <span>${escapeHtml(job.company)}</span>
              ${job.subLocation ? `<span style="font-size: 0.85rem; color: var(--text-tertiary);">• ${escapeHtml(job.subLocation)}</span>` : ''}
            </div>
          </div>
          <div class="timeline-meta">
            <span class="timeline-badge ${job.status.toLowerCase().includes('present') ? 'status-present' : ''}">
              ${escapeHtml(job.period)}
            </span>
          </div>
        </div>

        <p class="timeline-summary">${escapeHtml(job.summary)}</p>

        <button type="button" class="timeline-toggle-btn" data-target="details-${job.id}" aria-expanded="false">
          <span>View Verified Responsibilities</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <div id="details-${job.id}" class="timeline-details" aria-hidden="true">
          <ul class="responsibility-list">
            ${job.responsibilities.map(resp => `<li>${escapeHtml(resp)}</li>`).join('')}
          </ul>
        </div>

        <div class="timeline-tags">
          ${job.tags.map(tag => `<span class="tech-tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');

  // Add click handlers for accordion
  container.querySelectorAll('.timeline-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const details = document.getElementById(targetId);
      const isExpanded = btn.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', isExpanded);
      if (details) {
        details.classList.toggle('open');
        details.setAttribute('aria-hidden', !isExpanded);
        btn.querySelector('span').textContent = isExpanded ? 'Hide Responsibilities' : 'View Verified Responsibilities';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   EDUCATION
   -------------------------------------------------------------------------- */
function renderEducation(config) {
  const container = document.getElementById('education-grid');
  if (!container || !config.education) return;

  container.innerHTML = config.education.map((edu, idx) => `
    <article class="edu-card reveal-on-scroll delay-${idx + 1}">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
          <span class="timeline-badge">${escapeHtml(edu.statusBadge || edu.passingYear)}</span>
          ${edu.grade ? `<span class="tech-tag" style="color: var(--accent-cyan); font-weight: 600;">${escapeHtml(edu.grade)}</span>` : ''}
        </div>
        <h3 class="edu-degree">${escapeHtml(edu.degree)}</h3>
        <div class="edu-institution">${escapeHtml(edu.institution)}</div>
        ${edu.board ? `<div style="font-size: 0.85rem; color: var(--text-tertiary); margin-bottom: 0.5rem;">Board: ${escapeHtml(edu.board)}</div>` : ''}
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">${escapeHtml(edu.details)}</p>
      </div>
    </article>
  `).join('');
}

/* --------------------------------------------------------------------------
   CERTIFICATIONS WITH FILTERING
   -------------------------------------------------------------------------- */
let activeCertFilter = 'all';

function renderCertifications(config) {
  const container = document.getElementById('certifications-grid');
  const filterContainer = document.getElementById('cert-filter-container');
  if (!container || !config.certifications) return;

  const categories = ['all', 'NSDA', 'BTEB', 'Industrial & Safety'];

  if (filterContainer) {
    filterContainer.innerHTML = categories.map(cat => `
      <button type="button" class="cert-filter-btn ${cat === activeCertFilter ? 'active' : ''}" data-filter="${cat}">
        ${cat === 'all' ? 'All Qualifications (13)' : cat}
      </button>
    `).join('');

    filterContainer.querySelectorAll('.cert-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCertFilter = btn.getAttribute('data-filter');
        filterContainer.querySelectorAll('.cert-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterCerts(config);
      });
    });
  }

  filterCerts(config);
}

function filterCerts(config) {
  const container = document.getElementById('certifications-grid');
  if (!container) return;

  const filtered = config.certifications.filter(item => {
    if (activeCertFilter === 'all') return true;
    if (activeCertFilter === 'NSDA') return item.issuer.includes('NSDA');
    if (activeCertFilter === 'BTEB') return item.issuer.includes('BTEB') || item.issuer.includes('RISDA');
    if (activeCertFilter === 'Industrial & Safety') return item.category.includes('Safety') || item.sector.includes('Power Grid') || item.issuer.includes('Chief Electrical');
    return true;
  });

  container.innerHTML = filtered.map(cert => `
    <article class="cert-card reveal-on-scroll">
      <div>
        <div class="cert-header">
          <span class="tech-tag" style="color: var(--accent-cyan);">${escapeHtml(cert.category)}</span>
          <span style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--text-tertiary);">${escapeHtml(cert.year)}</span>
        </div>
        <h4 class="cert-title" style="margin-top: 0.5rem;">${escapeHtml(cert.title)}</h4>
        <div class="cert-issuer" style="margin-top: 0.35rem;">${escapeHtml(cert.issuer)}</div>
      </div>
      <div class="cert-footer">
        <span style="color: var(--text-tertiary);">${escapeHtml(cert.sector)}</span>
        <span style="color: var(--accent-green);">● Verified CV Record</span>
      </div>
    </article>
  `).join('');
}

/* --------------------------------------------------------------------------
   SKILLS MATRIX
   -------------------------------------------------------------------------- */
function renderSkills(config) {
  const container = document.getElementById('skills-matrix-container');
  if (!container || !config.skills) return;

  const groups = [
    {
      title: "Electrical Engineering",
      subtitle: "Installation, Distribution & Machinery",
      iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
      list: config.skills.electrical
    },
    {
      title: "Technical Training & CBT&A",
      subtitle: "Competency Assessment & Pedagogy",
      iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`,
      list: config.skills.technicalTraining
    },
    {
      title: "Digital & Technical Tools",
      subtitle: "CAD, Networks, Office & AI Tools",
      iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
      list: config.skills.digital
    }
  ];

  container.innerHTML = groups.map((grp, idx) => `
    <div class="skills-group-card reveal-on-scroll delay-${idx + 1}">
      <div class="skills-group-header">
        <div class="skills-group-icon">${grp.iconSvg}</div>
        <div>
          <h3 style="font-size: 1.15rem; margin-bottom: 0.15rem;">${escapeHtml(grp.title)}</h3>
          <div style="font-size: 0.78rem; color: var(--text-tertiary);">${escapeHtml(grp.subtitle)}</div>
        </div>
      </div>
      <div class="skills-list">
        ${grp.list.map(s => `
          <div class="skill-row">
            <div class="skill-top">
              <span class="skill-name">${escapeHtml(s.name)}</span>
              <span class="skill-badge">${escapeHtml(s.level)}</span>
            </div>
            <div class="skill-desc">${escapeHtml(s.desc)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   ACHIEVEMENTS
   -------------------------------------------------------------------------- */
function renderAchievements(config) {
  const container = document.getElementById('achievements-grid');
  if (!container || !config.achievements) return;

  container.innerHTML = config.achievements.map((ach, idx) => `
    <article class="achievement-card reveal-on-scroll delay-${idx + 1}">
      <div>
        <div class="ach-meta-top">
          <span class="ach-org">${escapeHtml(ach.organization)}</span>
          <span class="ach-year">${escapeHtml(ach.year)}</span>
        </div>
        <h3 class="ach-title">${escapeHtml(ach.title)}</h3>
        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-cyan); margin-bottom: 0.5rem;">
          Role: ${escapeHtml(ach.role)}
        </div>
        <p class="ach-desc">${escapeHtml(ach.description)}</p>
      </div>
      ${ach.verificationCode ? `
        <div class="ach-badge-code">
          Ref ID: ${escapeHtml(ach.verificationCode)}
        </div>
      ` : ''}
    </article>
  `).join('');
}

/* --------------------------------------------------------------------------
   CONTACT DETAILS & SOCIALS
   -------------------------------------------------------------------------- */
function renderContactDetails(config) {
  const emailEl = document.getElementById('contact-email-link');
  const phone1El = document.getElementById('contact-phone-1');
  const phone2El = document.getElementById('contact-phone-2');
  const whatsappEl = document.getElementById('contact-whatsapp-link');
  const socialsContainer = document.getElementById('contact-socials-container');

  if (emailEl) {
    emailEl.href = `mailto:${config.contact.email}`;
    emailEl.querySelector('.contact-val').textContent = config.contact.email;
  }

  if (phone1El && config.contact.phones[0]) {
    phone1El.href = `tel:${config.contact.phones[0].raw}`;
    phone1El.querySelector('.contact-val').textContent = config.contact.phones[0].display;
  }

  if (phone2El && config.contact.phones[1]) {
    phone2El.href = `tel:${config.contact.phones[1].raw}`;
    phone2El.querySelector('.contact-val').textContent = config.contact.phones[1].display;
  }

  if (whatsappEl) {
    whatsappEl.href = config.contact.whatsappUrl;
    whatsappEl.querySelector('.contact-val').textContent = `+${config.contact.whatsappNumber}`;
  }

  if (socialsContainer && config.contact.socials) {
    const s = config.contact.socials;
    socialsContainer.innerHTML = `
      <a href="${s.linkedin.url}" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="LinkedIn profile of Md. Yeasir Arafat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        <span>LinkedIn</span>
      </a>
      <a href="${s.facebook.url}" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="Facebook profile of Md. Yeasir Arafat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        <span>Facebook</span>
      </a>
      <a href="${s.telegram.url}" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="Telegram message to Md. Yeasir Arafat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        <span>Telegram</span>
      </a>
      <a href="${s.tiktok.url}" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="TikTok profile of Md. Yeasir Arafat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
        <span>TikTok</span>
      </a>
    `;
  }
}

/* --------------------------------------------------------------------------
   FOOTER YEAR & SOCIALS
   -------------------------------------------------------------------------- */
function renderFooter(config) {
  const yearEl = document.getElementById('footer-current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const resourceLink = document.getElementById('footer-resource-link');
  if (resourceLink && config.resources) {
    resourceLink.href = config.resources.url;
  }
}

/* --------------------------------------------------------------------------
   HTML ESCAPER HELPER
   -------------------------------------------------------------------------- */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
