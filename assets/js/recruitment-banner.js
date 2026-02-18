
(function () {
  'use strict';

  // --- CONFIG (csak ezt kell szerkeszteni) ---
  const RECRUITMENT = {
    enabled: false,
    applyUrl: 'https://forms.cloud.microsoft/pages/responsepage.aspx?id=uAHd-HZyzkqqnVdn8PSlr4kxfb5v2ttAoKPhI7QECNFUNklFQVgyQzRXOTRYRTM5TldMR1U0NDJZSi4u&origin=lprLink&route=shorturl',
    infoUrl: 'tagfelvetel.html',
    period: {
      hu: '2026. 02. 25. – 2026. 03. 10.',
      en: 'Feb 25 – Mar 10, 2026',
    },
  };
  // --- CONFIG VEGE ---

  function initRecruitmentBanner() {
    if (!RECRUITMENT.enabled) return;

    const slot = document.getElementById('tagfelvetel-banner-slot');
    if (!slot) return;

    const lang = document.documentElement.lang || 'hu';
    const isEn = lang.startsWith('en');

    const title = isEn ? 'Join Us!' : 'Csatlakozz hozzánk!';
    const subtitle = isEn ? 'HÖK is recruiting new members' : 'Legyél te is Hökös!';
    const periodLabel = isEn ? 'Application period' : 'Jelentkezési időszak';
    const period = isEn ? RECRUITMENT.period.en : RECRUITMENT.period.hu;
    const btnApply = isEn ? 'Apply Now' : 'Jelentkezem';
    const btnInfo = isEn ? 'Learn More' : 'Tudj meg többet';
    const infoUrl = isEn ? RECRUITMENT.infoUrl.replace('.html', '_en.html') : RECRUITMENT.infoUrl;

    slot.innerHTML = `
      <section class="tagfelvetel-banner-section">
        <div class="tagfelvetel-banner">
          <svg class="tagfelvetel-banner__wave tagfelvetel-banner__wave--top" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path d="M0,20 C200,0 400,40 600,20 C800,0 1000,40 1200,20 L1200,0 L0,0 Z" fill="rgba(255,255,255,0.03)"/>
          </svg>
          <div class="tagfelvetel-banner__decor tagfelvetel-banner__decor--1"></div>
          <div class="tagfelvetel-banner__decor tagfelvetel-banner__decor--2"></div>
          <div class="tagfelvetel-banner__decor tagfelvetel-banner__decor--3"></div>
          <div class="container">
            <div class="tagfelvetel-banner__content">
              <div class="tagfelvetel-banner__icon">
                <i class="ri-team-line"></i>
              </div>
              <div class="tagfelvetel-banner__text">
                <h3 class="tagfelvetel-banner__title">${title}</h3>
                <p class="tagfelvetel-banner__subtitle">${subtitle}</p>
                <p class="tagfelvetel-banner__details">
                  <i class="bi bi-calendar-event"></i> ${periodLabel}: ${period}
                </p>
              </div>
              <div class="tagfelvetel-banner__action">
                <a href="${RECRUITMENT.applyUrl}" class="tagfelvetel-banner__btn tagfelvetel-banner__btn--primary" target="_blank" rel="noopener noreferrer">
                  ${btnApply} <i class="bi bi-arrow-right"></i>
                </a>
                <a href="${infoUrl}" class="tagfelvetel-banner__btn tagfelvetel-banner__btn--outline" target="_blank" rel="noopener noreferrer">
                  ${btnInfo} <i class="bi bi-info-circle"></i>
                </a>
              </div>
            </div>
          </div>
          <svg class="tagfelvetel-banner__wave tagfelvetel-banner__wave--bottom" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z" fill="rgba(255,255,255,0.03)"/>
          </svg>
        </div>
      </section>
    `;
  }

  if (document.readyState === 'loading') {
    window.addEventListener('load', initRecruitmentBanner);
  } else {
    initRecruitmentBanner();
  }
})();
