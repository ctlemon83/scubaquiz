const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;

// This dictates where the player's current score is displayed
finalScore.innerText = mostRecentScore;

// This function will not let a player save their score without entering their user name
username.addEventListener("keyup", () => {
	saveScoreBtn.disabled = !username.value;
});

// This function adds the current score to the "high scores" list, if it is in the top five, and orders all high scores highest to lowest
saveHighScore = (e) => {
	e.preventDefault();
	const score = {
		score: mostRecentScore,
		name: username.value
	};
	highScores.push(score);
	highScores.sort((a,b) => b.score - a.score)
	highScores.splice(5);

// This saves the high scores in local storage
	localStorage.setItem("highScores", JSON.stringify(highScores));
	window.location.assign("index.html");
};
