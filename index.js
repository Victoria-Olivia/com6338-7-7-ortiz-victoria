var questionsArr = [
  {
    question: 'Who directed the film "E.T. the Extra-Terrestrial"?',
    answer: 'Steven Spielberg',
    options: [
      'James Cameron',
      'Alfred Hitchcock',
      'Quentin Tarantino',
      'Steven Spielberg',
    ]
  },
  {
    question: 'Who directed the movie "Titanic"?',
    answer: 'James Cameron',
    options: [
      'Steven Spielberg',
      'Martin Scorsese',
      'James Cameron',
      'Ridley Scott',
    ]
  },
  {
    question: 'Who was the director for the first "Alien" film?',
    answer: 'Ridley Scott',
    options: [
      'James Cameron',
      'Ridley Scott',
      'George Lucas',
      'Steven Spielberg',
    ]
  },
  {
    question: 'Who wrote and directed the movie "Inception"?',
    answer: 'Christopher Nolan',
    options: [
      'Steven Spielberg',
      'Christopher Nolan',
      'J.J. Abrams',
      'Alfred Hitchcock',
    ]
  },
  {
    question: 'Who directed the first two "Terminator" films starring Arnold Schwarzenegger?',
    answer: 'James Cameron',
    options: [
      'Christopher Nolan',
      'James Cameron',
      'Kathryn Bigelow',
      'Kevin Williamson',
    ]
  }
];

var quizQuestion = document.getElementById('quiz');
var timerCountdownSeconds = 30;
var quizTimer = null;
var quizCurrentQuestion = 0;
var quizScoreCount = 0;

function showStartScreen() {
  quizQuestion.textContent = '';

  if (window.localStorage) {
  var previousScore = localStorage.getItem('previous-score');
  if (previousScore !== null) {
    var scoreEl = document.createElement('p');
    scoreEl.textContent = 'Previous Score: ' + previousScore + '%';
    quizQuestion.appendChild(scoreEl);
  }
  }
  var startQuizBtn = document.createElement('button');
  startQuizBtn.textContent = 'Start Quiz!';
  startQuizBtn.id = 'start-quiz';
  startQuizBtn.addEventListener('click', startQuiz);
  quizQuestion.appendChild(startQuizBtn);
}

function startQuiz() {
  quizCurrentQuestion = 0;
  quizScoreCount = 0;
  showQuestion();
}

function showQuestion() {
  clearInterval(quizTimer);
  quizQuestion.textContent = '';
  timerCountdownSeconds = 30;
  var questionObj = questionsArr[quizCurrentQuestion];
  var questionEl = document.createElement('p');
  questionEl.textContent = questionObj.question;
  quizQuestion.appendChild(questionEl);

  var quizAnswerButtons = document.createElement('div');
  var correctAnswer = questionObj.answer;
  for (var i = 0; i < questionObj.options.length; i++) {
    var answerChoice = questionObj.options[i];    
    var button = document.createElement('button');
    button.textContent = answerChoice;

    button.addEventListener('click', function(event) {
      clearInterval(quizTimer);
      if (event.target.textContent === correctAnswer) {
        quizScoreCount++;
      }
      quizCurrentQuestion++;
      if (quizCurrentQuestion < questionsArr.length) {
        showQuestion();
      } else {
        endQuiz();
      }
    });

    quizAnswerButtons.appendChild(button);
  }
  quizQuestion.appendChild(quizAnswerButtons);

  var timerEl = document.createElement('p');
  timerEl.textContent =  timerCountdownSeconds;
  quizQuestion.appendChild(timerEl);

  quizTimer = setInterval(function () {
    timerCountdownSeconds--;
    timerEl.textContent = timerCountdownSeconds;
    if (timerCountdownSeconds <= 0) {
      clearInterval(quizTimer);
      quizCurrentQuestion++;
      if (quizCurrentQuestion < questionsArr.length) {
        showQuestion();
      } else {
        endQuiz();
      }
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(quizTimer);
  quizQuestion.textContent = '';
  var score = Math.round((quizScoreCount / questionsArr.length) * 100);
  localStorage.setItem('previous-score', score);

  var currentScore = document.createElement('p');
  currentScore.textContent = score + '%';
  quizQuestion.appendChild(currentScore);

  var restartQuizBtn = document.createElement('button');
  restartQuizBtn.textContent = 'Start Quiz!';
  restartQuizBtn.id = 'start-quiz';
  restartQuizBtn.addEventListener('click', startQuiz);
  quizQuestion.appendChild(restartQuizBtn);
}
showStartScreen();