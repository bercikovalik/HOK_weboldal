(function () {
  'use strict';

  // Selector helper
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  // Event listener helper
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  // Scroll listener
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  // Navbar aktiv allapot
  const navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    const position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      // Dropdown vagy direkt link
      const targetLink = navbarlink.classList.contains('dropdown')
        ? navbarlink.querySelector('a')
        : navbarlink;

      if (!targetLink.hash) {
        return;
      }
      const section = select(targetLink.hash);
      if (!section) {
        return;
      }

      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        if (navbarlink.classList.contains('dropdown')) {
          navbarlink.classList.add('active');
        } else {
          targetLink.classList.add('active');
        }
      } else {
        if (navbarlink.classList.contains('dropdown')) {
          navbarlink.classList.remove('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  // Aktiv nav aloldalakhoz
  const setActiveNavByPage = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = select('#navbar a', true);
    navLinks.forEach((link) => {
      const linkHref = link.getAttribute('href');
      if (linkHref && !linkHref.startsWith('#') && !linkHref.startsWith('http')) {
        const linkFilename = linkHref.split('#')[0];
        if (linkFilename === currentPage) {
          link.classList.add('active');
          const parentLi = link.closest('.dropdown');
          if (parentLi) parentLi.classList.add('active');
        }
      }
    });
  };
  window.addEventListener('load', setActiveNavByPage);

  // Scroll header offset-tel
  const scrollto = (el) => {
    const header = select('#header');
    const offset = header.offsetHeight;

    const elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth',
    });
  };

  // Header scroll allapot
  const selectHeader = select('#header');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

  // Vissza a tetejere gomb
  const backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  // Mobil nav toggle
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  // Mobil dropdown
  on(
    'click',
    '.navbar .dropdown > a',
    function (e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle('dropdown-active');
      }
    },
    true
  );

  // Dropdown menu kattintas
  on(
    'click',
    '.navbar .dropdown ul a',
    function (e) {
      // Osztondij link skip
      if (this.classList.contains('scholarship-nav-link')) {
        return;
      }

      // Hash target ellenorzes
      if (this.hash && select(this.hash)) {
        e.preventDefault();

        const navbar = select('#navbar');
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          const activeDropdowns = navbar.querySelectorAll('.dropdown-active');
          activeDropdowns.forEach((dd) => dd.classList.remove('dropdown-active'));
          const navbarToggle = select('.mobile-nav-toggle');
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }
        scrollto(this.hash);
      }
    },
    true
  );

  // Scrollto kattintas
  on(
    'click',
    '.scrollto',
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        const navbar = select('#navbar');
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          const activeDropdowns = navbar.querySelectorAll('.dropdown-active');
          activeDropdowns.forEach((dd) => dd.classList.remove('dropdown-active'));
          const navbarToggle = select('.mobile-nav-toggle');
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }
        scrollto(this.hash);
      }
    },
    true
  );

  // Hash scroll betolteskor
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  // Portfolio szuro
  window.addEventListener('load', () => {
    const portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      const portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
      });

      const portfolioFilters = select('#portfolio-flters li', true);

      on(
        'click',
        '#portfolio-flters li',
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');

          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter'),
          });
          portfolioIsotope.on('arrangeComplete', function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  // Portfolio lightbox
  if (typeof GLightbox !== 'undefined') {
    const portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox',
    });
  }

  // Portfolio slider
  if (typeof Swiper !== 'undefined') {
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    });

    // Testimonials slider
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },

        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  }

  // AOS init
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  });

  const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Szamlalo animacio
  const animateCounter = (element, target) => {
    const duration = HOK_CONFIG.ANIMATION.BAR_COUNTER_DURATION;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const currentValue = target * easeProgress;

      element.textContent = currentValue.toFixed(2);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  // Bar animacio
  const startBarAnimation = () => {
    const bars = document.querySelectorAll('.bar');

    bars.forEach((bar, index) => {
      if (!bar.querySelector('.count')) {
        const countSpan = document.createElement('span');
        countSpan.className = 'count';
        bar.appendChild(countSpan);
      }

      const countElement = bar.querySelector('.count');
      const targetValue = parseFloat(bar.dataset.percent);
      const percentageWidth = (targetValue / HOK_CONFIG.BAR_MAX_VALUE) * 100;

      setTimeout(() => {
        bar.style.width = `${percentageWidth}%`;
        animateCounter(countElement, targetValue);
      }, index * HOK_CONFIG.ANIMATION.BAR_STAGGER);
    });
  };

  let animated = false;

  const onScrollAnimateBars = () => {
    const barsSection = select('.wrap');
    if (barsSection && isInViewport(barsSection) && !animated) {
      startBarAnimation();
      animated = true;
    }
  };

  window.addEventListener('scroll', onScrollAnimateBars);
  window.addEventListener('load', onScrollAnimateBars);
})();
