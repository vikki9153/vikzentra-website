// ===================================================================
// VIKZENTRA - INTERACTIVE COST & TIMELINE ESTIMATOR
// Real-time calculation, multi-currency (INR / USD), auto-fill form
// ===================================================================

const Calculator = (() => {
  // Base configuration
  const CONFIG = {
    currency: 'INR', // 'INR' or 'USD'
    usdRate: 83,

    types: {
      landing: {
        name: 'Landing Page / Portfolio',
        basePriceINR: 5999,
        baseDays: 3,
        stack: 'HTML5, Tailwind CSS, Modern JS / React',
        desc: 'Single page high-converting layout for personal brands, apps or products'
      },
      business: {
        name: 'Corporate & Business Website',
        basePriceINR: 12999,
        baseDays: 7,
        stack: 'React / Next.js, Tailwind, SEO Engine',
        desc: 'Multi-page complete business site with services, about, and inquiry'
      },
      ecommerce: {
        name: 'Full E-Commerce Store',
        basePriceINR: 24999,
        baseDays: 12,
        stack: 'Next.js / Shopify / WooCommerce + Payment Gateways',
        desc: 'Products catalogue, cart, checkout, orders, customer login'
      },
      custom_app: {
        name: 'Custom SaaS & Web App',
        basePriceINR: 44999,
        baseDays: 20,
        stack: 'Next.js, Node.js, PostgreSQL/MongoDB, Auth, APIs',
        desc: 'Complex dynamic applications, user dashboards, automated workflows'
      }
    },

    pageMultiplierINR: 900, // per page above base (3 pages)

    addons: {
      payment: { name: 'Payment Gateway (Razorpay/Stripe)', priceINR: 2500 },
      cms: { name: 'Admin Panel & CMS Content Management', priceINR: 4000 },
      seo: { name: 'Advanced SEO & Analytics Setup', priceINR: 2000 },
      whatsapp: { name: 'WhatsApp Bot & Live Chat Integration', priceINR: 1500 },
      multilang: { name: 'Multi-Language Support (English/Hindi+)', priceINR: 2500 },
      speed: { name: 'Ultra Speed Optimization (95+ PageSpeed)', priceINR: 2000 }
    },

    timelines: {
      standard: { name: 'Standard Timeline', multiplier: 1.0, dayOffset: 0 },
      fast: { name: 'Fast Track (Priority Queue)', multiplier: 1.15, dayOffset: -2 },
      express: { name: 'Express Sprint (Urgent)', multiplier: 1.35, dayOffset: -4 }
    }
  };

  // State
  let state = {
    type: 'business',
    pages: 5,
    selectedAddons: ['seo', 'whatsapp'],
    timeline: 'standard',
    currency: 'INR'
  };

  // DOM Elements
  let typeCards, pageSlider, pageCountDisplay, addonCards, timelinePills;
  let priceDisplay, estTimelineDisplay, estTechStackDisplay, includedAddonsCountDisplay;
  let inrBtn, usdBtn, claimQuoteBtn;

  function init() {
    // Cache DOM
    typeCards = document.querySelectorAll('.type-option-card');
    pageSlider = document.getElementById('calc-pages-slider');
    pageCountDisplay = document.getElementById('calc-pages-val');
    addonCards = document.querySelectorAll('.addon-card');
    timelinePills = document.querySelectorAll('.timeline-pill');
    
    priceDisplay = document.getElementById('calc-price-output');
    estTimelineDisplay = document.getElementById('calc-timeline-output');
    estTechStackDisplay = document.getElementById('calc-stack-output');
    includedAddonsCountDisplay = document.getElementById('calc-addons-count');

    inrBtn = document.getElementById('curr-inr');
    usdBtn = document.getElementById('curr-usd');
    claimQuoteBtn = document.getElementById('claim-quote-btn');

    if (!priceDisplay) return; // Exit if calculator not on page

    bindEvents();
    render();
  }

  function bindEvents() {
    // Website type selection
    typeCards.forEach(card => {
      card.addEventListener('click', () => {
        typeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        state.type = card.dataset.type;
        render();
      });
    });

    // Page count slider
    if (pageSlider) {
      pageSlider.addEventListener('input', (e) => {
        state.pages = parseInt(e.target.value, 10);
        if (pageCountDisplay) pageCountDisplay.textContent = state.pages;
        render();
      });
    }

    // Addons toggle
    addonCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        
        const addonKey = card.dataset.addon;
        if (checkbox.checked) {
          card.classList.add('active');
          if (!state.selectedAddons.includes(addonKey)) state.selectedAddons.push(addonKey);
        } else {
          card.classList.remove('active');
          state.selectedAddons = state.selectedAddons.filter(k => k !== addonKey);
        }
        render();
      });
    });

    // Timeline selection
    timelinePills.forEach(pill => {
      pill.addEventListener('click', () => {
        timelinePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.timeline = pill.dataset.timeline;
        render();
      });
    });

    // Currency switch
    if (inrBtn && usdBtn) {
      inrBtn.addEventListener('click', () => {
        state.currency = 'INR';
        inrBtn.classList.add('active');
        usdBtn.classList.remove('active');
        render();
      });

      usdBtn.addEventListener('click', () => {
        state.currency = 'USD';
        usdBtn.classList.add('active');
        inrBtn.classList.remove('active');
        render();
      });
    }

    // Claim Quote Action (auto-populates contact form)
    if (claimQuoteBtn) {
      claimQuoteBtn.addEventListener('click', () => {
        applyQuoteToContactForm();
      });
    }
  }

  function calculate() {
    const typeInfo = CONFIG.types[state.type];
    let totalPriceINR = typeInfo.basePriceINR;

    // Additional pages cost (base includes up to 3 pages)
    if (state.pages > 3) {
      totalPriceINR += (state.pages - 3) * CONFIG.pageMultiplierINR;
    }

    // Addons cost
    state.selectedAddons.forEach(addonKey => {
      if (CONFIG.addons[addonKey]) {
        totalPriceINR += CONFIG.addons[addonKey].priceINR;
      }
    });

    // Timeline multiplier
    const timelineInfo = CONFIG.timelines[state.timeline];
    totalPriceINR = Math.round(totalPriceINR * timelineInfo.multiplier);

    // Days calculation
    let totalDays = Math.max(3, typeInfo.baseDays + Math.round((state.pages - 3) * 0.8) + timelineInfo.dayOffset);

    // Currency conversion
    let formattedPrice = '';
    if (state.currency === 'INR') {
      formattedPrice = `₹${totalPriceINR.toLocaleString('en-IN')}`;
    } else {
      const priceUSD = Math.round(totalPriceINR / CONFIG.usdRate);
      formattedPrice = `$${priceUSD.toLocaleString('en-US')}`;
    }

    return {
      totalPriceINR,
      formattedPrice,
      totalDays,
      typeInfo,
      timelineInfo
    };
  }

  function render() {
    const result = calculate();

    if (priceDisplay) {
      priceDisplay.textContent = result.formattedPrice;
    }

    if (estTimelineDisplay) {
      estTimelineDisplay.textContent = `${result.totalDays} - ${result.totalDays + 3} Days`;
    }

    if (estTechStackDisplay) {
      estTechStackDisplay.textContent = result.typeInfo.stack;
    }

    if (includedAddonsCountDisplay) {
      includedAddonsCountDisplay.textContent = `${state.selectedAddons.length} Selected`;
    }
  }

  function applyQuoteToContactForm() {
    const result = calculate();
    const typeInfo = CONFIG.types[state.type];

    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Auto-fill form fields
    const projectTypeSelect = document.getElementById('contact-project-type');
    const budgetSelect = document.getElementById('contact-budget');
    const messageInput = document.getElementById('contact-message');

    if (projectTypeSelect) {
      projectTypeSelect.value = state.type;
    }

    if (budgetSelect) {
      if (result.totalPriceINR < 15000) budgetSelect.value = 'basic';
      else if (result.totalPriceINR < 35000) budgetSelect.value = 'medium';
      else budgetSelect.value = 'enterprise';
    }

    if (messageInput) {
      const addonNames = state.selectedAddons.map(k => CONFIG.addons[k]?.name).filter(Boolean).join(', ');
      messageInput.value = `Hi Vikzentra! I generated an online estimate for:
- Type: ${typeInfo.name}
- Number of Pages: ${state.pages}
- Estimated Budget: ${result.formattedPrice}
- Timeline: ${result.totalDays}-${result.totalDays+3} Days (${result.timelineInfo.name})
- Features Selected: ${addonNames || 'None'}

Please review my requirements and let me know when we can discuss this further.`;
    }

    // Show toast notice
    if (window.showToast) {
      window.showToast('✅ Your customized estimate has been applied to the form below!');
    }
  }

  return {
    init,
    getState: () => state,
    calculate
  };
})();

document.addEventListener('DOMContentLoaded', Calculator.init);

