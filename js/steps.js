// جواب‌ها اینجا ذخیره می‌شوند
const state = {};

// هر مرحله: ask() متن سؤال، render(next) رابط جواب‌دادن
const STEPS = [
  {
    ask: () => 'سلام! اول بگو اسمت چیه؟',
    render: next => showInput('text', 'اسمت…', v => { state.name = v; next(); })
  },
  {
    ask: () => `${state.name} جان، دلم می‌خواد یه قرار باهم بذاریم. قبوله؟`,
    render: next => showInvite(next)
  },
  {
    ask: () => 'عالیه! کدوم روز برات خوبه؟',
    render: next => showInput('date', '', v => { state.date = v; next(); }, { min: todayISO() })
  },
  {
    ask: () => 'چه موقع از روز؟',
    render: next => showChoices(['☀️ صبح', '🌤️ بعدازظهر', '🌆 عصر', '🌙 شب'], v => { state.time = v; next(); })
  },
  {
    ask: () => 'کجا بریم؟',
    render: next => showChoices(['☕ کافه', '🌳 پارک', '🎬 سینما', '🍕 رستوران', '🚶 پیاده‌روی'], v => { state.place = v; next(); })
  },
  {
    ask: () => 'یه چیز دوست‌داشتنی که بخوریم یا بنوشیم؟',
    render: next => showInput('text', 'مثلاً شکلات داغ…', v => { state.treat = v; next(); })
  },
  {
    ask: () => 'یه پیام کوچولو برای من؟ (اختیاریه)',
    render: next => showInput('text', 'پیامت…', v => { state.msg = v; next(); }, { optional: true })
  }
];
