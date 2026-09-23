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
  const equipmentSummary = document.getElementById('equipmentModalSummary');
  const equipmentGallery = document.getElementById('equipmentModalGallery');

  const equipmentData = {
    aussendienst: {
      kicker: 'Außendienst',
      title: 'Präzise Messtechnik vor Ort.',
      lead: 'Für Absteckung, Kontrolle, Bestandsaufnahme und klassische Vermessungsaufgaben stehen unterschiedliche Messsysteme zur Verfügung.',
      summary: 'Jedes Gerät erhält später sein eigenes Originalfoto. Hier siehst du bereits die Wirkung mit vier unterschiedlichen Platzhalterbildern.',
      devices: [
        { name:'Trimble SX12', detail:'Totalstation & Scanning', image:'assets/equipment-trimble-sx12.svg' },
        { name:'Trimble S6', detail:'Robotik-Totalstation', image:'assets/equipment-trimble-s6.svg' },
        { name:'Trimble R2 GNSS', detail:'Satellitenpositionierung', image:'assets/equipment-trimble-r2.svg' },
        { name:'Trimble DINI 07', detail:'Digitalnivellement', image:'assets/equipment-trimble-dini07.svg' }
      ]
    },
    digital: {
      kicker: '3D & Drohne',
      title: 'Digitale Erfassung aus Boden und Luft.',
      lead: '3D-Laserscanning und drohnengestützte Aufnahme ergänzen die klassische Vermessung bei komplexen Beständen und größeren Flächen.',
      summary: 'Die unterschiedlichen Bildwelten zeigen später Scanner, Drohne, Kamera und Auswertung jeweils als eigenes Motiv.',
      devices: [
        { name:'Trimble TX8', detail:'3D-Laserscanner', image:'assets/equipment-trimble-tx8.svg' },
        { name:'RTK-Drohne', detail:'Luftbild & Vermessung', image:'assets/equipment-rtk-drohne.svg' },
        { name:'Infrarotkamera', detail:'Thermische Bildaufnahme', image:'assets/equipment-infrarotkamera.svg' },
        { name:'Photogrammetrie', detail:'Digitale Bildauswertung', image:'assets/equipment-photogrammetrie.svg' }
      ]
    },
    software: {
      kicker: 'Programme & mobil',
      title: 'Auswertung dort, wo die Daten gebraucht werden.',
      lead: 'Messdaten werden mit passenden CAD-, Punktwolken- und Photogrammetrie-Werkzeugen ausgewertet und für die weitere Projektbearbeitung aufbereitet.',
      summary: 'Auch Software und mobiler Workflow bekommen getrennte Bildmotive, damit die Karten nicht wie eine wiederholte Bildserie wirken.',
      devices: [
        { name:'BricsCAD', detail:'CAD-Bearbeitung', image:'assets/equipment-bricscad.svg' },
        { name:'BBSOFT', detail:'Vermessung & Auswertung', image:'assets/equipment-bbsoft.svg' },
        { name:'Trimble RealWorks', detail:'Punktwolken-Auswertung', image:'assets/equipment-realworks.svg' },
        { name:'Agisoft Metashape', detail:'Photogrammetrie', image:'assets/equipment-metashape.svg' }
      ]
    }
  };
  function openEquipmentModal(key) {
    if (!equipmentModal || !equipmentData[key]) return;
    const data = equipmentData[key];

    equipmentKicker.textContent = data.kicker;
    equipmentTitle.textContent = data.title;
    equipmentLead.textContent = data.lead;
    equipmentSummary.textContent = data.summary;
    equipmentGallery.innerHTML = data.devices
      .map((device) => `
        <article class="equipment-device-card">
          <img src="${device.image}" alt="${device.name} Platzhalterbild">
          <div class="equipment-device-copy">
            <strong>${device.name}</strong>
            <span>${device.detail}</span>
          </div>
        </article>
      `)
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
