const STORE = [
    {
        question: "What is the name of the main family in Married with Children?",
        answers: [
            "The Bundys",
            "The Jeffersons",
            "The Simpsons",
            "The Griffins",
        ],
        correctAnswer: "The Bundys"
    },

    {
        question: "What does Al do for a living?",
        answers: [
            "Meter Maid",
            "Gym Teacher",
            "Women's shoe salesmen",
            "Model",
        ],
        correctAnswer: "Women's shoe salesmen"
    },

    {
        question: "What is Al's greatest accomplishment?",
        answers: [
            "Scored 4 touchdowns in a single game",
            "Won the lottery",
            "Being a dad",
            "Employee of the month",
        ],
        correctAnswer: "Scored 4 touchdowns in a single game"
    },

    {
        question: "What does Al hate the most about work?",
        answers: [
            "The shoe styles",
            "The hours",
            "The pay",
            "The 'large' women that come into the store",
        ],
        correctAnswer: "The 'large' women that come into the store"
    },

    {
        question: "Who are the Bundy's neighbors?",
        answers: [
            "The Browns",
            "The D'arcys",
            "The Smiths",
            "The Marshs",
        ],
        correctAnswer: "The D'arcys"
    },

    {
        question: "What does Al compare Marcy to on a frequent basis?",
        answers: [
            "A scarecrow",
            "A dog",
            "A super model",
            "A chicken",
        ],
        correctAnswer: "A chicken"
    },

    {
        question: "What are the names of Al's children?",
        answers: [
            "Bud and Kelly",
            "Bart and Lisa",
            "Stan and Shelley",
            "Chris and Meg",
        ],
        correctAnswer: "Bud and Kelly"
    },

    {
        question: "What is the name of Al's wife?",
        answers: [
            "Patty",
            "Peggy",
            "Francine",
            "Lois",
        ],
        correctAnswer: "Peggy"
    },

    {
        question: "What organization did Al create to oppose feminism?",
        answers: [
            "Men's Rights!",
            "Know your Role",
            "No Ma'am",
            "It must Stop!",
        ],
        correctAnswer: "No Ma'am"
    },

    {
        question: "What is Al's favorite TV show?",
        answers: [
            "Psycho Dad",
            "Roseanne",
            "Oprah",
            "Three's Company",
        ],
        correctAnswer: "Psycho Dad"
    },
]

let questNum = 0;
let questScore = 0;

function provideQuestion() {
  if (questNum < STORE.length) {
        return createHtml(questNum);
        } else {
            $('.questionBox').hide();
            finalScore();
            $('.questNum').text(10);
        }
}

function updateScore() {
    questScore++;
    $('.questScore').text(questScore);
}

function updateNum() {
    questNum++;
    $('.questNum').text(questNum + 1);
}

function resetStats() {
    questScore = 0;
    questNum = 0;
    $('.questScore').text(0);
    $('.questNum').text(0);
}

function beginQuiz() {
    $('.altBox').hide();
    $('.topScreen').on('click', '.start', function(event) {
        $('.topScreen').hide();
        $('.questNum').text(1);
        $('.questionBox').show();
        $('.questionBox').prepend(provideQuestion());
    });
}

function handleAnswer() {
    $('.questionBox').on('submit', function(event) {
        event.preventDefault();
        $('.altbox').hide();
        $('.submit').hide();
        $('.questionBox').hide();
        $('.feedbackBox').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questNum].correctAnswer;
        if (answer === correct) {
            rightAnswer();
        } else {
            wrongAnswer();
        }
    });

}

function createHtml(questionIndex) {
    let formMaker = $(`<form>
    <fieldset>
        <legend class = "questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
</form>`)

    let fieldSelector = $(formMaker).find('fieldset');

    STORE[questionIndex].answers.forEach(function(answerValue, answerIndex) {
        $(`<label class = "quizMe" for = "${answerIndex}">
            <input class = "radio" type = "radio" id = "${answerIndex}" value = "${answerValue}" name = "answer" required>
            <span>${answerValue}</span>
            </label>`).appendTo(fieldSelector);
    });

    $(`<button type = "submit" class = "submit">Submit</button>`).appendTo(fieldSelector);
    return formMaker;
}

function rightAnswer() {
    $('.feedbackBox').html(`<h2>You got the right answer!</h2>
    <img src="images/Albundyfootball.jpg" alt: "al bundy happy" class="images">
    <button type = "button" class = "next">Next>></button>`
    );
    updateScore();
}

function wrongAnswer() {
    $('.feedbackBox').html(`<h2>You are wrong!</h2>
    <img src="images/Albundyscreaming.jpg" alt: "al screaming" class="images width: 200px>
    <p class = "quizYou">It's really:</p>
    <p class = "quizYou">${STORE[questNum].correctAnswer}</p>
    <button type = "button" class = "next">Next>></button>`);
}

function nextQuestion() {
    $('.feedbackBox').on('click', '.next', function(event) {
        $('.altBox').hide();
        $('.questionBox').show();
        updateNum();
        $('.questionBox form').replaceWith(provideQuestion());
    });
}

function finalScore() {
    $('.finalBox').show();

    return $('.finalBox').html(
        `<h3> Your score is ${questScore} / 10</h3>
        <img src="images/Albundy.jpg" alt: "Al" class= "images">
        <button type = "submit" class = "startNew">Start New Quiz</button>`);
}

function restartQuiz() {
    $('.finalBox').on('click', '.startNew', function(event) {
        event.preventDefault();
        resetStats();
        $('.altBox').hide();
        $('.topScreen').show();
    });
}

function handleQuizApp() {
    beginQuiz();
    provideQuestion();
    handleAnswer();
    nextQuestion();
    restartQuiz();
}

$(handleQuizApp);
