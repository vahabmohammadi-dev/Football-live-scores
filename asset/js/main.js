// ============ داده‌های نمونه ============
const MATCHES = [
  {league:"ایتالیا",home:"یوونتوس",away:"میلان",scoreHome:2,scoreAway:1,date:"1403/09/15",status:"ended"},
  {league:"اسپانیا",home:"رئال مادرید",away:"بارسلونا",scoreHome:3,scoreAway:2,date:"1403/09/15",status:"ended"},
  {league:"انگلیس",home:"منچستر سیتی",away:"لیورپول",scoreHome:1,scoreAway:1,date:"1403/09/16",status:"ended"},
  {league:"آلمان",home:"بایرن مونیخ",away:"دورتموند",scoreHome:1,scoreAway:0,date:"امروز",status:"live",minute:67},
  {league:"ژاپن",home:"کاوازاکی",away:"یوکوهاما",scoreHome:1,scoreAway:1,date:"امروز",status:"live",minute:23},
  {league:"عربستان",home:"الهلال",away:"النصر",scoreHome:2,scoreAway:2,date:"امروز",status:"live",minute:78},
  {league:"فرانسه",home:"پاری سن ژرمن",away:"مارسی",scoreHome:4,scoreAway:0,date:"1403/09/18",status:"ended"},
  {league:"هلند",home:"آژاکس",away:"پی‌اس‌وی",scoreHome:2,scoreAway:3,date:"1403/09/18",status:"ended"},
  {league:"پرتغال",home:"پورتو",away:"بنفیکا",scoreHome:1,scoreAway:0,date:"1403/09/19",status:"ended"},
  {league:"امارات",home:"العین",away:"الشارجه",scoreHome:2,scoreAway:2,date:"1403/09/19",status:"ended"},
  {league:"قطر",home:"السد",away:"الدحیل",scoreHome:1,scoreAway:0,date:"1403/09/20",status:"ended"},
  {league:"کره",home:"اولسان",away:"جونبوک",scoreHome:2,scoreAway:1,date:"1403/09/21",status:"ended"},
  {league:"استرالیا",home:"ملبورن سیتی",away:"سیدنی",scoreHome:0,scoreAway:2,date:"1403/09/22",status:"ended"},
  {league:"بلژیک",home:"کلوب بروژ",away:"اندرلخت",scoreHome:2,scoreAway:0,date:"1403/09/22",status:"ended"},
  {league:"دوستانه",home:"ایران",away:"ژاپن",scoreHome:1,scoreAway:0,date:"1403/09/23",status:"ended"},
  {league:"اسپانیا",home:"اتلتیکو",away:"سویا",scoreHome:0,scoreAway:0,date:"فردا",status:"upcoming"},
  {league:"انگلیس",home:"آرسنال",away:"چلسی",scoreHome:0,scoreAway:0,date:"فردا",status:"upcoming"},
  {league:"ایتالیا",home:"اینتر",away:"ناپولی",scoreHome:0,scoreAway:0,date:"فردا",status:"upcoming"}
];

const LEAGUES = ['همه','ایتالیا','اسپانیا','انگلیس','فرانسه','آلمان','هلند','پرتغال','امارات','قطر','عربستان','کره','ژاپن','استرالیا','بلژیک','دوستانه'];

let VOTES = [
  {team:"رئال مادرید",count:0,logo:"👑"},
  {team:"بارسلونا",count:0,logo:"🔴"},
  {team:"منچستر یونایتد",count:0,logo:"😈"},
  {team:"لیورپول",count:0,logo:"🔴"},
  {team:"بایرن مونیخ",count:0,logo:"🔵"},
  {team:"پاری سن ژرمن",count:0,logo:"🗼"},
  {team:"یوونتوس",count:0,logo:"⚫"},
  {team:"آژاکس",count:0,logo:"⚪"}
];

const HALL = [
  {name:"لیونل مسی",country:"آرژانتین",era:"2004-اکنون",ach:"8 توپ طلا، قهرمان جام جهانی 2022",emoji:"🐐"},
  {name:"کریستیانو رونالدو",country:"پرتغال",era:"2002-اکنون",ach:"5 توپ طلا، برترین گلزن تاریخ",emoji:"🇵🇹"},
  {name:"پله",country:"برزیل",era:"1956-1977",ach:"3 جام جهانی، بهترین بازیکن قرن",emoji:"🇧🇷"},
  {name:"دیه‌گو مارادونا",country:"آرژانتین",era:"1976-1997",ach:"قهرمان جام جهانی 1986",emoji:"🇦🇷"},
  {name:"یوهان کرویف",country:"هلند",era:"1964-1984",ach:"3 توپ طلا، پایه‌گذار توتال فوتبال",emoji:"🇳🇱"},
  {name:"زین‌الدین زیدان",country:"فرانسه",era:"1989-2006",ach:"قهرمان جام جهانی 1998",emoji:"🇫🇷"},
  {name:"رونالدینیو",country:"برزیل",era:"1998-2015",ach:"توپ طلا 2005",emoji:"✨"},
  {name:"فرانتس بکن بائر",country:"آلمان",era:"1964-1983",ach:"قهرمان جام جهانی بازیکن و مربی",emoji:"🇩🇪"}
];

// ============ رندر ============
let currentLeague = 'همه';

function renderLeagues(){
  const c = document.getElementById('leagueFilters');
  c.innerHTML = LEAGUES.map(l => 
    `<button class="${l===currentLeague?'active':''}" onclick="setLeague('${l}')">${l}</button>`
  ).join('');
}

function setLeague(l){
  currentLeague = l;
  renderLeagues();
  renderMatches();
}

function matchCard(m, isLive=false){
  const statusText = m.status==='ended'?'پایان':m.status==='live'?`زنده ${m.minute||0}'`:'پیش‌رو';
  const score = m.status==='upcoming'?'-':`${m.scoreHome} - ${m.scoreAway}`;
  return `<div class="match-card ${isLive?'live-card':''}">
    <div class="match-league">
      <span>${m.league}</span>
      <span class="match-status ${m.status}">${statusText}</span>
    </div>
    <div class="match-teams">
      <span class="team-name">${m.home}</span>
      <span class="match-score">${score}</span>
      <span class="team-name">${m.away}</span>
    </div>
    <div class="match-date">📅 ${m.date}</div>
  </div>`;
}

function renderMatches(){
  const c = document.getElementById('matchesContainer');
  let list = MATCHES.filter(m => m.status !== 'live');
  if(currentLeague !== 'همه') list = list.filter(m => m.league === currentLeague);
  c.innerHTML = list.length ? list.map(m => matchCard(m)).join('') : '<p style="text-align:center;color:#888;padding:20px">مسابقه‌ای یافت نشد</p>';
}

function renderLive(){
  const live = MATCHES.filter(m => m.status === 'live');
  const sec = document.getElementById('liveSection');
  if(!live.length){ sec.style.display='none'; return; }
  sec.style.display = 'block';
  document.getElementById('liveContainer').innerHTML = live.map(m => matchCard(m, true)).join('');
}

function renderVotes(){
  document.getElementById('votesList').innerHTML = VOTES.map((v,i) => `
    <div class="vote-item">
      <span class="vote-team">${v.logo} ${v.team}</span>
      <span class="vote-count">${v.count}</span>
      <button class="btn-vote" onclick="vote(${i})">رای</button>
    </div>
  `).join('');
}

function vote(i){
  VOTES[i].count++;
  renderVotes();
}

function renderHall(){
  document.getElementById('hallList').innerHTML = HALL.map(p => `
    <div class="vote-item" style="flex-direction:column;align-items:flex-start;gap:5px">
      <div style="font-weight:bold;font-size:1rem">${p.emoji} ${p.name}</div>
      <div style="font-size:.8rem;color:#666">${p.country} • ${p.era}</div>
      <div style="font-size:.8rem;color:var(--primary)">🏆 ${p.ach}</div>
    </div>
  `).join('');
}

// ============ اسلایدر ============
let sliderIdx = 0;
function updateSlider(){
  document.getElementById('sliderTrack').style.transform = `translateX(${sliderIdx * 100}%)`;
}
document.getElementById('nextBtn').onclick = () => {
  sliderIdx = (sliderIdx + 1) % 5; updateSlider();
};
document.getElementById('prevBtn').onclick = () => {
  sliderIdx = (sliderIdx - 1 + 5) % 5; updateSlider();
};
setInterval(() => { sliderIdx = (sliderIdx + 1) % 5; updateSlider(); }, 4000);

// ============ شبیه‌سازی نتایج زنده ============
setInterval(() => {
  MATCHES.forEach(m => {
    if(m.status === 'live'){
      if(Math.random() > 0.7) m.minute = Math.min(90, (m.minute||0)+1);
      if(Math.random() > 0.92){
        if(Math.random() > 0.5) m.scoreHome++;
        else m.scoreAway++;
      }
      if(m.minute >= 90) m.status = 'ended';
    }
  });
  renderLive();
  renderMatches();
}, 5000);

// ============ لاگین ============
let isRegister = false;
let currentUser = null;

const modal = document.getElementById('loginModal');
document.getElementById('loginBtn').onclick = () => modal.classList.add('show');
document.getElementById('closeModal').onclick = () => modal.classList.remove('show');

document.getElementById('switchAuth').onclick = (e) => {
  e.preventDefault();
  isRegister = !isRegister;
  document.getElementById('modalTitle').textContent = isRegister ? 'ثبت‌نام' : 'ورود به حساب';
  document.getElementById('submitAuth').textContent = isRegister ? 'ثبت‌نام' : 'ورود';
  document.getElementById('switchText').textContent = isRegister ? 'حساب داری؟' : 'حساب نداری؟';
  document.getElementById('switchAuth').textContent = isRegister ? 'وارد شو' : 'ثبت‌نام کن';
  document.getElementById('modalMsg').textContent = '';
};

document.getElementById('submitAuth').onclick = () => {
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value.trim();
  const msg = document.getElementById('modalMsg');
  if(!u || !p){ msg.className='msg error'; msg.textContent='لطفاً همه فیلدها را پر کن'; return; }
  if(p.length < 4){ msg.className='msg error'; msg.textContent='رمز حداقل ۴ کاراکتر'; return; }
  
  // ذخیره در localStorage
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if(isRegister){
    if(users[u]){ msg.className='msg error'; msg.textContent='نام کاربری تکراری است'; return; }
    users[u] = p;
    localStorage.setItem('users', JSON.stringify(users));
    msg.className='msg success'; msg.textContent='ثبت‌نام موفق! خوش آمدی';
  } else {
    if(!users[u] || users[u] !== p){ msg.className='msg error'; msg.textContent='نام کاربری یا رمز اشتباه'; return; }
    msg.className='msg success'; msg.textContent='ورود موفق!';
  }
  currentUser = u;
  localStorage.setItem('currentUser', u);
  setTimeout(() => { modal.classList.remove('show'); updateAuthUI(); }, 700);
};

function updateAuthUI(){
  const u = localStorage.getItem('currentUser');
  currentUser = u;
  document.getElementById('userInfo').textContent = u ? `👤 ${u}` : '';
  document.getElementById('loginBtn').style.display = u ? 'none' : 'inline-block';
  document.getElementById('logoutBtn').style.display = u ? 'inline-block' : 'none';
}

document.getElementById('logoutBtn').onclick = () => {
  localStorage.removeItem('currentUser');
  updateAuthUI();
};

// ============ اجرا ============
renderLeagues();
renderMatches();
renderLive();
renderVotes();
renderHall();
updateAuthUI();