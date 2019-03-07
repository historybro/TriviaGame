var timeoutAnswer = 0;
var qright = 0;
var qwrong = 0;
var questionTime = 30;
var questionNumber = 0;
var intervalId;
var timeAllowed = questionTime;
var images = ["assets/images/pic1.jpg","assets/images/carl.jpg", "assets/images/meatwad.png", "assets/images/frylock.png", "assets/images/Master_Shake.png", "assets/images/logo.png"]
var grades = ["F","D","C","B","A"]
var lastWord = ["really bad...", "bad...", "alright.", "good.", "great!"]
var questions = [
    {
        question: "What is Carl's last name?",
        choices: {
            a: "Sagan",
            b: "Grimes",
            c: "Brutananadilewski",
            d: "Smith"
        },
        correctChoice: "c",
        pic: "assets/images/carl.jpg"
    },
    {
        question: "What shapes can Meatwad form?",
        choices: {
            a: "Hotdog",
            b: "Igloo",
            c: "Samurai Lincoln",
            d: "All of the above"
        },
        correctChoice: "d",
        pic: "assets/images/meatwad.png"
    },
    {
        question: "Who played Frylock in the live-action episode?",
        choices: {
            a: "T-Pain",
            b: "Ludacris",
            c: "H. Jon Benjamin",
            d: "A box of fries"
        },
        correctChoice: "a",
        pic: "assets/images/frylock.png"
    },
    {
        question: "What flavor is Master Shake's interior?",
        choices: {
            a: "Vanilla",
            b: "Pistachio",
            c: "Mint Chunk",
            d: "Chocolate"
        },
        correctChoice: "b",
        pic: "assets/images/Master_Shake.png"
    },
    {
        question: "What show did ATHF originate from?",
        choices: {
            a: "None, it was an original creation",
            b: "The Brak Show",
            c: "Toonami",
            d: "Space Ghost Coast to Coast"
        },
        correctChoice: "d",
        pic: "assets/images/logo.png"
    }
];


function startQuiz() {
    pushQ();
}

function startClock() {
    timeAllowed = questionTime;
    intervalId = setInterval(count, 1000);
}


function stopClock() {
    clearInterval(intervalId);
}

function count() {    
    timeAllowed--;
    $("#timeLeft").text(timeAllowed + "s");
    if(timeAllowed === 0) {
        stopClock();
        timeoutAnswer++;
        qwrong++;        
        nextQuestion();
    }

}

function nextQuestion() {
    stopClock();
    startClock();
    questionNumber++;
    $("#questionNumb").text(questionNumber+1);    
    if (questionNumber < questions.length) {
        pushQ();
    } else {
        stopClock();
        quizComplete();
        $("#quiz").hide();
        $("#thanks").show();
    }
}

function pushQ() {
    $("#question").html(questions[questionNumber].question);
    console.log(questions[questionNumber].question);
    $("#answerA").html(questions[questionNumber].choices.a);
    $("#answerB").html(questions[questionNumber].choices.b);
    $("#answerC").html(questions[questionNumber].choices.c);
    $("#answerD").html(questions[questionNumber].choices.d);
}

function resetAll() {
    $("#pic").attr("src", images[0]);
    $("#timeAllowed").html(questionTime);
    $("#welcome").show();
    $("#quiz").hide();
    //$("answered").hide();
    $("#thanks").hide();
    timeoutAnswer = 0;
    qright = 0;
    qwrong = 0;
    timeAllowed = questionTime;
    questionNumber = 0;
    timeout = false;
    answerchoice = [];
    pushQ();

}

function checkAnswer() {
    var correctAnswer = questions[questionNumber].correctChoice;
    var answerChoice = $("input[name='exampleRadios']:checked").val();
    if (correctAnswer === answerChoice) {
        qright++;
    } else {
        qwrong++;
    }
}

function quizComplete() {
    $("#qright").html(qright);
    $("#qwrong").html(qwrong);
    $("#runOut").html(timeoutAnswer);
    $("#grade").html(grades[qright]);
    $("#lastWord").html(lastWord[qright]);

}

$("#beginbtn").click(function () {
    startQuiz();
    $("#welcome").hide();
    $("#quiz").show();
    console.log("Clicked Begin");
    startClock();
    $("#questionNumb").text(questionNumber+1);
    $("#pic").attr("src", images[questionNumber + 1]);
});

$("#submitbtn").click(function () {
    stopClock();
    checkAnswer();
    nextQuestion();
    $("#pic").attr("src", images[questionNumber + 1]);

    console.log("Clicked Submit");
    console.log("Question Number:" + questionNumber);
    console.log(questions);
});

$("#resetbtn").click(function () {
    resetAll();
    console.log("Clicked Reset");
    console.log("Question Number:" + questionNumber);
    console.log(questions);
});


$(document).ready(function () {
    console.log("ready!");
    console.log("Question Number:" + questionNumber);
    resetAll();
});