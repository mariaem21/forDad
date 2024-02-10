function getRandomDogFact() {
    return fetch('https://dogapi.dog/api/v2/facts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch dog facts');
            }
            return response.json();
        })
        .then(data => {
            const fact = data.data[0].attributes.body;
            console.log(data);
            return fact;
        })
        .catch(error => {
            console.error('Error fetching random dog fact:', error);
            return null;
        });
}

// function getTayTayLyric() {
//     return fetch('https://taylor-swift-api.sarbo.workers.dev/lyrics?shouldRandomizeLyrics=true&numberOfParagraphs=1');
// }

document.addEventListener('DOMContentLoaded', async () => {
    const dialogBox = document.getElementById('dialog-box');
    const query = { active: true, currentWindow: true };

    try {
        const fact = await getRandomFunFact();
        dialogBox.innerHTML = fact;
    } catch (error) {
        console.error('Error:', error);
        dialogBox.innerHTML = "Failed to fetch random...";
    }

});

async function getRandomFunFact() {
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    let text = `Fun fact about ${subject}.`;

    if (subject == "Dogs") {
        const fact = await getRandomDogFact();
        text = `Fun fact about ${subject}. ${fact}`;
        return text;
    } else if (subject == "Taylor Swift") {
        return `Here is a Taylor Swift song lyric:`;
    } else {
        return text;
    }
}

const subjects = [
    'Taylor Swift',
    'the Chiefs',
    'Dogs',
    'UTSA',
    'Engineering'
]

const getRandomSubject = () => {
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    return subject;
}