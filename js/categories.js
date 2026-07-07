// Метаданные категорий: порядок в массиве = порядок в сайдбаре.
// 12 основных категорий = 12 из 13 исходных md-файлов (1 файл = 1 категория).
// 13-й файл (Behavioral) и Lifehacks вынесены в "Справочные материалы".
const CATEGORIES = [
  { id: 'kotlin',       name: 'Kotlin',       ext: '.kt',   badge: 'K',  color: '#a855c9' },
  { id: 'java',         name: 'Java',         ext: '.java', badge: 'J',  color: '#c9752c' },
  { id: 'android',      name: 'AndroidSDK',   ext: '.kt',   badge: 'A',  color: '#1f9e7e' },
  { id: 'ui',           name: 'UI',           ext: '.kt',   badge: 'U',  color: '#2f6fb0' },
  { id: 'concurrency',  name: 'Concurrency',  ext: '.kt',   badge: 'Cn', color: '#7c5cbf' },
  { id: 'collections',  name: 'Collections',  ext: '.kt',   badge: 'Cl', color: '#2a8fb0' },
  { id: 'patterns',     name: 'Patterns',     ext: '.kt',   badge: 'P',  color: '#a1791f' },
  { id: 'architecture', name: 'Architecture', ext: '.kt',   badge: 'Ar', color: '#b05a3a' },
  { id: 'network',      name: 'Network',      ext: '.kt',   badge: 'N',  color: '#2f9e58' },
  { id: 'tools',        name: 'Tools',        ext: '.sh',   badge: 'T',  color: '#c94f56' },
  { id: 'algorithms',   name: 'Algorithms',   ext: '.kt',   badge: 'AL', color: '#9c3fb0' },
  { id: 'systemdesign', name: 'SystemDesign', ext: '.md',   badge: 'SD', color: '#2b7fc4' },
];

const REFERENCE_CATEGORIES = [
  { id: 'resume',    name: 'Resume',    ext: '.md', badge: 'R', color: '#b09522' },
  { id: 'lifehacks', name: 'Lifehacks', ext: '.md', badge: 'L', color: '#1f9e9e' },
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
