
// Clock
function updateClock(){
  const el = document.getElementById('clock');
  if(!el) return;
  el.textContent = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}
setInterval(updateClock, 1000); updateClock();

// Gov banner
const govT = document.getElementById('gov-toggle');
if(govT){
  govT.addEventListener('click', ()=>{
    document.getElementById('gov-info').classList.toggle('open');
  });
}

// Weather popover
const wxBtn = document.getElementById('weatherBtn');
const wxPanel = document.getElementById('weatherPanel');
if(wxBtn && wxPanel){
  wxBtn.addEventListener('click', ()=> wxPanel.classList.toggle('open'));
}

// Units
let unit = 'F';
const uF = document.getElementById('uF'), uC = document.getElementById('uC');
function setUnit(u){
  unit = u;
  if(uF&&uC){
    uF.classList.toggle('active', u==='F');
    uC.classList.toggle('active', u==='C');
  }
  document.getElementById('wx-meta').textContent = 'Unit: °' + u;
}
if(uF) uF.addEventListener('click', ()=> setUnit('F'));
if(uC) uC.addEventListener('click', ()=> setUnit('C'));
setUnit('F');

// Mock Weather
(function loadWeather(){
  const f = document.getElementById('wx-forecast');
  const d = document.getElementById('wx-daily');
  const place = document.getElementById('wx-place');
  if(place) place.textContent = 'Your area';
  if(f){
    f.innerHTML = ['Now','+3h','+6h','+9h'].map((t,i)=>`
      <div class="tile glass" style="text-align:center">
        <div class="glyph">☁️</div>
        <div>${t}</div>
        <div><strong>${68 + i}°</strong></div>
      </div>`).join('');
  }
  if(d){
    d.innerHTML = ['Mon','Tue','Wed'].map((t,i)=>`
      <div class="tile glass" style="justify-content:center">${t}&nbsp;—&nbsp;${70+i}°</div>`).join('');
  }
})();

// Chart (small)
(function drawChart(){
  const c = document.getElementById('approvalChart');
  if(!c || typeof Chart==='undefined') return;
  const ctx = c.getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
      datasets: [{
        label: 'Approval',
        data: [42, 43, 44, 43, 45, 44, 46],
        borderColor: '#007aff',
        backgroundColor: 'rgba(0,122,255,.12)',
        tension:.35,
        fill:true,
        pointRadius:0
      }]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{x:{display:false}, y:{display:false}}
    }
  });
})();

// Market mock
(function loadMarket(){
  const el = document.getElementById('market');
  if(!el) return;
  const data = [
    {name:'Cattle', price:1.23},
    {name:'Hogs', price:0.98},
    {name:'Poultry', price:1.75}
  ];
  el.innerHTML = data.map(d=>`
    <div class="cardlet">
      <div><strong>${d.name}</strong></div>
      <div>$${d.price.toFixed(2)}/lb</div>
    </div>`).join('');
})();

// Congress (fallback without API key)
async function buildCongress(){
  const tbody = document.querySelector('#congressTable tbody');
  const note = document.getElementById('congressNote');
  if(!tbody) return;
  // Fallback
  tbody.innerHTML = '<tr><td>Use House/Senate directories for live members.</td><td></td><td></td><td></td><td></td><td></td><td><a class="profile-link" href=\"https://www.senate.gov/senators/\" target=\"_blank\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M7 17L17 7M7 7h10v10\"/></svg></a></td></tr>';
}

// Filters (wired to fallback content)
function initFilters(){
  const tbody=document.querySelector('#congressTable tbody');
  if(!tbody) return;
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('year').textContent = new Date().getFullYear();
  buildCongress();
  initFilters();
});
