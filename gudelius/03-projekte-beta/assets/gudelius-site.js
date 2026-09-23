document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const navlinks = document.getElementById('navlinks');
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  const mobileQuery = window.matchMedia('(max-width: 1000px)');

  if (menuBtn && navlinks) {
    menuBtn.addEventListener('click', () => {
      navlinks.classList.toggle('open');
    });

    navlinks.querySelectorAll('a:not(.nav-dropdown-toggle)').forEach((a) => {
      a.addEventListener('click', () => {
        navlinks.classList.remove('open');
        dropdowns.forEach((dropdown) => dropdown.classList.remove('open'));
      });
    });
  }

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', (event) => {
      if (!mobileQuery.matches) return;
      event.preventDefault();
      const willOpen = !dropdown.classList.contains('open');
      dropdowns.forEach((item) => item.classList.remove('open'));
      dropdown.classList.toggle('open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
    });
  });

  document.addEventListener('click', (event) => {
    if (!mobileQuery.matches || event.target.closest('.nav-dropdown')) return;
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('open');
      const toggle = dropdown.querySelector('.nav-dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('.service-card[data-href]').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) return;
      window.location.href = card.dataset.href;
    });
  });
});

function sendMail(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const body = `Name: ${name}\nE-Mail: ${email}\n\n${message}`;

  location.href =
    `mailto:jost@gudeliusvermessung.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
