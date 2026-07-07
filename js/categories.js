// Метаданные категорий: порядок в этом массиве = порядок в сайдбаре.
const CATEGORIES = [
  { id: 'kotlin',       name: 'Kotlin',       ext: '.kt',   badge: 'K',  color: '#c586c0' },
  { id: 'java',         name: 'Java',         ext: '.java', badge: 'J',  color: '#e8974f' },
  { id: 'android',      name: 'AndroidSDK',   ext: '.kt',   badge: 'A',  color: '#4ec9b0' },
  { id: 'viewxml',      name: 'ViewXML',      ext: '.kt',   badge: 'Vx', color: '#f14c4c' },
  { id: 'compose',      name: 'Compose',      ext: '.kt',   badge: 'Cp', color: '#569cd6' },
  { id: 'concurrency',  name: 'Concurrency',  ext: '.kt',   badge: 'Cc', color: '#9d7cd8' },
  { id: 'coroutines',   name: 'Coroutines',   ext: '.kt',   badge: 'Co', color: '#4fc1ff' },
  { id: 'flow',         name: 'Flow',         ext: '.kt',   badge: 'Fl', color: '#89d185' },
  { id: 'archpatterns', name: 'ArchPatterns', ext: '.kt',   badge: 'Ar', color: '#d7ba7d' },
  { id: 'cleancode',    name: 'CleanCode',    ext: '.kt',   badge: 'CL', color: '#ce9178' },
  { id: 'patterns',     name: 'Patterns',     ext: '.kt',   badge: 'P',  color: '#79b8ff' },
  { id: 'dagger',       name: 'Dagger',       ext: '.kt',   badge: 'D',  color: '#b180d7' },
  { id: 'hilt',         name: 'Hilt',         ext: '.kt',   badge: 'H',  color: '#dcdcaa' },
  { id: 'retrofit',     name: 'Retrofit',     ext: '.kt',   badge: 'Rt', color: '#73c991' },
  { id: 'room',         name: 'Room',         ext: '.kt',   badge: 'Rm', color: '#d19a66' },
  { id: 'rxjava',       name: 'RxJava',       ext: '.kt',   badge: 'Rx', color: '#ff79c6' },
  { id: 'systemdesign', name: 'SystemDesign', ext: '.md',   badge: 'Sd', color: '#61afef' },
  { id: 'testing',      name: 'Testing',      ext: '.kt',   badge: 'T',  color: '#98c379' },
  { id: 'git',          name: 'Git',          ext: '.sh',   badge: 'G',  color: '#e06c75' },
  { id: 'algorithms',   name: 'Algorithms',   ext: '.kt',   badge: 'AL', color: '#c678dd' },
];

const REFERENCE_CATEGORIES = [
  { id: 'lifehacks', name: 'Lifehacks', ext: '.md', badge: 'L', color: '#56b6c2' },
  { id: 'resume',    name: 'Resume',    ext: '.md', badge: 'R', color: '#528bff' },
];

const ALL_CATEGORIES = [...CATEGORIES, ...REFERENCE_CATEGORIES];

const CATEGORY_BY_ID = Object.fromEntries(ALL_CATEGORIES.map(c => [c.id, c]));

// Небольшой стартовый набор — дозаполнится позже.
const EXTRA_QUESTIONS = [
  { id: 90001, category: 'lifehacks', subcategory: 'Как отвечать на техническом интервью', freq: '🔥', level: 'любой уровень',
    question: 'Формула структурированного ответа: <strong>что это → ключевое отличие → пример/следствие</strong>',
    source: 'повсеместно', probes: ['сначала дай короткое определение своими словами', 'затем — в чём отличие от похожего понятия (это то, что реально проверяют)', 'закрой примером кода или следствием на практике — так интервьюер видит, что ты не просто заучил термин'],
    answer: { what: '', diff: '', example: '' } },
  { id: 90002, category: 'lifehacks', subcategory: 'Как отвечать на техническом интервью', freq: '🔥', level: 'M',
    question: 'Проговаривай ход мысли вслух, даже если не уверен в ответе',
    source: 'Яндекс, Т-Банк, повсеместно', probes: ['интервьюеру важнее увидеть процесс рассуждения, чем идеальный ответ с первой попытки', 'если зашёл в тупик — так проще подсказать и вывести на верный путь'],
    answer: { what: '', diff: '', example: '' } },
  { id: 90003, category: 'lifehacks', subcategory: 'Как отвечать на техническом интервью', freq: '⭐⭐⭐', level: 'M',
    question: 'Не бойся предлагать более современное решение, даже если в задаче используется устаревший стек',
    source: 'Т-Банк', probes: ['пример: видишь RxJava в коде — можешь предложить переписать на корутины, если это уместно', 'это читается как инициативность и понимание trade-off\'ов, а не просто знание синтаксиса'],
    answer: { what: '', diff: '', example: '' } },
  { id: 90004, category: 'lifehacks', subcategory: 'Живое код-ревью', freq: '🔥', level: 'M',
    question: 'На "плохой" код сначала называй бизнес-смысл, потом уже баги',
    source: 'общая практика', probes: ['покажи, что понял, что делает код, прежде чем начать его переписывать', 'дальше — по одному замечанию за раз: нейминг → вложенность → утечки → архитектура'],
    answer: { what: '', diff: '', example: '' } },
  { id: 90005, category: 'lifehacks', subcategory: 'Живое код-ревью', freq: '⭐⭐⭐', level: 'M',
    question: 'Маленькие PR (15–20 минут на чтение) проходят ревью быстрее',
    source: 'М-Видео', probes: [], answer: { what: '', diff: '', example: '' } },
  { id: 90006, category: 'lifehacks', subcategory: 'Перед собеседованием', freq: '⭐⭐', level: 'любой уровень',
    question: 'Готовь 2–3 истории по технике STAR заранее (успех / провал / конфликт)',
    source: 'см. также Resume.md', probes: ['Situation → Task → Action → Result', 'заранее продуманная история звучит увереннее спонтанной'],
    answer: { what: '', diff: '', example: '' } },
  { id: 90007, category: 'lifehacks', subcategory: 'Перед собеседованием', freq: '⭐⭐', level: 'любой уровень',
    question: 'На алгоритмических задачах — сначала озвучь наивное решение и его сложность, потом уже оптимизируй',
    source: 'общая практика', probes: ['это показывает умение анализировать trade-off\'ы, а не просто знание готового решения'],
    answer: { what: '', diff: '', example: '' } },
];
