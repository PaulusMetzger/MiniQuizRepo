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

let questions = [
    {
        question: 'Что такое Микориза?',
        choice1: 'Симбиоз грибницы и корней',
        choice2: 'Птица из семейства колибри',
        choice3: 'Программа браузер',
        choice4: 'Одна из аминокислот',
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
        choice1: "Деревянный слой в подиуме модели из технического собрания",
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
        answer: 2,
    },
{
        question: "Что такое Гелиодор?",
        choice1: "имя одного из ректоров Горного института",
        choice2: "одна из разновидностей берилла",
        choice3: "имя римского императора, преемника Веспасиана",
        choice4: "одно из имен бога Солнца в греческой мифологии",
        answer: 2,
    },
{
        question: "Что такое Лабиринтодонт?",
        choice1: "одно из имен Минотавра",
        choice2: "название инструмента, используемого в стоматологии",
        choice3: "южно-африканский грызун, живущий под землей",
        choice4: "название одного из вымерших земноводных",
        answer: 4,
    },
{
        question: "Что обозначает слово Индрикотерий?",
        choice1: "имя вождя инков",
        choice2: "сказочный зверь в русских сказках",
        choice3: "коленный сустав крупного рогатого скота",
        choice4: "гигантский безрогий носорог",
        answer: 4,
    },
{
        question: "Кто такие Фораминиферы?",
        choice1: "раковинные одноклеточные животные",
        choice2: "персонажи одноименной серии мультфильмов",
        choice3: "южноамериканские птицы яркой расцветки, родственники попугаев",
        choice4: "крестьяне-однодворцы Юго-Восточной Азии",
        answer: 1,
    },
{
        question: "Что обозначает слово Тугтупит?",
        choice1: "птица отряда дятлообразных",
        choice2: "редкий флюоресцентный минерал, впервые найденный в Гренландии",
        choice3: "енот Покахонтас, героини мультфильма студии Дисней",
        choice4: "редкий тугоплавкий сплав, используемый в авиастроении",
        answer: 2,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;
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
