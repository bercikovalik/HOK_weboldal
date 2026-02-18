// Esemenynaptar timeline

(function () {
  'use strict';

  let eventsData = null;
  let currentLanguage = 'hu';

  // Nyelv detektalas
  function detectLanguage() {
    const path = window.location.pathname;
    return path.includes('index_en.html') ? 'en' : 'hu';
  }

  // JSON betoltes
  async function loadEventsData() {
    try {
      const response = await fetch('assets/data/events-calendar.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      eventsData = await response.json();
      return eventsData;
    } catch (error) {
      console.error('Hiba az események betöltésekor:', error);
      return null;
    }
  }

  // Datum hasonlitas
  function compareDates(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return d1.getTime() - d2.getTime();
  }

  // Mai datum
  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // Esemeny statusz
  function getEventStatus(event) {
    const today = getTodayDate();
    const eventEndDate = event.endDate || event.date;

    if (compareDates(eventEndDate, today) < 0) {
      return 'past';
    }
    return 'upcoming';
  }

  // Kovetkezo esemeny
  function findNextEvent(events) {
    const today = getTodayDate();

    for (const event of events) {
      const eventEndDate = event.endDate || event.date;
      if (compareDates(eventEndDate, today) >= 0) {
        return event.id;
      }
    }

    return null;
  }

  // Datum format
  function formatDate(dateString) {
    return dateString.replace(/-/g, '.');
  }

  // Nap neve
  function getDayName(dateString, lang) {
    const date = new Date(dateString);
    const daysHu = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
    const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const days = lang === 'en' ? daysEn : daysHu;
    return days[date.getDay()];
  }

  // Kategoria kereso
  function getCategoryById(categoryId) {
    if (!eventsData || !eventsData.categories) {
      return null;
    }
    return eventsData.categories.find((cat) => cat.id === categoryId);
  }

  // Timeline render
  function renderTimeline(filteredEvents) {
    const container = document.getElementById('events-timeline-container');
    if (!container) {
      return;
    }

    const nextEventId = findNextEvent(filteredEvents);
    const lang = currentLanguage;

    let html = '';

    filteredEvents.forEach((event, index) => {
      const status = getEventStatus(event);
      const isNext = event.id === nextEventId;
      const category = getCategoryById(event.category);
      const categoryColor = category ? category.color : '#666';

      // Nyelv
      const title = lang === 'en' ? event.titleEn : event.title;
      const description = lang === 'en' ? event.descriptionEn : event.description;
      const location = lang === 'en' ? event.locationEn : event.location;

      // Datum
      let dateDisplay = formatDate(event.date);
      if (event.endDate) {
        dateDisplay += ' - ' + formatDate(event.endDate);
      }

      // Kor tipus
      const circleClass = isNext ? 'timeline-circle-filled' : 'timeline-circle-normal';

      // Link
      const hasLink = event.link && event.link.trim() !== '';
      const linkStart = hasLink ? `<a href="${event.link}" class="event-link" target="_blank" rel="noopener noreferrer">` : '';
      const linkEnd = hasLink ? '</a>' : '';

      html += `
        <div class="timeline-event" data-category="${event.category}" data-status="${status}">
          <div class="timeline-marker">
            <div class="timeline-circle ${circleClass}" style="border-color: ${categoryColor}; background-color: ${categoryColor};"></div>
          </div>
          <div class="timeline-content" style="color: ${categoryColor};">
            <div class="event-date-title">
              ${linkStart}
              <span class="event-date">${dateDisplay}</span>
              <span class="event-title-text"> - ${title}</span>
              ${linkEnd}
            </div>
            ${description ? `<div class="event-description">${description}</div>` : ''}
            ${location ? `<div class="event-meta"><span class="event-location">${location}</span></div>` : ''}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    animateTimelineItems(container);
  }

  // Stagger animacio
  function animateTimelineItems(container) {
    const items = container.querySelectorAll('.timeline-event');

    // Reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      items.forEach((item) => {
        item.classList.add('animate-in');
      });
      return;
    }

    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate-in');
      }, index * HOK_CONFIG.ANIMATION.STAGGER_DELAY);
    });
  }

  // Kategoria szures
  function filterEvents() {
    if (!eventsData || !eventsData.events) {
      return;
    }

    const checkboxes = document.querySelectorAll('.event-filter-checkbox');
    const selectedCategories = [];

    checkboxes.forEach((cb) => {
      if (cb.checked) {
        selectedCategories.push(cb.value);
      }
    });

    const container = document.getElementById('events-timeline-container');
    if (!container) {
      return;
    }

    // Nincs szuro
    if (selectedCategories.length === 0) {
      container.classList.add('timeline-hidden');
      setTimeout(() => {
        if (container.classList.contains('timeline-hidden')) {
          container.innerHTML = '';
        }
      }, HOK_CONFIG.ANIMATION.TIMELINE_HIDE_DELAY);
      return;
    }

    const filteredEvents = eventsData.events
      .filter((event) => selectedCategories.includes(event.category))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Rejtett megjelenit
    const wasHidden = container.classList.contains('timeline-hidden');

    renderTimeline(filteredEvents);

    if (wasHidden) {
      requestAnimationFrame(() => {
        container.classList.remove('timeline-hidden');
      });
    }
  }

  // Szuro rendereles
  function renderFilters() {
    const container = document.getElementById('events-filter-container');
    if (!container || !eventsData || !eventsData.categories) {
      return;
    }

    const lang = currentLanguage;
    let html = '';

    eventsData.categories.forEach((category) => {
      const name = lang === 'en' ? category.nameEn : category.name;
      html += `
        <label class="event-filter-label" style="--category-color: ${category.color};">
          <input type="checkbox" class="event-filter-checkbox" value="${category.id}" checked>
          <span class="filter-color-indicator"></span>
          <span class="filter-name">${name}</span>
        </label>
      `;
    });

    container.innerHTML = html;

    // Checkbox esemenyek
    const checkboxes = container.querySelectorAll('.event-filter-checkbox');
    checkboxes.forEach((cb) => {
      cb.addEventListener('change', filterEvents);
    });
  }

  // Init
  async function init() {
    currentLanguage = detectLanguage();

    const data = await loadEventsData();
    if (!data) {
      console.error('Nem sikerült betölteni az eseményeket');
      return;
    }

    renderFilters();
    filterEvents();
  }

  // DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
