const highScoresList = document.getElementById("highScoresList");
const highScores  = JSON.parse(localStorage.getItem("highScores")) || [];

// This function dictates how the high scores will be displayed on the "High Scores" page
highScoresList.innerHTML = 
	highScores.map(score =>{
		return `<li class="high-score">${score.name} - ${score.score}</li>`;
	})
	.join("");
