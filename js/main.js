/**
 * RITIKA KIRADOO — STRATEGIC EDITORIAL PORTFOLIO (V2)
 * Advanced Interactive Controller & Micro-Animations Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Custom Smooth Magnetic Cursor Engine ---
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorRing = document.querySelector('.custom-cursor-ring');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // 60FPS fluid lag for the outer ring
    function renderCursor() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Expand cursor on interactive targets
    const interactiveTargets = document.querySelectorAll('a, button, input, textarea, select, .project-card, .pillar-card, .sip-spotlight-card, .beyond-card, .cert-card');
    interactiveTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // --- 2. Dynamic Rotating Headline Words ---
  const rotatingWordEl = document.getElementById('rotating-word');
  if (rotatingWordEl) {
    const phrases = [
      'commercial impact.',
      'client relationships.',
      'banquet operations.',
      'digital brand growth.',
      'social media reach.'
    ];
    let currentIndex = 0;

    setInterval(() => {
      rotatingWordEl.classList.remove('swap-in');
      rotatingWordEl.classList.add('swap-out');

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % phrases.length;
        rotatingWordEl.textContent = phrases[currentIndex];
        rotatingWordEl.classList.remove('swap-out');
        rotatingWordEl.classList.add('swap-in');
      }, 400);
    }, 3200);
  }

  // --- 3. Interactive Font Theme Switcher Engine ---
  const fontSwitcherBtn = document.getElementById('font-switcher-btn');
  const fontBadge = document.getElementById('current-font-badge');
  
  const fontThemes = [
    { id: 'theme-serif', label: 'Luxury Serif', className: '' },
    { id: 'theme-grotesk', label: 'Modern Grotesk', className: 'font-theme-grotesk' },
    { id: 'theme-avantgarde', label: 'Avant-Garde', className: 'font-theme-avantgarde' }
  ];

  let currentThemeIdx = 0;
  const savedTheme = localStorage.getItem('ritika_font_theme');

  if (savedTheme) {
    const foundIdx = fontThemes.findIndex(t => t.id === savedTheme);
    if (foundIdx !== -1) currentThemeIdx = foundIdx;
  }

  function applyFontTheme(idx) {
    const theme = fontThemes[idx];
    document.body.classList.remove('font-theme-grotesk', 'font-theme-avantgarde');
    if (theme.className) {
      document.body.classList.add(theme.className);
    }
    if (fontBadge) {
      fontBadge.textContent = theme.label;
    }
    localStorage.setItem('ritika_font_theme', theme.id);
  }

  // Apply initially
  applyFontTheme(currentThemeIdx);

  if (fontSwitcherBtn) {
    fontSwitcherBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentThemeIdx = (currentThemeIdx + 1) % fontThemes.length;
      applyFontTheme(currentThemeIdx);
    });
  }

  // Also enable font switching from mobile drawer if available
  const mobileFontBtn = document.getElementById('mobile-font-switcher');
  if (mobileFontBtn) {
    mobileFontBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentThemeIdx = (currentThemeIdx + 1) % fontThemes.length;
      applyFontTheme(currentThemeIdx);
    });
  }

  // --- 4. 3D Card Interactive Perspective Tilt ---
  const tiltCards = document.querySelectorAll('.project-card, .pillar-card, .sip-spotlight-card, .hero-visual-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle max tilt of +/- 4.5 degrees
      const rotateX = ((centerY - y) / centerY) * 4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // --- 5. Reading Progress Bar ---
  const progressBar = document.getElementById('reading-progress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  });

  // --- 6. Mobile Menu Drawer ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileToggle.innerHTML = '&#9776;';
        document.body.style.overflow = '';
      } else {
        mobileDrawer.classList.add('open');
        mobileToggle.innerHTML = '&times;';
        document.body.style.overflow = 'hidden';
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.innerHTML = '&#9776;';
        document.body.style.overflow = '';
      });
    });
  }

  // --- 7. ScrollSpy Navigation Highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink);

  // --- 8. IntersectionObserver for Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // --- 9. Project Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --- 10. Project & Case Study Modal Handling ---
  const modalOverlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  const modalClose = document.getElementById('modal-close');

  const projectDetails = {
    'lalit-sip': {
      title: 'Summer Internship: The LaLiT New Delhi',
      subtitle: 'Banquet Sales Process & High-Touch Client Handling Operations',
      tag: 'Hospitality Sales & Operations',
      overview: 'Conducted rigorous, on-ground summer internship training within the luxury banquet sales department of The LaLiT New Delhi, a flagship 5-star property known for hosting high-profile corporate conventions, government galas, and luxury celebrations.',
      sections: [
        {
          heading: 'Sales Inquiries & Lead Qualification',
          content: 'Managed initial prospective client inquiries for banquet halls and convention spaces. Analyzed client event profiles, guest count parameters, budget expectations, and AV/logistical requirements to pitch tailored banquet solutions.'
        },
        {
          heading: 'Site Inspections & Client Walkthroughs',
          content: 'Conducted physical site walkthroughs with corporate planners, wedding coordinators, and individual hosts. Addressed bespoke layout configurations, acoustic setups, and staging specifications to foster client confidence.'
        },
        {
          heading: 'Cross-Departmental Synchronization (BEOs)',
          content: 'Translated negotiated client requirements into precise Banquet Event Orders (BEOs). Coordinated daily with Executive Chefs for curated menus, Food & Beverage service teams for dining protocol, and Engineering/Audio-Visual teams for stage production.'
        },
        {
          heading: 'Commercial Negotiation & Post-Event Care',
          content: 'Assisted senior management in quotation drafting, margin protection, and terms negotiation. Post-event, led client feedback capture sessions, addressing operational discrepancies and preserving long-term corporate account goodwill.'
        }
      ],
      takeaways: 'Mastered high-pressure client negotiation, consultative sales psychology, and cross-functional synchronization between commercial and operations teams.'
    },
    'project-1': {
      title: 'Omnichannel Digital Brand Campaign Strategy',
      subtitle: 'Integrated Marketing Framework for Sustainable Discovery & Reach',
      tag: 'Digital Marketing & Growth',
      overview: 'Formulated a comprehensive go-to-market and digital campaign blueprint designed to bridge top-of-funnel customer acquisition with bottom-of-funnel conversion metrics across modern digital ecosystems.',
      sections: [
        {
          heading: 'Audience Persona & Intent Mapping',
          content: 'Identified core customer archetypes through behavioral segmentation. Mapped search intent against organic social habits to formulate an integrated communication narrative.'
        },
        {
          heading: 'Channel Architecture & Media Mix',
          content: 'Balanced organic content hubs (search & thought leadership) with targeted social awareness levers, ensuring unified brand messaging and consistent touchpoints.'
        },
        {
          heading: 'Performance Analytics Framework',
          content: 'Designed performance dashboards tracking leading indicators (CTR, engagement depth, scroll time) alongside trailing revenue metrics to allow agile mid-campaign optimization.'
        }
      ],
      takeaways: 'Delivers a disciplined, multi-channel strategy where every digital asset directly serves a tangible business objective.'
    },
    'project-2': {
      title: 'Social Media Architecture & Community Playbook',
      subtitle: 'Strategic Narrative Design & Retention-Driven Content Framework',
      tag: 'Social Media Strategy',
      overview: 'Engineered an organic social distribution framework that shifts brand social presence from sporadic announcements to a cohesive, high-retention content engine.',
      sections: [
        {
          heading: 'Content Pillar Matrix',
          content: 'Structured a balanced 4-pillar editorial calendar: 40% Industry Insight/Education, 30% Behind-the-Scenes & Human Brand Voice, 20% Proof of Impact, and 10% Direct Value Proposals.'
        },
        {
          heading: 'Short-Form Narrative Architecture',
          content: 'Developed script structures and visual hooks specifically optimized for 3-second attention retention in modern short-form video formats.'
        },
        {
          heading: 'Community Nurturing SLA',
          content: 'Drafted rapid-response engagement protocols to turn comment sections into direct consultative conversation channels with high-intent prospects.'
        }
      ],
      takeaways: 'Proved that brand credibility and follower loyalty stem from repeatable value delivery and genuine conversational interactions.'
    },
    'project-3': {
      title: 'High-Touch Client Relationship Playbook',
      subtitle: 'Synthesizing Hospitality Client Handling into Corporate CRM Systems',
      tag: 'Client Relationship Management',
      overview: 'Synthesized frontline luxury hospitality learnings into an actionable, enterprise-grade client handling and account management methodology.',
      sections: [
        {
          heading: 'First-Contact Response SLA',
          content: 'Established 3-tier response timelines for inbound enterprise inquiries, ensuring prompt personal acknowledgment and requirement diagnosis.'
        },
        {
          heading: 'Proactive Expectation Management',
          content: 'Created structured milestone check-ins to eliminate client anxiety during project lead times, ensuring transparent communication before critical deliverables.'
        },
        {
          heading: 'De-escalation & Retention Framework',
          content: 'Engineered a 4-step framework (Acknowledge, Investigate, Resolve, Nurture) for resolving service discrepancies while preserving client partnership.'
        }
      ],
      takeaways: 'Demonstrated that superior client retention is not accidental; it is built on deliberate communication architectures and psychological empathy.'
    },
    'project-4': {
      title: 'Competitive Market Landscape & Positioning Audit',
      subtitle: 'Strategic Analysis of Market Gaps & Brand Differentiation',
      tag: 'Market Research & Brand Strategy',
      overview: 'A deep-dive MBA market research project evaluating competitor value propositions, pricing tiering, and white space opportunities in dynamic consumer segments.',
      sections: [
        {
          heading: 'Perceptual Positioning Mapping',
          content: 'Evaluated legacy incumbents versus agile challenger brands across axes of perceived innovation and customer accessibility.'
        },
        {
          heading: 'Value Proposition Gap Analysis',
          content: 'Highlighted underserved consumer touchpoints where incumbents over-promised and under-delivered in personalized service.'
        },
        {
          heading: 'Strategic Go-To-Market Recommendations',
          content: 'Formulated actionable positioning statements and marketing channel priorities to capitalize on the identified market whitespace.'
        }
      ],
      takeaways: 'Applied core MBA analytical models (SWOT, Porter Five Forces, 4Ps) to generate practical, board-ready marketing insights.'
    }
  };

  function openModal(itemKey) {
    const data = projectDetails[itemKey];
    if (!data) return;

    let sectionsHtml = '';
    data.sections.forEach(sec => {
      sectionsHtml += `
        <div style="margin-bottom: 1.5rem;">
          <h5 style="font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; color: var(--color-charcoal); margin-bottom: 0.35rem;">${sec.heading}</h5>
          <p style="font-size: 0.9rem; color: var(--color-text-secondary-light); line-height: 1.65;">${sec.content}</p>
        </div>
      `;
    });

    modalBody.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-sunset-coral); text-transform: uppercase; letter-spacing: 0.1em;">${data.tag}</span>
      </div>
      <h3 style="font-family: var(--font-display); font-size: 1.85rem; font-weight: 800; color: var(--color-charcoal); line-height: 1.2; margin-bottom: 0.5rem;">${data.title}</h3>
      <p style="font-size: 1rem; font-weight: 600; color: var(--color-text-muted-light); margin-bottom: 1.5rem;">${data.subtitle}</p>
      
      <div style="background: var(--color-bg-light); border-left: 3px solid var(--color-sunset-coral); padding: 1.2rem 1.4rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; margin-bottom: 2rem;">
        <p style="font-size: 0.94rem; color: var(--color-text-secondary-light); line-height: 1.65;">${data.overview}</p>
      </div>

      <div style="margin-bottom: 2rem;">
        ${sectionsHtml}
      </div>

      <div style="background: rgba(212, 255, 50, 0.15); border: 1px solid rgba(212, 255, 50, 0.4); padding: 1.2rem 1.4rem; border-radius: var(--radius-sm);">
        <h6 style="font-family: var(--font-display); font-size: 0.75rem; font-weight: 800; color: #3C4200; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.25rem;">Key Strategic Outcome &amp; Takeaway</h6>
        <p style="font-size: 0.9rem; color: var(--color-charcoal); font-weight: 500;">${data.takeaways}</p>
      </div>
    `;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Attach modal triggers
  document.querySelectorAll('.open-modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const key = trigger.getAttribute('data-modal-key');
      openModal(key);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // --- 11. Certificate Detail Handler ---
  document.querySelectorAll('.cert-action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certName = btn.getAttribute('data-cert-title') || 'Professional Certification';
      const issuer = btn.getAttribute('data-cert-issuer') || 'Accrediting Organization';
      const skills = btn.getAttribute('data-cert-skills') || 'Verified Skills';

      modalBody.innerHTML = `
        <div style="text-align: center; padding: 1.5rem 0;">
          <div style="width: 70px; height: 70px; margin: 0 auto 1.5rem; border-radius: 50%; background: rgba(255, 92, 71, 0.12); color: var(--color-sunset-coral); display: flex; align-items: center; justify-content: center; font-size: 2rem;">
            &#10003;
          </div>
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-sunset-coral); text-transform: uppercase; letter-spacing: 0.1em;">Accredited Credential</span>
          <h3 style="font-family: var(--font-display); font-size: 1.7rem; font-weight: 800; color: var(--color-charcoal); margin: 0.5rem 0 0.25rem;">${certName}</h3>
          <p style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-secondary-light); margin-bottom: 2rem;">Issued by: ${issuer}</p>

          <div style="background: var(--color-bg-light); border: 1px solid var(--border-light); padding: 1.5rem; border-radius: var(--radius-md); text-align: left; margin-bottom: 2rem;">
            <h6 style="font-size: 0.78rem; text-transform: uppercase; font-weight: 800; color: var(--color-charcoal); margin-bottom: 0.5rem;">Verified Competency Domains</h6>
            <p style="font-size: 0.9rem; color: var(--color-text-secondary-light); line-height: 1.6;">${skills}</p>
          </div>

          <div style="border: 2px dashed var(--border-light); padding: 2rem; border-radius: var(--radius-md); background: #FAF9F6; margin-bottom: 1.5rem;">
            <p style="font-size: 0.85rem; color: var(--color-text-muted-light); font-family: monospace;">[ CERTIFICATE PDF / HIGH-RES SCAN PLACEHOLDER ]</p>
            <p style="font-size: 0.8rem; color: var(--color-text-secondary-light); margin-top: 0.5rem;">To link your original certificate scan or verification URL, update the link attribute in <code>index.html</code>.</p>
          </div>

          <button onclick="document.getElementById('project-modal').classList.remove('open'); document.body.style.overflow='';" style="background: var(--color-charcoal); color: var(--color-cream); font-weight: 700; font-size: 0.85rem; padding: 0.75rem 1.7rem; border-radius: var(--radius-pill); cursor: pointer;">
            Close Credential View
          </button>
        </div>
      `;
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // --- 12. Resume Print & Download Actions ---
  const printBtn = document.getElementById('btn-print-resume');
  if (printBtn) {
    printBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }

  const downloadBtn = document.getElementById('btn-download-resume');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      const hasPdf = downloadBtn.getAttribute('data-has-pdf') === 'true';
      if (!hasPdf) {
        e.preventDefault();
        alert('Prompting printer dialog: select "Save as PDF" to export this ATS-ready resume directly.');
        window.print();
      }
    });
  }

  // --- 13. Contact Form Submission Toast ---
  const contactForm = document.getElementById('contact-form');
  const toastMsg = document.getElementById('toast-msg');

  if (contactForm && toastMsg) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Please fill out all required fields before submitting.');
        return;
      }

      toastMsg.style.display = 'block';
      toastMsg.innerHTML = `Thank you, ${nameInput.value.trim()}! Your message is received. Since this portfolio is previewed locally without a live backend, you can also reach Ritika directly at the contact channels on the left.`;

      contactForm.reset();

      setTimeout(() => {
        toastMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);

      setTimeout(() => {
        toastMsg.style.display = 'none';
      }, 9000);
    });
  }

  // --- 14. Smooth Scroll to Top ---
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 15. Signature Hero Circular Orbit 3D Tilt & Tooltip ---
  const orbitStage = document.getElementById('hero-orbit-stage');
  const orbitCarousel = document.getElementById('hero-orbit-carousel');
  const orbitTooltip = document.getElementById('orbit-tooltip-pill');

  if (orbitStage) {
    // Subtle 3D perspective mouse tilt on desktop
    orbitStage.addEventListener('mousemove', (e) => {
      const rect = orbitStage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 14;
      const rotateY = (x / rect.width) * 14;

      orbitStage.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    orbitStage.addEventListener('mouseleave', () => {
      orbitStage.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
      if (orbitTooltip) {
        orbitTooltip.classList.remove('visible');
      }
    });

    // Orbit Satellite Interactive Hover Highlights
    const satellites = orbitStage.querySelectorAll('.orbit-satellite');
    satellites.forEach(sat => {
      sat.addEventListener('mouseenter', () => {
        const caption = sat.getAttribute('data-caption') || sat.getAttribute('data-label') || 'Portfolio Highlight';
        if (orbitTooltip) {
          orbitTooltip.innerHTML = `<span>${caption}</span>`;
          orbitTooltip.classList.add('visible');
        }
      });

      sat.addEventListener('mouseleave', () => {
        if (orbitTooltip) {
          orbitTooltip.classList.remove('visible');
        }
      });
    });
  }

  // --- 16. Photography Lightbox (Fullscreen Interactive Gallery) ---
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption-bar');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  function openLightbox(src, caption) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Ritika Kiradoo Portfolio Photograph';
    if (lightboxCaption) {
      lightboxCaption.innerHTML = caption || 'Ritika Kiradoo &bull; Portfolio Highlight';
    }
    lightboxModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (lightboxImg) lightboxImg.src = '';
    }, 350);
  }

  // Bind all elements with [data-lightbox]
  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = el.getAttribute('data-lightbox');
      const caption = el.getAttribute('data-caption');
      if (src) {
        openLightbox(src, caption);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('open')) {
      closeLightbox();
    }
  });

  // --- 17. Magnetic Button Micro-Interaction ---
  const magneticTargets = document.querySelectorAll('.btn-primary, .hero-social-btn');
  if (window.matchMedia('(pointer: fine)').matches) {
    magneticTargets.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }
});
