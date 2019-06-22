const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
// const loader = document.getElementById("loader");
// const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
	{
		question: "What is the first level of professional dive certification in NAUI?",
		choice1: "Divemaster",
		choice2: "Instructor",
		choice3: "Course Director",
		choice4: "Assistant Instructor",
		answer: 4
	},
	{
		question: "Who was an inventor of SCUBA?",
		choice1: "Valerie Taylor",
		choice2: "Colin Lemon",
		choice3: "Jacques Cousteau",
		choice4: "John Glenn",
		answer: 3
	},
	{
		question: "What is the max depth that a NAUI Scuba Diver is qualified for?",
		choice1: "25 feet",
		choice2: "100 feet",
		choice3: "75 feet",
		choice4: "60 feet",
		answer: 4
	},
	{
		question: "What is the name of the piece of equipment that reduces the high pressure in the air tank to ambient pressure?",
		choice1: "Snorkel",
		choice2: "BCD",
		choice3: "Regulator",
		choice4: "Reducer",
		answer: 3
	}
];

// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
	// game.classList.remove("hidden");
	// loader.classList.add("hidden");
};

getNewQuestion = () => {
	if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
		localStorage.setItem("mostRecentScore", score);
		// go to the end page
		return window.location.assign("end.html");
	}
	questionCounter++;
	progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
	// Update the progress bar
	progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
		currentQuestion = availableQuestions[questionIndex];
		question.innerText = currentQuestion.question;
		choices.forEach(choice => {
			const number = choice.dataset["number"];
			choice.innerText = currentQuestion["choice" + number];
		});
		availableQuestions.splice(questionIndex, 1);
		acceptingAnswers = true;
};

choices.forEach(choice => {
	choice.addEventListener("click", e => {
		if (!acceptingAnswers) return;
		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset["number"];
		const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

		if(classToApply == 'correct') {
			incrementScore(CORRECT_BONUS);
		}
		selectedChoice.parentElement.classList.add(classToApply);
		setTimeout ( () => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1000);
	});
});

incrementScore = num => {
	score += num;
	scoreText.innerText = score;
}

startGame();