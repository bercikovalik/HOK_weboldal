// ============================================================
// Valasztas Banner
// Ki/be kapcsolas: enabled → true / false
// Uj felev: applyUrl, infoUrl es period frissitese
// ============================================================
(function () {
  'use strict';

  // --- CONFIG (csak ezt kell szerkeszteni) ---
  const ELECTION = {
    enabled: true,
    infoUrl: 'valasztas.html',
    period: {
      hu: '2026. 04. 02. - 2026. 05. 16.',
      en: 'Apr 2 - May 16, 2026',
    },
  };
  // --- CONFIG VEGE ---

  function initElectionBanner() {
    if (!ELECTION.enabled) return;

    const slot = document.getElementById('lead-banner-slot');
    if (!slot) return;

    const lang = document.documentElement.lang || 'hu';
    const isEn = lang.startsWith('en');

    const title = isEn ? 'Information about Elections' : 'Választási információk';
    const subtitle = isEn ? 'Get to know more about Students\' Union Delegates Assembly election!' : 'Tudj meg többet a következő Küldöttgyűlés Választásról!';
    const periodLabel = isEn ? 'Election period' : 'Választási időszak';
    const period = isEn ? ELECTION.period.en : ELECTION.period.hu;
    const btnInfo = isEn ? 'Learn More' : 'Információk';
    const infoUrl = isEn ? ELECTION.infoUrl.replace('.html', '_en.html') : ELECTION.infoUrl;

    slot.innerHTML = `
      <section class="lead-banner-section">
        <div class="lead-banner">
          <svg class="lead-banner__wave lead-banner__wave--top" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path d="M0,20 C200,0 400,40 600,20 C800,0 1000,40 1200,20 L1200,0 L0,0 Z" fill="rgba(255,255,255,0.03)"/>
          </svg>
          <div class="lead-banner__decor lead-banner__decor--1"></div>
          <div class="lead-banner__decor lead-banner__decor--2"></div>
          <div class="lead-banner__decor lead-banner__decor--3"></div>
          <div class="container">
            <div class="lead-banner__content">
              <div class="lead-banner__icon">
                <i class="ri-team-line"></i>
              </div>
              <div class="lead-banner__text">
                <h3 class="lead-banner__title">${title}</h3>
                <p class="lead-banner__subtitle">${subtitle}</p>
                <p class="lead-banner__details">
                  <i class="bi bi-calendar-event"></i> ${periodLabel}: ${period}
                </p>
              </div>
              <div class="lead-banner__action">
                <a href="${infoUrl}" class="lead-banner__btn lead-banner__btn--primary" target="_blank" rel="noopener noreferrer">
                  ${btnInfo} <i class="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
          <svg class="lead-banner__wave lead-banner__wave--bottom" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z" fill="rgba(255,255,255,0.03)"/>
          </svg>
        </div>
      </section>
    `;
  }

  if (document.readyState === 'loading') {
    window.addEventListener('load', initElectionBanner);
  } else {
    initElectionBanner();
  }
})();
