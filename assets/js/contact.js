// ===================================================================
// VIKZENTRA - CONTACT, FAQ ACCORDION & CORE INTERACTIONS
// Lead form, WhatsApp launcher, and toast alerts
// ===================================================================

// Agency Contact Configuration (Easily customizable by startup owner)
const AGENCY_CONFIG = {
  agencyName: 'Vikzentra',
  whatsappNumber: '918409539175',
  contactEmail: 'vk9993537@gmail.com',
  supportHours: 'Mon - Sat: 9:00 AM - 9:00 PM IST'
};

// Global Toast Notification Helper
window.showToast = function(message, duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  const icon = document.createElement('span');
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '💬';
  const text = document.createElement('span');
  text.textContent = message;
  toast.append(icon, text);
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
};

// Main App Controller
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFaqAccordion();
  initContactForm();
  initWhatsAppWidget();
});

// 1. Sticky Navbar & Mobile Drawer
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('site-navigation');
  const links = navLinks?.querySelectorAll('a[href^="#"]') || [];
  const headerAnchors = header?.querySelectorAll('a') || [];

  const setMenuOpen = (isOpen) => {
    navLinks?.classList.toggle('is-open', isOpen);
    mobileToggle?.setAttribute('aria-expanded', String(isOpen));
    mobileToggle?.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  };

  // Scroll effect
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      setMenuOpen(mobileToggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close on link click
    headerAnchors.forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('click', (event) => {
      if (!header?.contains(event.target)) setMenuOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1020) setMenuOpen(false);
    });
  }

  // Keep the visible navigation state in sync with the section in view.
  const targets = Array.from(links)
    .map(link => ({ link, section: document.getElementById(link.hash.slice(1)) }))
    .filter(target => target.section);

  const updateActiveLink = () => {
    const currentPosition = window.scrollY + (header?.offsetHeight || 0) + 130;
    let activeTarget = null;

    targets.forEach(target => {
      if (target.section.offsetTop <= currentPosition) activeTarget = target;
    });

    targets.forEach(target => {
      const isActive = target === activeTarget;
      target.link.classList.toggle('is-active', isActive);
      if (isActive) target.link.setAttribute('aria-current', 'location');
      else target.link.removeAttribute('aria-current');
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

// 2. FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item, index) => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    const answerId = answer.id || `faq-answer-${index + 1}`;
    answer.id = answerId;
    answer.setAttribute('aria-labelledby', `${answerId}-question`);
    questionBtn.id = `${answerId}-question`;
    questionBtn.setAttribute('aria-controls', answerId);
    questionBtn.setAttribute('aria-expanded', String(item.classList.contains('active')));
    answer.setAttribute('aria-hidden', String(!item.classList.contains('active')));

    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-question-btn')?.setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-answer')?.setAttribute('aria-hidden', 'true');
        }
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
      questionBtn.setAttribute('aria-expanded', String(!isActive));
      answer.setAttribute('aria-hidden', String(isActive));
    });
  });
}

// 3. Contact Form & Lead Handling
function initContactForm() {
  const form = document.getElementById('agency-contact-form');
  const waBtn = document.getElementById('contact-whatsapp-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const projectType = document.getElementById('contact-project-type')?.value;
      const budget = document.getElementById('contact-budget')?.value;
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !phone) {
        window.showToast('⚠️ Please enter your Name and WhatsApp/Phone number.');
        return;
      }

      const projectTypeLabel = document.getElementById('contact-project-type')?.selectedOptions[0]?.textContent;
      const budgetLabel = document.getElementById('contact-budget')?.selectedOptions[0]?.textContent;

      openWhatsAppMessage({ name, phone, email, projectType: projectTypeLabel || projectType, budget: budgetLabel || budget, message });
      window.showToast('Your project details are ready in WhatsApp. Send the message there to complete your inquiry.');
    });
  }

  // Direct WhatsApp Button from contact section
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const name = document.getElementById('contact-name')?.value.trim() || 'Client';
      const projectType = document.getElementById('contact-project-type')?.selectedOptions[0]?.textContent || 'Website Development';
      const phone = document.getElementById('contact-phone')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const budget = document.getElementById('contact-budget')?.selectedOptions[0]?.textContent;
      const message = document.getElementById('contact-message')?.value.trim() || 'I want to build a website for my startup/business.';

      openWhatsAppMessage({ name, phone, email, projectType, budget, message });
    });
  }
}

// 4. WhatsApp Integration Helper
function openWhatsAppMessage(data) {
  const text = encodeURIComponent(
    `Hello ${AGENCY_CONFIG.agencyName}! 🚀\n\n` +
    `Name: ${data.name || 'Prospective Client'}\n` +
    (data.phone ? `Phone: ${data.phone}\n` : '') +
    (data.email ? `Email: ${data.email}\n` : '') +
    `Project Type: ${data.projectType || 'New Website'}\n` +
    `Budget: ${data.budget || 'Flexible'}\n` +
    `Details: ${data.message || 'I need a modern, high-speed website for my business.'}\n\n` +
    `Please share your pricing and timeline. Thanks!`
  );

  const url = `https://api.whatsapp.com/send?phone=${AGENCY_CONFIG.whatsappNumber}&text=${text}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// 5. Floating WhatsApp Quick Widget
function initWhatsAppWidget() {
  const widgetBtn = document.getElementById('floating-wa-btn');
  if (widgetBtn) {
    widgetBtn.addEventListener('click', () => {
      openWhatsAppMessage({
        name: 'Website Visitor',
        projectType: 'General Inquiry',
        message: 'Hello! I saw your agency website and I am interested in building a website for my business.'
      });
    });
  }
}

// Package selector helper
window.selectPricingPlan = function(planName) {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }

  const messageInput = document.getElementById('contact-message');
  if (messageInput) {
    messageInput.value = `Hi Vikzentra! I am interested in the "${planName}" package. Please share the timeline and next steps to start our project.`;
  }

  window.showToast(`Selected "${planName}". Fill your contact details below to finalize!`);
};

