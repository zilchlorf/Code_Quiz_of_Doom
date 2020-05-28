// Variable declaration (pos is position of where the user in the test or which question on)

var pos = 0
var correct = 0
var test
var test_status
var question
var choice
var choices
var chA
var chB
var chC

// this is a multidimensional array with 4 inner array elements with 5 elements inside them// this method was selected after searching the web for different options to apply within a quiz
var questions = [
    ["What is HTML?", "Hyper-tenuous mimic language", "A markup language that is a set of markup tags", "A kind of disinfectant", "B"],
    ["What is CSS?", "Corrosive snake skin", "A language of the ancient tribes of Cascadia", "CSS is a language used to detail the presentation of a web page", "C"],
    ["what is javascript used for?", "to create responsive, interactive elements for web pages, enhancing the user experience.", "A coffee replacement", "Forcasting predictions of coffee shortages", "A"],
    ["what is jQuery used for?", "Asking for money from potential donators", "Cleaning out your laptop's cup holder", "It can be used to make code simple, concise and reusable", "C"]
];

var timerEl = get("TimeRemaining");
var StartQuizBtn = get("StartQuizBtn")

// this get function is short for the getElementById function	
function get(x) {
    return document.getElementById(x);
}
StartQuizBtn.onclick = StartQuiz;

get("test").style.display = "none";
function showDiv() {
    get("test").style.display = "block";
}

function StartQuiz() {
    showDiv();
    var timeLeft = 30;

    var timeInterval = setInterval(function () {
        timerEl.textContent = timeLeft + " seconds remaining";
        timeLeft--;

        if (timeLeft === -1) {
            alert("Time's Up")
            timeLeft.textContent = "";
            // SaveScore();
        }
        if (timeLeft < 0) {
            clearInterval(timeInterval)
        }

    }, 1000);
}

function renderQuestion() {
    test = get("test");
    if (pos >= questions.length) {
        test.innerHTML = "<h2>You got " + correct + " of " + questions.length + " questions correct</h2>";
        get("test_status").innerHTML = "Test completed";
        // resets the variable to allow users to restart the test
        pos = 0;
        correct = 0;
        // stops rest of renderQuestion function running when test is completed
        return false;

    }
    get("test_status").innerHTML = "Question " + (pos + 1) + " of " + questions.length;
    question = questions[pos][0];
    chA = questions[pos][1];
    chB = questions[pos][2];
    chC = questions[pos][3];
    test.innerHTML = "<h3>" + question + "</h3>";
    // the += appends to the data we started on the line above
    test.innerHTML += "<input type='radio' name='choices' value='A'> " + chA + "<br>";
    test.innerHTML += "<input type='radio' name='choices' value='B'> " + chB + "<br>";
    test.innerHTML += "<input type='radio' name='choices' value='C'> " + chC + "<br><br>";
    test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}

function checkAnswer() {
    // use getElementsByName because we have an array which it will loop through
    choices = document.getElementsByName("choices");
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            choice = choices[i].value;
        }
    }
    // checks if answer matches the correct choice
    if (choice == questions[pos][4]) {
        //each time there is a correct answer this value increases
        correct++;
    }
    // changes position of which character user is on
    pos++;
    // then the renderQuestion function runs again to go to next question
    renderQuestion();
}
window.addEventListener("load", renderQuestion, false);

// TRYING TO GET SCORE TO WORK

// function totalScore() {
//     let score = 0;
//     get("ScoreCount").innerHTML = score;
//     if (choice == questions[pos][4])) {
//         score++;
//     }
//     else {
//         score--;
//     }
//     score.textContent = "current score:" + score ;
// }

//TRYING TO GET SAVED SCORE TO WORK

// const username = get("username")
// const saveScoreBtn = get('saveScoreBtn')
// username.addEventListener('keyup', username) 
// console.log(username.value);
// SaveHighScoreBtn.onclick = SaveHighScore();
// SaveHighScore(event); {
//     console.log("clicked the save button");
//     e.preventDefault();
// }
