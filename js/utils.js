const $ = id => document.getElementById(id);

const escapeHtml = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const faDate = d => d.toLocaleDateString('fa-IR-u-ca-persian', {year:'numeric', month:'long', day:'numeric'});
const faWeekday = d => d.toLocaleDateString('fa-IR', {weekday:'long'});

function todayISO() {
  const d = new Date();
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function makeStars(n) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 70 + 'vh';
    s.style.animationDelay = Math.random() * 3 + 's';
    s.style.transform = 'scale(' + (Math.random() * 1.6 + .4) + ')';
    document.body.appendChild(s);
  }
}

function rain(n) {
  const icons = ['💛', '✨', '💫', '🌙'];
  for (let i = 0; i < n; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    h.textContent = icons[i % icons.length];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.animationDelay = Math.random() * 1.5 + 's';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 6500);
  }
}
