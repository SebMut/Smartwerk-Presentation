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

  const equipmentModal = document.getElementById('equipmentModal');
  const equipmentClose = document.getElementById('equipmentModalClose');
  const equipmentTitle = document.getElementById('equipmentModalTitle');
  const equipmentKicker = document.getElementById('equipmentModalKicker');
  const equipmentLead = document.getElementById('equipmentModalLead');
  const equipmentList = document.getElementById('equipmentModalList');
  const equipmentGallery = document.getElementById('equipmentModalGallery');

  const equipmentData = {
    aussendienst: {
      kicker: 'Außendienst',
      title: 'Präzise Messtechnik vor Ort.',
      lead: 'Für Absteckung, Kontrolle, Bestandsaufnahme und klassische Vermessungsaufgaben stehen unterschiedliche Messsysteme zur Verfügung.',
      items: [
        ['Trimble SX12', 'Totalstation & Scanning'],
        ['Trimble S6', 'Robotik-Totalstation'],
        ['Trimble R2 GNSS', 'Satellitenpositionierung'],
        ['Trimble DINI 07', 'Digitalnivellement']
      ],
      images: [
        ['assets/dummy-aussendienst-01.svg', 'Platzhalterbild Außendienst'],
        ['assets/dummy-aussendienst-02.svg', 'Platzhalterbild Baustelleneinsatz']
      ]
    },
    digital: {
      kicker: '3D & Drohne',
      title: 'Digitale Erfassung aus Boden und Luft.',
      lead: '3D-Laserscanning und drohnengestützte Aufnahme ergänzen die klassische Vermessung bei komplexen Beständen und größeren Flächen.',
      items: [
        ['Trimble TX8', '3D-Laserscanner'],
        ['RTK-Drohne', 'Luftbild & Vermessung'],
        ['Infrarotkamera', 'Erweiterte Bildaufnahme'],
        ['Photogrammetrie', 'Digitale Auswertung']
      ],
      images: [
        ['assets/dummy-3d-01.svg', 'Platzhalterbild 3D-Laserscanning'],
        ['assets/dummy-3d-02.svg', 'Platzhalterbild Drohnenvermessung']
      ]
    },
    software: {
      kicker: 'Programme & mobil',
      title: 'Auswertung dort, wo die Daten gebraucht werden.',
      lead: 'Messdaten werden mit passenden CAD-, Punktwolken- und Photogrammetrie-Werkzeugen ausgewertet und für die weitere Projektbearbeitung aufbereitet.',
      items: [
        ['BricsCAD', 'CAD-Bearbeitung'],
        ['BBSOFT', 'Vermessung & Auswertung'],
        ['Trimble RealWorks', 'Punktwolken'],
        ['Agisoft Metashape', 'Photogrammetrie']
      ],
      images: [
        ['assets/dummy-software-01.svg', 'Platzhalterbild Auswertung'],
        ['assets/dummy-software-02.svg', 'Platzhalterbild mobiler Arbeitsplatz']
      ]
    }
  };

  function openEquipmentModal(key) {
    if (!equipmentModal || !equipmentData[key]) return;
    const data = equipmentData[key];

    equipmentKicker.textContent = data.kicker;
    equipmentTitle.textContent = data.title;
    equipmentLead.textContent = data.lead;
    equipmentList.innerHTML = data.items
      .map(([name, detail]) => `<li><strong>${name}</strong><span>${detail}</span></li>`)
      .join('');
    equipmentGallery.innerHTML = data.images
      .map(([src, alt]) => `<img src="${src}" alt="${alt}">`)
      .join('');

    equipmentModal.classList.add('open');
    equipmentModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    if (equipmentClose) equipmentClose.focus();
  }

  function closeEquipmentModal() {
    if (!equipmentModal) return;
    equipmentModal.classList.remove('open');
    equipmentModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('.equip-open[data-equipment]').forEach((card) => {
    card.addEventListener('click', () => openEquipmentModal(card.dataset.equipment));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openEquipmentModal(card.dataset.equipment);
      }
    });
  });

  if (equipmentClose) equipmentClose.addEventListener('click', closeEquipmentModal);

  if (equipmentModal) {
    equipmentModal.addEventListener('click', (event) => {
      if (event.target === equipmentModal) closeEquipmentModal();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && equipmentModal?.classList.contains('open')) {
      closeEquipmentModal();
    }
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
