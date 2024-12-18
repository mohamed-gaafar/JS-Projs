let countSpan = document.querySelector(".count span");
let bulletSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let bullets = document.querySelector(".bullets");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");


let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

function getQuestions() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questionsObject = JSON.parse(this.responseText);
            let questionsCount = questionsObject.length;

            createBullets(questionsCount); 

            addQuestionData(questionsObject[currentIndex], questionsCount);

            countdown(10, questionsCount);

            submitButton.onclick = () => {
                let theRightAnswer = questionsObject[currentIndex].right_answer;

                currentIndex++;

                checkAnswer(theRightAnswer, questionsCount);

                quizArea.innerHTML = "";
                answersArea.innerHTML = "";

                addQuestionData(questionsObject[currentIndex], questionsCount);


                handleBullets();

                showResults(questionsCount);

                clearInterval(countdownInterval);
                countdown(10, questionsCount);

            };
        }
    };

    myRequest.open("GET", "html_questions.json", true);
    myRequest.send();
}

getQuestions();

function createBullets(num) {
    countSpan.innerHTML = num;

    for (let i = 0 ; i < num ; i++) {
        let theBullet = document.createElement("span");

        if (i === 0){
            theBullet.className = "on";
        }

        bulletSpanContainer.appendChild(theBullet);
    }
}

function addQuestionData (obj, count) {
    if (currentIndex < count) {
    let questionTitle = document.createElement("h2");
    let questionText = document.createTextNode(obj['title']);

    questionTitle.appendChild(questionText);
    quizArea.appendChild(questionTitle);

    for (let i = 1 ; i <= 4 ; i++) {
        let mainDiv = document.createElement("div");
        mainDiv.className = "answer";
        
        let radioInput = document.createElement("input");

        radioInput.name = "question";
        radioInput.type = "radio";
        radioInput.id = `answer_${i}`;
        radioInput.dataset.answer = obj[`answer_${i}`];

        let theLabel = document.createElement("label");
        theLabel.htmlFor = `answer_${i}`;

        let theLabelText = document.createTextNode(obj[`answer_${i}`]);
        theLabel.appendChild(theLabelText);

        mainDiv.appendChild(radioInput);
        mainDiv.appendChild(theLabel);

        answersArea.appendChild(mainDiv);
    }
}
}

function checkAnswer(rAnswer, count) {
    let answers = document.getElementsByName("question");
    let theChoosenAnswer;

    for (let i = 0 ; i < answers.length ; i++) {
        if (answers[i].checked) {
            theChoosenAnswer = answers[i].dataset.answer;
        }
    }

    if (rAnswer === theChoosenAnswer) {
        rightAnswers++;
    }
}

function handleBullets() {
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from (bulletsSpans);
    arrayOfSpans.forEach((span, index) => {
        if (currentIndex === index) {
            span.className = "on";
        }
    });
}

function showResults(count) {
    let theResults;
    if (currentIndex === count) {
        quizArea.remove();
        answersArea.remove();
        submitButton.remove();
        bullets.remove();
    

    if (rightAnswers > (count / 2 )&& rightAnswers < count) {
        theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
    }else if (rightAnswers === count) {
        theResults = `<span class="Perfect">perfect</span>, All Answers Is Good`;
    }else {
        theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
    }

    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";
    }
}

function countdown (duration, count) {
    if (currentIndex < count) {
        let min, sec;
        countdownInterval = setInterval(function() {
            min = parseInt(duration / 60);
            sec = parseInt(duration % 60);

            min = min < 10 ? `0${min}` : min;
            sec = sec < 10 ? `0${sec}` : sec;

            countdownElement.innerHTML = `${min}:${sec}`;

            if(--duration < 0) {
                clearInterval(countdownInterval);
                submitButton.click();
                
            }
        }, 1000);
    }
}