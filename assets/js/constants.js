// Config
const HOK_CONFIG = {
  // Scroll thresholds
  SCROLL_OFFSET: 200,
  HEADER_SCROLL_THRESHOLD: 100,

  // Animation timings (ms)
  ANIMATION: {
    STAGGER_DELAY: 80,
    BAR_STAGGER: 100,
    BAR_COUNTER_DURATION: 2000,
    TIMELINE_HIDE_DELAY: 400,
    AOS_DURATION: 1000,
  },

  // Slider configurations
  SLIDER: {
    AUTOPLAY_DELAY: 5000,
    PORTFOLIO_SPEED: 400,
    TESTIMONIALS_SPEED: 600,
    SPACE_BETWEEN: 20,
  },

  // Bar chart scale (5 = 100%)
  BAR_MAX_VALUE: 5,
};

Object.freeze(HOK_CONFIG);
Object.freeze(HOK_CONFIG.ANIMATION);
Object.freeze(HOK_CONFIG.SLIDER);
