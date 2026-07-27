// 1. Initialize Icons & Dynamic Year
lucide.createIcons();
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 2. Cursor Ambient Light Follower
const cursorLight = document.getElementById('cursor-light');
window.addEventListener('mousemove', (e) => {
  cursorLight.style.left = `${e.clientX}px`;
  cursorLight.style.top = `${e.clientY}px`;
});

// 3. Inertial Smooth Scrolling via Lenis
const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 4. Sector Tab Switching Data
const sectorData = {
  commercial: [
    { title: 'AHU & Chiller Plant Upkeep', desc: 'Predictive HVAC maintenance ensuring temperature regulation across multi-tenant IT towers.' },
    { title: 'High-Rise Façade Cleaning', desc: 'Certified rope-access teams for exterior glass and structural envelope cleaning.' },
    { title: 'BMS Monitoring', desc: 'Automated Building Management System operations to minimize power consumption.' }
  ],
  industrial: [
    { title: 'Heavy Equipment Sanitation', desc: 'Industrial-grade degreasing and cleaning for factory floors and manufacturing bays.' },
    { title: 'Hazardous Waste Management', desc: 'Strict adherence to environmental safety regulations for waste disposal.' },
    { title: 'High-Voltage Electrical Maintenance', desc: 'Dedicated HT substation engineering and transformer safety checks.' }
  ],
  residential: [
    { title: 'Clubhouse & Pool Operations', desc: 'Water chemistry balance, lifeguard staffing, and sports facility management.' },
    { title: 'Community Security Systems', desc: '24/7 gatekeeper monitoring, RFID vehicle tracking, and CCTV coverage.' },
    { title: 'Landscaping & Green Reserves', desc: 'Horticulture services maintaining community parks and flora.' }
  ]
};

function renderSector(sectorKey) {
  const container = document.getElementById('sector-content');
  const items = sectorData[sectorKey];
  
  container.innerHTML = items.map(item => `
    <div class="bg-gray-950/60 p-5 rounded-2xl border border-gray-800 space-y-2 animate-fadeIn">
      <div class="text-sm font-bold text-cyan-400">${item.title}</div>
      <div class="text-xs text-gray-400 leading-relaxed">${item.desc}</div>
    </div>
  `).join('');
}

// Render Default Sector
renderSector('commercial');

// Sector Tabs Click Listener
document.querySelectorAll('.sector-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sector-tab').forEach(b => {
      b.classList.remove('bg-cyan-500', 'text-black');
      b.classList.add('text-gray-400');
    });
    
    btn.classList.add('bg-cyan-500', 'text-black');
    btn.classList.remove('text-gray-400');
    
    renderSector(btn.getAttribute('data-sector'));
  });
});

// 5. Dynamic Staff Estimator Logic
const slider = document.getElementById('area-range');
const areaVal = document.getElementById('area-val');
const outStaff = document.getElementById('out-staff');
const outSupervisors = document.getElementById('out-supervisors');

slider.addEventListener('input', (e) => {
  const sqft = parseInt(e.target.value, 10);
  areaVal.textContent = sqft.toLocaleString() + ' Sq. Ft.';
  
  const staff = Math.max(4, Math.round(sqft / 9000));
  const supervisors = Math.max(1, Math.round(staff / 9));

  outStaff.textContent = staff;
  outSupervisors.textContent = supervisors;
});