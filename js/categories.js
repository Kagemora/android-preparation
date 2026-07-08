// Метаданные категорий: порядок в массиве = порядок в сайдбаре.
// 18 категорий — таксономия пользователя (computer-science-style группировка).
// + Algorithms и SystemDesign (не участвовали в реорганизации, перенесены как были).
const CATEGORIES = [
  { id: 'kotlin',       name: 'Kotlin',       ext: '.kt',   badge: 'K',  color: '#a25433' },
  { id: 'java',         name: 'Java',         ext: '.java', badge: 'J',  color: '#3433a2' },
  { id: 'collections',  name: 'Collections',  ext: '.kt',   badge: 'Cl', color: '#52a233' },
  { id: 'android',      name: 'AndroidSDK',   ext: '.kt',   badge: 'A',  color: '#a23373' },
  { id: 'viewxml',      name: 'ViewXML',      ext: '.kt',   badge: 'Vx', color: '#3393a2' },
  { id: 'compose',      name: 'Compose',      ext: '.kt',   badge: 'Cp', color: '#a29133' },
  { id: 'concurrency',  name: 'Concurrency',  ext: '.kt',   badge: 'Cn', color: '#7033a2' },
  { id: 'storage',      name: 'Storage',      ext: '.kt',   badge: 'St', color: '#33a250' },
  { id: 'network',      name: 'Network',      ext: '.kt',   badge: 'N',  color: '#a23337' },
  { id: 'architecture', name: 'Architecture', ext: '.kt',   badge: 'Ar', color: '#3357a2' },
  { id: 'patterns',     name: 'Patterns',     ext: '.kt',   badge: 'P',  color: '#78a233' },
  { id: 'principles',   name: 'Principles',   ext: '.kt',   badge: 'Pr', color: '#a23398' },
  { id: 'oop',          name: 'OOP',          ext: '.kt',   badge: 'O',  color: '#33a28c' },
  { id: 'di',           name: 'DI',           ext: '.kt',   badge: 'DI', color: '#a26b33' },
  { id: 'testing',      name: 'Testing',      ext: '.kt',   badge: 'T',  color: '#4b33a2' },
  { id: 'build',        name: 'Build',        ext: '.sh',   badge: 'B',  color: '#3ba233' },
  { id: 'performance',  name: 'Performance',  ext: '.kt',   badge: 'Pf', color: '#a2335c' },
  { id: 'tools',        name: 'Tools',        ext: '.sh',   badge: 'Tl', color: '#337ca2' },
  { id: 'algorithms',   name: 'Algorithms',   ext: '.kt',   badge: 'AL', color: '#9da233' },
  { id: 'systemdesign', name: 'SystemDesign', ext: '.md',   badge: 'SD', color: '#8733a2' },
];

const REFERENCE_CATEGORIES = [
  { id: 'resume',    name: 'Resume',    ext: '.md', badge: 'R', color: '#33a267' },
  { id: 'lifehacks', name: 'Lifehacks', ext: '.md', badge: 'L', color: '#a24633' },
];

const ALL_CATEGORIES = [...CATEGORIES, ...REFERENCE_CATEGORIES];
const CATEGORY_BY_ID = Object.fromEntries(ALL_CATEGORIES.map(c => [c.id, c]));

// Небольшой стартовый набор лайфхаков (не из парсера — дозаполнится позже).
const EXTRA_QUESTIONS = [
  { id: 90001, category: 'lifehacks', subcategory: 'Как отвечать на техническом интервью', freq: '🔥', level: 'любой', localNum: 1,
    question: 'Формула структурированного ответа: <strong>что это → ключевое отличие → пример/следствие</strong>',
    source: 'повсеместно', probes: ['сначала дай короткое определение своими словами', 'затем — в чём отличие от похожего понятия (это то, что реально проверяют)', 'закрой примером кода или следствием на практике'],
    answer: { what: '', diff: '', example: '' } },
  { id: 90002, category: 'lifehacks', subcategory: 'Как отвечать на техническом интервью', freq: '🔥', level: 'M', localNum: 2,
    question: 'Проговаривай ход мысли вслух, даже если не уверен в ответе',
    source: 'Яндекс, Т-Банк, повсеместно', probes: ['интервьюеру важнее увидеть процесс рассуждения, чем идеальный ответ с первой попытки'],
    answer: { what: '', diff: '', example: '' } },
  { id: 90003, category: 'lifehacks', subcategory: 'Как отвечать на техническом интервью', freq: '⭐', level: 'M', localNum: 3,
    question: 'Не бойся предлагать более современное решение, даже если в задаче используется устаревший стек',
    source: 'Т-Банк', probes: ['пример: видишь RxJava в коде — можешь предложить переписать на корутины, если это уместно'],
    answer: { what: '', diff: '', example: '' } },
  { id: 90004, category: 'lifehacks', subcategory: 'Живое код-ревью', freq: '🔥', level: 'M', localNum: 4,
    question: 'На "плохой" код сначала называй бизнес-смысл, потом уже баги',
    source: 'общая практика', probes: ['покажи, что понял, что делает код, прежде чем начать его переписывать'],
    answer: { what: '', diff: '', example: '' } },
  { id: 90005, category: 'lifehacks', subcategory: 'Живое код-ревью', freq: '⭐', level: 'M', localNum: 5,
    question: 'Маленькие PR (15–20 минут на чтение) проходят ревью быстрее',
    source: 'М-Видео', probes: [], answer: { what: '', diff: '', example: '' } },
  { id: 90006, category: 'lifehacks', subcategory: 'Перед собеседованием', freq: '⭐', level: 'любой', localNum: 6,
    question: 'Готовь 2–3 истории по технике STAR заранее (успех / провал / конфликт)',
    source: 'см. также Resume.md', probes: ['Situation → Task → Action → Result'],
    answer: { what: '', diff: '', example: '' } },
  { id: 90007, category: 'lifehacks', subcategory: 'Перед собеседованием', freq: '⭐', level: 'любой', localNum: 7,
    question: 'На алгоритмических задачах — сначала озвучь наивное решение и его сложность, потом уже оптимизируй',
    source: 'общая практика', probes: [], answer: { what: '', diff: '', example: '' } },
];
