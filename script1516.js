let currentQuestionIndex = 0;
let score = 0;
let wrong = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestion(questionIndex) {
    const question = questions[questionIndex];
    document.getElementById('question').innerText = question.question;

    const optionsList = document.getElementById('options');
    optionsList.innerHTML = '';
    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.id = `option${index}`;
        radio.name = 'option';
        radio.value = index;
        radio.addEventListener('change', () => {
            // Uncheck other radio buttons
            document.querySelectorAll('input[name=option]').forEach((r, i) => {
                if (i !== index) {
                    r.checked = false;
                }
            });
        });
        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        optionsList.appendChild(label);
        optionsList.appendChild(document.createElement('br'));
    });

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit Answer';
    submitButton.addEventListener('click', () => {
        checkAnswer(questionIndex);
    });
    optionsList.appendChild(submitButton);

    const progressLabel = document.createElement('p');
    progressLabel.innerText = `Question ${questionIndex + 1}/${questions.length}`;
    optionsList.appendChild(progressLabel);
}


function checkAnswer(questionIndex) {
    const question = questions[questionIndex];
    const correctOptions = question.answer;

    let selectedOptions = [];
    question.options.forEach((option, index) => {
        if (document.getElementById(`option${index}`).checked) {
            selectedOptions.push(index);
        }
    });
    
    let selectedA = selectedOptions[0] + 1

    let isCorrect = true;
    if (selectedA != correctOptions) {
        isCorrect = false;
        msg = 'Incorrect! Your answer is: ' + question.options[selectedA-1] + '. The CORRECT one is: ' + question.options[correctOptions - 1];
        wrong.push(questionIndex + 1);
        window.alert(msg);
    }

    if (isCorrect) {
        window.alert('Correct!');
        score++;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
}

function goToHomePage() {
    window.location.href = 'index.html';
}

function showResult() {
    let msg = 'The following questions are wrong:';
    for(let i = 0;i < wrong.length; i ++) {
        msg = msg + wrong[i] + '. ';
    }
    console.log(msg);
    document.getElementById('question').innerText = `Quiz completed! Your score: ${score}/${questions.length}`;
    document.getElementById('options').innerHTML = '';
    document.getElementById('result').innerText = msg;
    document.getElementById('submit').style.display = 'none';
}

// Load the JSON data
fetch('chp1516.json')
  .then(response => response.json())
  .then(data => {
    questions = data.questions;
    loadQuestion(currentQuestionIndex);
  })
  .catch(error => console.error('Error loading the JSON file:', error));


