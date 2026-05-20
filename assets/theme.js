document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.mobile-menu-toggle');
  var menu = document.querySelector('[data-menu]');
  var dropdowns = document.querySelectorAll('[data-dropdown]');
  var revealItems = document.querySelectorAll('.reveal-on-scroll');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (toggle.getAttribute('aria-expanded') === 'true') {
          toggle.setAttribute('aria-expanded', 'false');
          toggle.classList.remove('open');
          menu.classList.remove('open');
        }

        dropdowns.forEach(function (dropdown) {
          var submenuToggle = dropdown.querySelector('.submenu-toggle');
          if (dropdown.classList.contains('open')) {
            dropdown.classList.remove('open');
          }
          if (submenuToggle) {
            submenuToggle.setAttribute('aria-expanded', 'false');
          }
        });
      });
    });
  }

  dropdowns.forEach(function (dropdown) {
    var submenuToggle = dropdown.querySelector('.submenu-toggle');

    if (!submenuToggle) {
      return;
    }

    submenuToggle.addEventListener('click', function () {
      var expanded = submenuToggle.getAttribute('aria-expanded') === 'true';
      submenuToggle.setAttribute('aria-expanded', String(!expanded));
      dropdown.classList.toggle('open');
    });
  });

  var popup = document.querySelector('[data-popup]');
  var popupClose = document.querySelector('.promo-popup-close');

  if (popup) {
    var delay = parseInt(popup.dataset.popupDelay, 10) || 3;
    var repeatDays = parseInt(popup.dataset.popupRepeatDays, 10) || 7;
    var popupKey = 'shopify_popup_dismissed';
    var dismissedUntil = localStorage.getItem(popupKey);
    var now = Date.now();

    function openPopup() {
      popup.classList.add('open');
      popup.setAttribute('aria-hidden', 'false');
    }

    function closePopup() {
      popup.classList.remove('open');
      popup.setAttribute('aria-hidden', 'true');
      localStorage.setItem(popupKey, String(now + repeatDays * 24 * 60 * 60 * 1000));
    }

    if (!dismissedUntil || now > Number(dismissedUntil)) {
      setTimeout(openPopup, delay * 1000);
    }

    if (popupClose) {
      popupClose.addEventListener('click', closePopup);
    }

    popup.addEventListener('click', function (event) {
      if (event.target === popup) {
        closePopup();
      }
    });
  }

  if ('IntersectionObserver' in window && revealItems.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18
    });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('revealed');
    });
  }

  var countdowns = document.querySelectorAll('[data-countdown]');

  function updateCountdown(el) {
    var target = new Date(el.getAttribute('data-countdown'));
    var now = new Date();
    var diff = target - now;

    if (isNaN(target.getTime()) || diff <= 0) {
      el.querySelector('.countdown-message').textContent = 'Offer ended';
      el.querySelector('.countdown-grid').style.display = 'none';
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((diff / (1000 * 60)) % 60);
    var seconds = Math.floor((diff / 1000) % 60);

    el.querySelector('[data-countdown-days]').textContent = days;
    el.querySelector('[data-countdown-hours]').textContent = hours;
    el.querySelector('[data-countdown-minutes]').textContent = minutes;
    el.querySelector('[data-countdown-seconds]').textContent = seconds;
  }

  if (countdowns.length) {
    countdowns.forEach(function (timer) {
      updateCountdown(timer);
      setInterval(function () {
        updateCountdown(timer);
      }, 1000);
    });
  }
});