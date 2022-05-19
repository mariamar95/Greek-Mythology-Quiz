//Getting the elements from HTML files and assign variables
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5 ;

//display final score
finalScore.innerText = mostRecentScore;

//disables the save button if the username input is empty
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
});


//submit user score and display 5 highest scores for local storage
saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score);

    highScores.sort((a,b) => {
    return b.score - a.score});

    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));

    window.location.assign('leaderboard.html');
}