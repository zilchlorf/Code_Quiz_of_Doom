// pos is position of where the user in the test or which question on
var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, correct = 0;
// this is a multidimensional array with 4 inner array elements with 5 elements inside them
var questions = [
    ["What is 36 + 42?", "64", "78", "76", "B"],
    ["What is 7 x 4?", "21", "27", "28", "C"],
    ["What is 16 / 4?", "4", "6", "3", "A"],
    ["What is 8 x 12?", "88", "112", "96", "C"]
];

// this get function is short for the getElementById function	

var timerEl = document.getElementById("TimeRemaining");
var StartQuizBtn = document.getElementById("StartQuizBtn")

StartQuizBtn.onclick = StartQuiz;
function get(x) {
    return document.getElementById(x);
}

function StartQuiz() {
    var timeLeft = 120;

    var timeInterval = setInterval(function () {
        //you need to define timerEl before it's called
        timerEl.textContent = timeLeft + " seconds remaining";
        timeLeft--;

        if (timeLeft === 0) {
            timerEl.textContent = "";
            StoreResults();
            clearInterval(timeInterval);
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