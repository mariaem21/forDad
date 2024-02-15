function getTayTaySong(songNumber) {
    return fetch(`https://taylor-swift-api.sarbo.workers.dev/lyrics/${songNumber}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch lyric.');
            }
            return response.json();
        })
        .then(lyrics => {
            const fact = lyrics.song_title;
            console.log(fact);
            return fact;
        })
        .catch(error => {
            console.error('Error fetching Tay Tay lyric:', error);
            return null;
        })
}

function getTayTayLyric(songNumber) {
    return fetch(`https://taylor-swift-api.sarbo.workers.dev/lyrics/${songNumber}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch lyric.');
            }
            return response.json();
        })
        .then(lyrics => {
            const fact = extractFirstFourLines(lyrics.lyrics);
            console.log(fact);
            return fact;
        })
        .catch(error => {
            console.error('Error fetching Tay Tay lyric:', error);
            return null;
        })
}

function extractFirstFourLines(lyrics) {
    const lines = lyrics.split('\n');
    const firstFourLines = lines.slice(0, 4);
    const firstFourLinesString = firstFourLines.join('\n');
    return firstFourLinesString;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var song1 = getRandomNumber(1, 177);
var song2 = getRandomNumber(1, 177);
var song3 = getRandomNumber(1, 177);
var song4 = getRandomNumber(1, 177);
var correct = getRandomNumber(0, 2);
var finalAnswer = "";

const quizData = [
    {
        question: "What song is this lyric from?",
        options: [song1, song2, song3, song4],
        answer: correct
    }
];

const questionElement = document.getElementById("question");
const lyricElement = document.getElementById("lyric");
const optionsElement = document.getElementById("options");
const resultsElement = document.getElementById("results");

let currentQuestion = 0;

async function showQuestion() {
    const question = quizData[currentQuestion];
    const answer = await getTayTaySong(question.options[question.answer]);
    finalAnswer = answer;
    resultsElement.innerText = "Happy birthday Dad!";
    questionElement.innerText = question.question;
    const lyric = await getTayTayLyric(question.options[question.answer]);
    lyricElement.innerText = lyric;

    console.log(question.options[question.answer]);

    optionsElement.innerHTML = "";
    for (option in question.options) { 
        const button = document.createElement("button");
        const song = await getTayTaySong(question.options[option]);

        console.log(question.options[option]);

        button.innerText = song;
        optionsElement.appendChild(button);
        button.addEventListener("click", selectAnswer);
    }
}

async function selectAnswer(a) {
    const selectedButton = a.target;

    if (selectedButton.innerText == finalAnswer) {
        resultsElement.style.backgroundColor = 'lightgreen';
        resultsElement.innerText = "Correct!";
        console.log("Nice one Dad!");
    } else {
        resultsElement.style.backgroundColor = 'rgb(237, 190, 249)'; // 'rgb(214, 117, 117)';
        resultsElement.innerText = `Wrong. The correct answer is ${finalAnswer}.`;
        console.log("That's okay! Just keep practicing, you'll get it!");
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion();
    }
}

showQuestion();