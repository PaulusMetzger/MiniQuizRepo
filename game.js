const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [{
        question: 'Что такое Микориза?',
        choice1: 'Симбиоз грибницы и корней',
        choice2: 'Фиолетовая птица из семейства колибри',
        choice3: 'Голосовой помощник от OpenAI на базе искуственного интеллекта',
        choice4: 'Одна из серосодержащих аминокислот',
        answer: 1,
    },
    {
        question: "Что такое Геликоприон?",
        choice1: "Английский головной убор",
        choice2: "Нож для открывания устриц",
        choice3: "Род вымерших хрящевых рыб",
        choice4: "Имя кота академика Карпинского",
        answer: 3,
    },
    {
        question: "Что такое фанерозой?",
        choice1: "Деревянный слой для фиксации моделей технического собрания",
        choice2: "Эпоха в геохронологической шкале",
        choice3: "Личинка трилобита",
        choice4: "Один из горизонтов подзолистой почвы",
        answer: 2,
    },
    {
        question: "Что такое Килеск?",
        choice1: "Динозавр из Красноярского края",
        choice2: "Кость стопы лошади",
        choice3: "Один из спутников Сатурна",
        choice4: "Опорная балка горизонтального штрека",
        answer: 1,
    },
    {
        question: "Что обозначает слово Темноспондил?",
        choice1: "Сульфид олова",
        choice2: "Гетерохромный кристалл минерала апатита",
        choice3: "Вымершая группа крупных водных амфибий",
        choice4: "Метеорит упавший в Аргентине",
        answer: 3,
    },
{
        question: "Что такое Гелиодор?",
        choice1: "Имя одного из директоров Горного института",
        choice2: "Одна из разновидностей берилла",
        choice3: "Имя римского императора, преемника Веспасиана",
        choice4: "Одно из имен бога Солнца в греческой мифологии",
        answer: 2,
    },
{
        question: "Что такое Лабиринтодонт?",
        choice1: "Римский вариант имени Минотавра",
        choice2: "Название инструмента, используемого в стоматологии",
        choice3: "Южно-африканский грызун, живущий под землей",
        choice4: "Название одного из вымерших земноводных",
        answer: 4,
    },
{
        question: "Что обозначает слово Индрикотерий?",
        choice1: "Официальный титул вождя инков",
        choice2: "Сказочный зверь в русских сказках",
        choice3: "Коленный сустав крупного рогатого скота",
        choice4: "Гигантский безрогий носорог",
        answer: 4,
    },
{
        question: "Кто такие Фораминиферы?",
        choice1: "Раковинные одноклеточные животные",
        choice2: "Персонажи одноименной серии мультфильмов",
        choice3: "Южноамериканские птицы яркой расцветки, родственники попугаев",
        choice4: "Крестьяне-однодворцы Юго-Восточной Азии",
        answer: 1,
    },
{
        question: "Что обозначает слово Тугтупит?",
        choice1: "Птица отряда дятлообразных",
        choice2: "Редкий флюоресцентный минерал, впервые найденный в Гренландии",
        choice3: "Имя енота принцессы Покахонтас из мультфильма Дисней",
        choice4: "Синтетический тугоплавкий сплав, используемый в авиастроении",
        answer: 2,
    },
{
        question: "Какая окраска НЕ свойствена для кварца?",
        choice1: "черная",
        choice2: "розовая",
        choice3: "желтая",
        choice4: "синяя",
        answer: 4
    },
    {
        question: "Какой из перечисленных минералов  обладает наибольшей твердостью? ",
        choice1: "кварц",
        choice2: "топаз",
        choice3: "ортоклаз",
        choice4: "корунд",
        answer: 4
    },
    {
        question: "Какое название носит рановидность кварца фиолетового цвета?",
        choice1: "морион",
        choice2: "раухтопаз",
        choice3: "цитрин",
        choice4: "аметист",
        answer: 4
    },
    {
        question: "Какое название носит рановидность корунда синего цвета?",
        choice1: "рубин",
        choice2: "лейкосапфир",
        choice3: "лал",
        choice4: "сапфир",
        answer: 4
    },
    {
        question: "Какой из минералов НЕ является разновидностью берилла?",
        choice1: "воробьевит",
        choice2: "изумруд",
        choice3: "аквамарин",
        choice4: "эльбаит",
        answer: 4
    },
    {
        question: "Какое свойство НЕ характерно для алмаза?",
        choice1: "высокая твердость",
        choice2: "хрупкость",
        choice3: "люминесценция",
        choice4: "магнитность",
        answer: 4
    },
    {
        question: "Выберите верное утверждение",
        choice1: "пирит относится к классу силикатов",
        choice2: "пирит образует призматические кристаллы",
        choice3: "пирит - главный источник железа",
        choice4: "пирит имеет черный цвет черты",
        answer: 4
    },
    {
        question: "Выберите свойство, характерное для лабрадора",
        choice1: "люминесценция",
        choice2: "магнитность",
        choice3: "растворимость в воде",
        choice4: "иризация",
        answer: 4
    },
    {
        question: "Какой минерал имеет твердость 1 по шкале Мооса?",
        choice1: "апатит",
        choice2: "кальцит",
        choice3: "гипс",
        choice4: "тальк",
        answer: 4
    },
    {
        question: "Какой минерал имеет твердость 3 по шкале Мооса?",
        choice1: "кварц",
        choice2: "гипс",
        choice3: "тальк",
        choice4: "кальцит",
        answer: 4
    },
    {
        question: "Какой минерал имеет твердость 7 по шкале Мооса?",
        choice1: "апатит",
        choice2: "гипс",
        choice3: "тальк",
        choice4: "кварц",
        answer: 4
    },
    {
        question: "Как называется скрытокристаллическая разновидность кварца?",
        choice1: "морион",
        choice2: "кристобалит",
        choice3: "тридимит",
        choice4: "халцедон",
        answer: 4
    },
    {
        question: "Какое название носит самый крупный самородок золота, найденный на территории России? ",
        choice1: "Верблюд",
        choice2: "Дельфин",
        choice3: "Лошадиная голова",
        choice4: "Большой треугольник",
        answer: 4
    },
    {
        question: "Для какого минерала наиболее характерно образование \"дендритов\"?",
        choice1: "ильменит",
        choice2: "апатит",
        choice3: "сера",
        choice4: "медь",
        answer: 4
    },
    {
        question: "Амазонит − это разновидность ",
        choice1: "санидина",
        choice2: "альбита",
        choice3: "ортоклаза",
        choice4: "микроклина",
        answer: 4
    },
    {
        question: "Минерал александрит назван в честь",
        choice1: "Александра Пушкина",
        choice2: "Александра Македонского",
        choice3: "Александра  I",
        choice4: "Александра II",
        answer: 4
    },
    {
        question: "Какое количество граней в стандартной огранке алмаза",
        choice1: 23,
        choice2: 56,
        choice3: 120,
        choice4: 57,
        answer: 4
    },
    {
        question: "Из какого минерала в древнем Египте чаще всего изготавливали фигурки жука-скарабея",
        choice1: "чароит",
        choice2: "родонит",
        choice3: "алмаз",
        choice4: "бирюза",
        answer: 4
    },
    {
        question: "Селенит это волокнистая разновидность …",
        choice1: "талька",
        choice2: "асбеста",
        choice3: "ангидрита",
        choice4: "гипса",
        answer: 4
    },
    {
        question: "Какой минерал НЕ относится к группе полевых шпатов?",
        choice1: "альбит",
        choice2: "микроклин",
        choice3: "адуляр",
        choice4: "содалит",
        answer: 4
    },
    {
        question: "К какому классу минералов относится кварц?",
        choice1: "фосфаты",
        choice2: "сульфиды",
        choice3: "карбонаты",
        choice4: "оксиды",
        "answer": 4
    },
    {
        question: "К какому классу минералов относится кальцит?",
        choice1: "оксиды",
        choice2: " фосфаты",
        choice3: "силикаты",
        choice4: "карбонаты",
        answer: 4
    },
    {
        question: "К какому классу минералов относится пирит?",
        choice1: "оксиды",
        choice2: "бораты",
        choice3: "силикаты",
        choice4: "сульфиды",
        answer: 4
    },
    {
        question: "Какой облик характерен для кристаллов галита? ",
        choice1: "уплощенный",
        choice2: "удлиненный",
        choice3: "шестоватый",
        choice4: "изометрический ",
        answer: 4
    },
    {
        question: "Для какого минерала характерна псевдохроматическая окраска?",
        choice1: "киноварь",
        choice2: "кварц",
        choice3: "малахит",
        choice4: "халькопирит",
        answer: 4
    },
    {
        question: "Для какого минерала характерна форма кристаллов «октаэдр»?",
        choice1: "кварц",
        choice2: "корунд",
        choice3: "берилл",
        choice4: "магнетит",
        answer: 4
    },
    {
        question: "Какое название носит халцедон яблочно-зеленого цвета?",
        choice1: "сердолик",
        choice2: "сапфирин",
        choice3: "сардер",
        choice4: "хризопраз",
        answer: 4
    },
    {
        question: "Какая примесь в корунде объясняет красную окраску?",
        choice1: "титан",
        choice2: "медь",
        choice3: "марганец",
        choice4: "хром",
        answer: 4
    },
    {
        question: "Какой минерал также новит название \"лопарская кровь\"?",
        choice1: "рубин",
        choice2: "альмандин",
        choice3: "шпинель",
        choice4: "эвдиалит",
        answer: 4
    },
    {
        question: "Разновидностью какого минерала является александрит?",
        choice1: "берилл",
        choice2: "шерл",
        choice3: "топаз",
        choice4: "хризоберилл",
        answer: 4
    },
    {
        question: "Какое из свойств наиболее характерно для золота?",
        choice1: "высокая твердость",
        choice2: "двулучепреломление",
        choice3: "совершенная спайность",
        choice4: "ковкость",
        answer: 4
    },
    {
        question: "Ювелирной разновидностью какого минерала является танзанит? ",
        choice1: "жадеит",
        choice2: "корунд",
        choice3: "берилл",
        choice4: "цоизит",
        answer: 4
    },
    {
        question: "Какой вес имеет 1 карат?",
        choice1: "130 мг",
        choice2: "300 мг",
        choice3: "170 мг",
        choice4: "200 мг",
        answer: 4
    },
    {
        question: "Название самого большого алмаза в мире? ",
        choice1: " Эксельсиор",
        choice2: "Шах",
        choice3: " Дютойтспен (Безымянный)",
        choice4: "Куллинан",
        answer: 4
    },
    {
        question: "Какой вес (в каратах) имел самый большой алмаз в мире -  Куллинан? ",
        choice1: 10278,
        choice2: 1504,
        choice3: 2739,
        choice4: 3106,
        answer: 4
    },
    {
        question: "Где был найден алмаз Кохинор?",
        choice1: "Южная Африка",
        choice2: "Бразилия",
        choice3: "Россия",
        choice4: "Индия",
        answer: 4
    },
    {
        question: "Одна из самых известных имитаций бриллианта - фианит, берет свое название от …",
        choice1: "редкого растения \"фианот\"",
        choice2: "фамилии геолога Фианова А.В.",
        choice3: "ювелирной компании Фианит",
        choice4: "Физического Института Академии Наук",
        answer: 4
    },
    {
        question: "Цаворит является разновидностью какого минерала?",
        choice1: "берилл",
        choice2: "эльбаит",
        choice3: "корунд",
        choice4: " гроссуляр",
        answer: 4
    },
    {
        question: "Какой сингонии не существует?",
        choice1: "гексагональной",
        choice2: "ромбической",
        choice3: "кубической",
        choice4: "призматической",
        answer: 4
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
// Выбираем два случайных вопроса из массива
const randomQuestions = chooseRandomQuestions(questions, MAX_QUESTIONS);

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...randomQuestions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];

    // Изменение места правильного ответа
    var randomNumber = Math.floor(Math.random() * 4);
    var answerIndex = parseInt(currentQuestion.answer) - 1;
    var choicesList = [currentQuestion.choice1, currentQuestion.choice2, currentQuestion.choice3, currentQuestion.choice4];
    var tempValue = choicesList[randomNumber];
    choicesList[randomNumber] = choicesList[answerIndex];
    choicesList[answerIndex] = tempValue;
    [currentQuestion.choice1, currentQuestion.choice2, currentQuestion.choice3, currentQuestion.choice4] = choicesList;
    currentQuestion.answer = randomNumber + 1;
        
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

// Функция для выбора случайных двух вопросов
function chooseRandomQuestions(arr, num) {
    const result = [];
    const copyArr = [...arr];
    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * copyArr.length);
        result.push(copyArr[randomIndex]);
        copyArr.splice(randomIndex, 1);
    }
    return result;
}

startGame();
