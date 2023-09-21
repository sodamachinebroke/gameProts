const question = {

    title: 'macska',
    alternatives: ['dog', 'door', 'cat', 'table'],
    correctIndex: 2
};

const app = {

    start: function start() {
        const alternatives = document.querySelectorAll('.alternative');
        alternatives.forEach((alternative, index) => {
            alternative.addEventListener('click', () => {
                console.log('Click');
            });
        });

        this.showQuestion(question);
    },

    showQuestion: function showQuestion(q) {

        const titleDiv = document.querySelector('#title');
        titleDiv.innerHTML = q.title;

        const alternatives = document.querySelectorAll('.alternative');
        alternatives.forEach((alternative, index) => {
            alternative.innerHTML = q.alternatives[index];

            alternative.addEventListener('click', () => {
                console.log('Click');
            });
        });

    }

};

// no need to use types, every variable is genderfluid


app.start();