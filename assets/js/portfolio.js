// ===================================================================
// VIKZENTRA - PORTFOLIO SHOWCASE & MODAL CONTROLLER
// Category filtering, responsive cards, interactive case-study modal
// ===================================================================

const Portfolio = (() => {
  const PROJECTS = [
    {
      id: 'shopwave',
      title: 'ShopWave Lux E-Commerce',
      category: 'ecommerce',
      categoryLabel: 'E-Commerce Store',
      tagline: 'High-Converting Luxury Apparel & Lifestyle Store',
      metric: '+192% Sales & 0.8s Page Load',
      tech: ['Next.js', 'Tailwind CSS', 'Stripe / Razorpay', 'Headless CMS'],
      imageBg: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
      textColor: '#312e81',
      summary: 'A bespoke modern online store built for an emerging luxury lifestyle brand. Featuring ultra-fast 1-click checkout, dynamic inventory tracking, and seamless automated WhatsApp order alerts.',
      features: [
        'Sub-second page load times with Next.js static generation',
        'Multi-currency payment integration (Cards, UPI, NetBanking, PayPal)',
        'Automated WhatsApp and Email order confirmations',
        'Custom Admin Dashboard for order and stock fulfillment'
      ],
      client: 'ShopWave Retail Ltd.',
      liveUrl: '#contact'
    },
    {
      id: 'novatask',
      title: 'NovaTask AI SaaS App',
      category: 'saas',
      categoryLabel: 'SaaS & Web App',
      tagline: 'Intelligent Team Collaboration & Workflow Platform',
      metric: '10,000+ Active Daily Users',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind', 'WebSockets'],
      imageBg: 'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)',
      textColor: '#115e59',
      summary: 'A modern cloud-based productivity software designed for fast-paced remote teams. Includes interactive Kanban boards, role-based security, automated sprints, and real-time live chat.',
      features: [
        'Real-time WebSocket synchronization across devices',
        'Interactive charts & exportable executive analytics',
        'Stripe recurring subscription billing integration',
        'OAuth authentication with Google, GitHub, and SSO'
      ],
      client: 'Nova Systems Inc.',
      liveUrl: '#contact'
    },
    {
      id: 'drcare',
      title: 'DrCare Telehealth Clinic',
      category: 'business',
      categoryLabel: 'Corporate & Business',
      tagline: 'Doctor Appointment Booking & Telemedicine Portal',
      metric: '3,500+ Appointments Booked/Month',
      tech: ['React', 'Next.js', 'Firebase', 'WhatsApp API'],
      imageBg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
      textColor: '#166534',
      summary: 'A clean, HIPAA-compliant patient consultation and appointment portal. Patients can view specialist schedules, book video consultations, and receive prescription downloads.',
      features: [
        'Instant slot booking with live doctor calendar sync',
        'Automated SMS & WhatsApp appointment reminders',
        'Secure patient portal with medical history access',
        '100% Mobile responsive with 98 Google PageSpeed'
      ],
      client: 'DrCare Health Network',
      liveUrl: '#contact'
    },
    {
      id: 'aura-interiors',
      title: 'Aura Luxury Interiors',
      category: 'business',
      categoryLabel: 'Corporate & Business',
      tagline: 'High-End Architecture & Interior Design Showcase',
      metric: '4.8x Increase in Qualified Inquiries',
      tech: ['HTML5', 'GSAP Animations', 'Tailwind CSS', 'SEO Engine'],
      imageBg: 'linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%)',
      textColor: '#86198f',
      summary: 'An award-winning visual portfolio crafted for an elite architecture and interior design firm. Features smooth motion transitions, interactive before/after sliders, and high-res project galleries.',
      features: [
        'Interactive before/after renovation image comparisons',
        'High-resolution optimized asset delivery via CDN',
        'Integrated multi-step project cost estimation form',
        'Ranked #1 on Google for regional luxury interior terms'
      ],
      client: 'Aura Design Collective',
      liveUrl: '#contact'
    },
    {
      id: 'bitecraft',
      title: 'BiteCraft Gourmet Kitchen',
      category: 'hospitality',
      categoryLabel: 'Hospitality & Retail',
      tagline: 'Cloud Kitchen & Restaurant Ordering Platform',
      metric: 'Zero Marketplace Commission Fees',
      tech: ['Next.js', 'Tailwind', 'Razorpay UPI', 'Cloud Functions'],
      imageBg: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
      textColor: '#9a3412',
      summary: 'Direct-to-consumer digital ordering portal helping restaurants eliminate 30% third-party delivery commission fees. Direct UPI checkout, GPS order delivery tracking, and QR code table menus.',
      features: [
        'Interactive digital visual menu with allergen filters',
        'Direct UPI & Card payment with zero delay payouts',
        'Live kitchen order printer integration',
        'Customer loyalty points & coupon discounts system'
      ],
      client: 'BiteCraft Hospitality',
      liveUrl: '#contact'
    },
    {
      id: 'finvault',
      title: 'FinVault Capital Advisors',
      category: 'saas',
      categoryLabel: 'SaaS & Web App',
      tagline: 'Wealth Advisory & Portfolio Investment Portal',
      metric: '₹250+ Cr Assets Monitored',
      tech: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'AES-256'],
      imageBg: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
      textColor: '#075985',
      summary: 'A secure financial analytics and client management portal for registered investment advisors. Includes encrypted document vaults, portfolio returns trackers, and automated client quarterly reporting.',
      features: [
        'Bank-grade 256-bit encryption for confidential filings',
        'Interactive SIP, Mutual Fund, and Equity return charts',
        'Automated PDF statement generation and email dispatch',
        'Two-factor SMS & Authenticator App login verification'
      ],
      client: 'FinVault Partners',
      liveUrl: '#contact'
    }
  ];

  let gridEl, filterTabs, modalBackdrop, modalContent, modalCloseBtn;

  function init() {
    gridEl = document.getElementById('portfolio-grid');
    filterTabs = document.querySelectorAll('.filter-tab');
    modalBackdrop = document.getElementById('project-modal');
    modalContent = document.getElementById('modal-content-container');
    modalCloseBtn = document.getElementById('modal-close');

    if (!gridEl) return;

    renderProjects('all');
    bindEvents();
  }

  function bindEvents() {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const category = tab.dataset.filter;
        renderProjects(category);
      });
    });

    if (modalCloseBtn && modalBackdrop) {
      modalCloseBtn.addEventListener('click', closeModal);
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
          closeModal();
        }
      });
    }
  }

  function renderProjects(category) {
    gridEl.innerHTML = '';

    const filtered = category === 'all' 
      ? PROJECTS 
      : PROJECTS.filter(p => p.category === category);

    filtered.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.id = project.id;

      card.innerHTML = `
        <div class="project-thumb-wrap" style="background: ${project.imageBg};">
          <div class="project-thumb-art">
            <div style="text-align: center; color: ${project.textColor || '#09090b'};">
              <div style="font-size: 2.2rem; margin-bottom: 8px;">💻</div>
              <strong style="font-size: 1.15rem; font-family: var(--font-heading); display: block;">${project.title}</strong>
              <span style="font-size: 0.82rem; opacity: 0.85; font-weight: 500;">${project.tagline}</span>
            </div>
          </div>
          <span class="project-category-badge">${project.categoryLabel}</span>
          <div class="project-overlay">
            <span class="btn btn-primary btn-sm">View Case Study & Specs ↗</span>
          </div>
        </div>
        <div class="project-body">
          <h4 class="project-title">${project.title}</h4>
          <p class="project-desc">${project.summary.substring(0, 95)}...</p>
          <div class="project-metric">
            <span>📈 ${project.metric}</span>
          </div>
          <div class="project-tags">
            ${project.tech.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
        </div>
      `;

      card.addEventListener('click', () => openModal(project));
      gridEl.appendChild(card);
    });
  }

  function openModal(project) {
    if (!modalBackdrop || !modalContent) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--border-subtle);">
        <span class="studio-pill" style="margin-bottom: 12px;">${project.categoryLabel}</span>
        <h2 style="font-size: 2.2rem; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.03em;">${project.title}</h2>
        <p style="font-size: 1.05rem; color: var(--text-accent);">${project.tagline}</p>
      </div>

      <div style="background: ${project.imageBg}; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 40px; text-align: center; color: ${project.textColor || '#09090b'}; margin-bottom: 28px;">
        <div style="font-size: 3rem; margin-bottom: 10px;">🚀</div>
        <h3 style="font-size: 1.5rem; margin-bottom: 6px; letter-spacing: -0.02em;">Live Project Showcase</h3>
        <p style="font-size: 0.95rem; opacity: 0.9;">Delivered for <strong>${project.client}</strong></p>
        <div style="display: inline-block; margin-top: 14px; background: rgba(0,0,0,0.08); padding: 6px 18px; border-radius: 20px; font-weight: 700;">
          Impact: ${project.metric}
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 10px;">About The Project</h4>
        <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.96rem;">${project.summary}</p>
      </div>

      <div style="margin-bottom: 28px;">
        <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 12px;">Key Capabilities & Delivered Features</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
          ${project.features.map(f => `
            <li style="display: flex; align-items: center; gap: 10px; font-size: 0.92rem; color: var(--text-secondary);">
              <span style="color: var(--accent-emerald); font-weight: bold;">✔</span> ${f}
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 32px;">
        <h4 style="font-size: 0.85rem; font-weight: 800; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted);">
          Technologies & Architecture
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${project.tech.map(t => `<span class="project-tag" style="padding: 6px 14px; font-size: 0.85rem; font-weight: 600;">${t}</span>`).join('')}
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
        <p style="font-size: 0.9rem; color: var(--text-muted);">Want a similar high-performance website for your brand?</p>
        <button class="btn btn-primary" id="modal-cta-btn" onclick="Portfolio.bookSimilar('${project.title}')">
          Build a Site Like This 🚀
        </button>
      </div>
    `;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function bookSimilar(projectTitle) {
    closeModal();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    const messageInput = document.getElementById('contact-message');
    if (messageInput) {
      messageInput.value = `Hi Vikzentra! I was reviewing your portfolio and really loved the "${projectTitle}" project. I would like to build a similar website for my business. Let's discuss details and pricing.`;
    }
  }

  return {
    init,
    bookSimilar
  };
})();

document.addEventListener('DOMContentLoaded', Portfolio.init);

