// Data for each useless stage
const stageData = {
    stage1: {
        title: "The Button That Does Nothing",
        content: "This stage is designed to make you question your life choices. The content here is completely random and has no purpose. Ponder its existence, and then move on to the next useless challenge."
    },
    stage2: {
        title: "Hello, Potato",
        content: "Welcome to the potato dimension. The code snippets here are mostly about potatoes. Your goal is to not learn anything. Don't think about the potato."
    },
    stage3: {
        title: "Infinite Loading Screen",
        content: "This page is still loading. Just kidding. It's not. The content is an endless loop of disappointment, just like this sentence. Please wait for an infinite amount of time, or just click 'Go to Quiz'."
    },
    stage4: {
        title: "Emotional Damage Quiz",
        content: "This stage is a pre-quiz for the emotional damage you're about to endure. The content is just a collection of sad quotes. Get ready to feel things."
    },
    stage5: {
        title: "Diploma of Disappointment",
        content: "You've reached the final stage. The content here is a diploma. It certifies that you have wasted your time effectively. Congratulations, you're a professional at being let down."
    }
};

// Quiz data for each useless stage
const quizData = {
    stage1: [{
        question: "What does this button do?",
        code: "button.onclick = () => { /* nothing */ }",
        options: ["Makes coffee", "Starts a spaceship", "Shows a cat picture", "Absolutely nothing"],
        answer: "Absolutely nothing"
    }],
    stage2: [{
        question: "What is the primary color of a potato?",
        code: "printf(\"%s\", \"A potato is a potato.\");",
        options: ["Brown", "Yellow", "Purple", "Potato-colored"],
        answer: "Potato-colored"
    }],
    stage3: [{
        question: "How long will this loop run?",
        code: "while(true) { /* ... */ }",
        options: ["Once", "Twice", "Infinitely", "Until you get bored"],
        answer: "Infinitely"
    }],
    stage4: [{
        question: "What is the output of printf(\"Your grade: %d\", 0);?",
        code: "printf(\"Your grade: %d\", 0);",
        options: ["Your grade: A+", "Your grade: 100", "Your grade: 0", "Your grade: C"],
        answer: "Your grade: 0"
    }],
    stage5: [{
        question: "What does this diploma certify?",
        code: "char* result = \"Disappointment\";",
        options: ["Advanced C skills", "Time well spent", "Your dedication to learning", "Professional disappointment"],
        answer: "Professional disappointment"
    }]
};

let currentStageId = null;

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function loadStage(stageId) {
    currentStageId = stageId;
    const data = stageData[stageId];
    if (data) {
        document.getElementById('learning-title').textContent = data.title;
        document.getElementById('learning-content').textContent = data.content;
        showScreen('learning-screen');
    }
}

function loadQuiz() {
    const quiz = quizData[currentStageId][0]; 
    document.querySelector('.question').textContent = quiz.question;
    document.getElementById('quiz-code').textContent = quiz.code;
    
    const optionButtons = document.querySelectorAll('.options .option');
    quiz.options.forEach((option, index) => {
        optionButtons[index].textContent = option;
        // Reset and add new listener
        optionButtons[index].removeEventListener('click', handleOptionClick);
        optionButtons[index].addEventListener('click', handleOptionClick);
    });

    // Reset selected option
    optionButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Update back button to go back to the learning screen
    document.querySelector('#quiz-screen .back-button').onclick = () => {
        showScreen('learning-screen');
    };

    showScreen('quiz-screen');
}

let selectedOption = null;

function handleOptionClick(event) {
    const optionButtons = document.querySelectorAll('.options .option');
    optionButtons.forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
    selectedOption = event.target.textContent;
}

document.addEventListener('DOMContentLoaded', () => {
    // Event listener for the "Go to Quiz" button
    document.getElementById('go-to-quiz-button').addEventListener('click', loadQuiz);

    // Event listener for the submit button
    const submitButton = document.querySelector('.submit-button');
    submitButton.addEventListener('click', () => {
        if (!selectedOption) {
            alert('Please choose an option to submit to the void.');
            return;
        }

        const currentQuiz = quizData[currentStageId][0];
        if (selectedOption === currentQuiz.answer) {
            alert('Congratulations! You correctly identified the pointless answer. You win nothing!');
        } else {
            alert('Wrong. The correct answer is ' + currentQuiz.answer + '. You have been assigned disappointment.');
        }

        // Reset the selection
        const optionButtons = document.querySelectorAll('.options .option');
        optionButtons.forEach(btn => btn.classList.remove('selected'));
        selectedOption = null;
    });
});