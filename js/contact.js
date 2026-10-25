/**
 * CONTACT FORM & DISPATCH MODAL SYSTEM (Section 8)
 * Honest, transparent message preparation.
 * Opens an elegant glassmorphism dispatch modal allowing the visitor to choose:
 * - Option A: Direct WhatsApp chat with recipient 8801726507007
 * - Option B: Pre-filled Email to arafat.bisd@gmail.com
 * Includes full form validation, message preview, and clipboard copy fallback.
 */

let activeTriggerElement = null;

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initContactModal();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const feedbackEl = document.getElementById('form-feedback');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    // Reset feedback
    if (feedbackEl) {
      feedbackEl.className = 'form-feedback';
      feedbackEl.textContent = '';
      feedbackEl.style.display = 'none';
    }

    // Validation
    if (!name || name.length < 2) {
      showFormError(feedbackEl, 'Please enter your full name (at least 2 characters).');
      nameInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showFormError(feedbackEl, 'Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    if (!subject || subject.length < 3) {
      showFormError(feedbackEl, 'Please enter a message subject (at least 3 characters).');
      subjectInput.focus();
      return;
    }

    if (!message || message.length < 8) {
      showFormError(feedbackEl, 'Please enter your message (at least 8 characters).');
      messageInput.focus();
      return;
    }

    // Save trigger element for focus restoration
    activeTriggerElement = form.querySelector('button[type="submit"]');

    // Build standard message template as required in Section 8
    const formattedTemplate = `Hello Md. Yeasir Arafat,

I would like to contact you regarding the following:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Thank you.`;

    // Populate and open dispatch modal
    openContactModal({
      name,
      email,
      subject,
      message,
      formattedTemplate
    });
  });
}

function showFormError(el, msg) {
  if (!el) return;
  el.className = 'form-feedback error';
  el.textContent = msg;
  el.style.display = 'block';
}

/* --------------------------------------------------------------------------
   CONTACT DISPATCH MODAL LOGIC
   -------------------------------------------------------------------------- */
function initContactModal() {
  const modal = document.getElementById('contact-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('modal-close-btn');
  const editBtn = document.getElementById('modal-edit-btn');
  const copyBtn = document.getElementById('modal-copy-btn');

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (activeTriggerElement) {
      activeTriggerElement.focus();
    }
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (editBtn) editBtn.addEventListener('click', closeModal);

  // Close on outside backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Copy message to clipboard
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = copyBtn.getAttribute('data-clipboard-text') || '';
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const origText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied to clipboard!';
        copyBtn.style.color = 'var(--accent-green)';
        setTimeout(() => {
          copyBtn.textContent = origText;
          copyBtn.style.color = '';
        }, 2200);
      }).catch(() => {
        alert('Could not auto-copy. You can select and copy the text in the preview above.');
      });
    });
  }
}

function openContactModal(data) {
  const modal = document.getElementById('contact-modal');
  if (!modal) return;

  // Populate preview fields
  const previewName = document.getElementById('modal-preview-name');
  const previewEmail = document.getElementById('modal-preview-email');
  const previewSubject = document.getElementById('modal-preview-subject');
  const previewBody = document.getElementById('modal-preview-body');

  if (previewName) previewName.textContent = data.name;
  if (previewEmail) previewEmail.textContent = data.email;
  if (previewSubject) previewSubject.textContent = data.subject;
  if (previewBody) previewBody.textContent = data.message;

  // Configure WhatsApp link
  // Recipient: 8801726507007
  const whatsappBtn = document.getElementById('modal-whatsapp-btn');
  if (whatsappBtn) {
    const whatsappUrl = `https://wa.me/8801726507007?text=${encodeURIComponent(data.formattedTemplate)}`;
    whatsappBtn.href = whatsappUrl;
  }

  // Configure Email mailto link
  // Recipient: arafat.bisd@gmail.com
  const emailBtn = document.getElementById('modal-email-btn');
  if (emailBtn) {
    const emailSubject = `[Portfolio Enquiry] ${data.subject} — ${data.name}`;
    const mailtoUrl = `mailto:arafat.bisd@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(data.formattedTemplate)}`;
    emailBtn.href = mailtoUrl;
  }

  // Store clipboard text
  const copyBtn = document.getElementById('modal-copy-btn');
  if (copyBtn) {
    copyBtn.setAttribute('data-clipboard-text', data.formattedTemplate);
  }

  // Show modal
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Focus primary WhatsApp button
  setTimeout(() => {
    if (whatsappBtn) whatsappBtn.focus();
  }, 100);
}
