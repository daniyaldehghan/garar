let stepIndex = 0;

function updateDots() {
  $('dots').textContent = '● '.repeat(stepIndex) + '○ '.repeat(STEPS.length - stepIndex);
}

function next() {
  if (stepIndex >= STEPS.length) return finish();
  const step = STEPS[stepIndex++];
  updateDots();
  typeText(step.ask());
  step.render(next);
}

function finish() {
  clearInterval(typer);
  const d = new Date(state.date + 'T12:00:00');
  const wd = faWeekday(d);
  const time = state.time.replace(/^\S+\s/, '');
  $('dots').textContent = '';
  $('q').textContent = '';
  $('area').style.display = 'block';
  $('area').innerHTML = `
    <div class="final">
      عزیزِ دلم ${escapeHtml(state.name)}،<br>قرار شد
      <span class="big">${wd} ${faDate(d)}</span>
      ${time} · ${state.place}،<br>با ${escapeHtml(state.treat)} 💫<br>
      ${state.msg ? `<br>پیامت هم تو دفترچه موند: «${escapeHtml(state.msg)}»<br>` : ''}
      <br>همین‌جا ثبتش کردم؛ پس <b>${wd}</b> می‌بینمت! 🌙
      <div class="sign">— با عشق، تو دفترچه‌م ✍️</div>
    </div>`;
  rain(30);
}

document.addEventListener('DOMContentLoaded', () => {
  makeStars(90);
  $('today').textContent = 'امشب · ' + new Date().toLocaleDateString('fa-IR-u-ca-persian', {weekday:'long', year:'numeric', month:'long', day:'numeric'});
  next();
});
