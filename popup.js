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

document.addEventListener('DOMContentLoaded', () => {
    const dialogBox = document.getElementById('dialog-box');
    const query = { active: true, currentWindow: true };

    getRandomDogFact()
        .then(fact => {
            dialogBox.innerHTML = fact;
        })
        .catch(error => {
            console.error('Error:', error);
            dialogBox.innerHTML = "Failed to fetch random dog fact.";
        })

    // chrome.tabs.query(query, (tabs) => {
    //     getRandomDogFact()
    //         .then(fact => {
    //             dialogBox.innerHTML = fact;
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //             dialogBox.innerHTML = "Failed to fetch random dog fact.";
    //         })
    //     // dialogBox.innerHTML = getSubjectTitle(tabs[0].title);
    // });
});

const getSubjectTitle = (tabTitle) => {
    const subjectTitle = `${getRandomSubject()} Ahem.. I mean, we are at: ${tabTitle}`
    return subjectTitle;
}

const subjects = [
    'Taylor Swift https://www.thefactsite.com/taylor-swift-facts/',
    'Chiefs',
    'Animal Lovers',
    'UTSA',
    'Engineering'
]

const getRandomSubject = () => {
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    return subject;
}