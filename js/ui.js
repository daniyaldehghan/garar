let typer;

function typeText(text) {
  clearInterval(typer);
  const q = $('q');
  q.textContent = '';
  let i = 0;
  typer = setInterval(() => {
    q.textContent = text.slice(0, ++i);
    if (i >= text.length) clearInterval(typer);
  }, 25);
}

// ورودی متن/تاریخ؛ بلافاصله نمایش داده می‌شود (بدون انتظار برای تایپ سؤال)
function showInput(kind, placeholder, onSubmit, opts = {}) {
  const area = $('area');
  area.innerHTML = '';
  const field = document.createElement('input');
  field.type = kind;
  field.placeholder = placeholder || '';
  if (opts.min) field.min = opts.min;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'go';
  btn.textContent = opts.optional ? 'ثبت کن ✍️ (یا رد شو)' : 'ثبت کن ✍️';

  const submit = () => {
    const v = field.value.trim();
    if (!v && !opts.optional) { field.focus(); return; }
    onSubmit(v);
  };
  btn.addEventListener('click', submit);
  field.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); submit(); }
  });
  area.append(field, btn);
  field.focus();
}

function showChoices(list, onPick) {
  const area = $('area');
  area.innerHTML = '';
  list.forEach(text => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = text;
    b.addEventListener('click', () => onPick(text));
    area.appendChild(b);
  });
}

// دکمه‌ی «نه» که فرار می‌کند 😄
function showInvite(onYes) {
  const area = $('area');
  area.innerHTML = '';
  const yes = document.createElement('button');
  yes.type = 'button';
  yes.className = 'go';
  yes.textContent = 'آره، حتماً 💛';
  const no = document.createElement('button');
  no.type = 'button';
  no.id = 'no';
  no.textContent = 'نه 🙈';

  const msgs = ['نه 🙈', 'مطمئنی؟ 🥺', 'فکرشو بکن…', 'بگیرش بچه! 😄', 'دیگه نمی‌تونی بگی نه'];
  let tries = 0;
  const dodge = e => {
    e.preventDefault();
    tries++;
    no.textContent = msgs[Math.min(tries, msgs.length - 1)];
    no.style.transform = `translate(${(Math.random() - .5) * 160}px, ${(Math.random() - .5) * 60}px)`;
    yes.style.transform = `scale(${Math.min(1 + tries * .12, 1.7)})`;
  };
  ['mouseenter', 'touchstart', 'click'].forEach(ev => no.addEventListener(ev, dodge));
  yes.addEventListener('click', () => { rain(14); onYes(); });
  area.append(yes, no);
}
