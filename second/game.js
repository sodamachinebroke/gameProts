const question = {

    title: 'macska',
    alternatives: ['dog', 'door', 'cat', 'table'],
    correctIndex: 2
};

const questions = [
    {

        title: 'macska',
        alternatives: ['dog', 'door', 'cat', 'table'],
        correctIndex: 2
    },
    {

        title: 'kutya',
        alternatives: ['dog', 'door', 'cat', 'table'],
        correctIndex: 0
    },
    {

        title: 'ajto lol',
        alternatives: ['dog', 'door', 'cat', 'table'],
        correctIndex: 1
    },
    {

        title: 'asztal',
        alternatives: ['dog', 'door', 'cat', 'table'],
        correctIndex: 3
    }

];

const app = {

    start: function start() {
        this.currentIndex = 0;
        this.score = 0;
        const alternatives = document.querySelectorAll('.alternative');
        alternatives.forEach((alternative, index) => {
            alternative.addEventListener('click', () => {

                //check if answer is correct

                this.checkAnswer(index);

                //step question

                this.stepQuestion();

                //show new question

                this.showQuestion(questions[this.currentIndex]);

            });
        });

        this.showQuestion(questions[this.currentIndex]);
        this.displayScore();
    },

    showQuestion: function showQuestion(q) {

        const titleDiv = document.querySelector('#title');
        titleDiv.innerHTML = q.title;

        const alternatives = document.querySelectorAll('.alternative');
        alternatives.forEach((alternative, index) => {
            alternative.innerHTML = q.alternatives[index];
        });


    },

    checkAnswer: function checkAnswer(clickIndex) {
        const currentQuestion = questions[this.currentIndex];
        const correctIndex = currentQuestion.correctIndex;

        if (correctIndex == clickIndex) {
            this.showResult(true);
            this.score++;
        } else {
            this.showResult(false);

        }

        this.displayScore();
    },

    stepQuestion: function () {
        this.currentIndex++;

        if (questions.length == this.currentIndex) {
            this.currentIndex = 0;
        }
    },

    displayScore: function () {
        const scoreDiv = document.querySelector('.score');
        scoreDiv.innerHTML = 'Score: ' + this.score;
    },

    showResult: function (isCorrect) {
        let result;

        if (isCorrect) {
            result = "Correct!";
        } else {

            const currentQuestion = questions[this.currentIndex];
            const correctIndex = currentQuestion.correctIndex;
            const correctAnswer = currentQuestion.alternatives[correctIndex];
            result = "Incorrect, correct one was:" + correctAnswer;

        }
        const resultDiv = document.querySelector('.result');
        resultDiv.innerHTML = result;
    }

};

// no need to use types, every variable is genderfluid


app.start();