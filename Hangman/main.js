const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = "letter-box";
    lettersContainer.appendChild(span);
});

const words = {
    Movies: ["the matrix", "star wars", "joker", "titanic", "the lion king", "meg", "john wick", "spider man", "avengers", "toy story", "harry potter", "deadpool", "avatar"],
    "Series (Mosalsalat)": ["see", "prison break", "game of thrones", "the 100", "vikings", "suits", "lost", "the witcher", "reacher"],
    "Famous Football Players": ["messi", "cristiano", "neymar", "ozil", "luis suarez", "ramos", "benzema", "mohamed salah"],
    "Arab Countries": ["syria", "palestine", "yemen", "egypt", "bahrain", "qatar", "irag"],
    Anime: ["death note", "one piece", "naruto", "demon slayer", "one punch man", "hunter", "atack on titan", "jujutsu", "black clover", "bleach", "fire force"]
}

let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];
document.querySelector(".category span").innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueValue);

lettersAndSpace.forEach((letter) => {
    let emptySpan = document.createElement("span");

    if (letter === ' ') {
        emptySpan.className = "with-space";
    }

    lettersGuessContainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");

let wrongAttempts = 0;
let test = [];

let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {

    let theStatus = false;
    let count = 0;
    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        let theChosenWord = Array.from(randomValueValue.toLowerCase());


        theChosenWord.forEach((wordLetter, wordIndex) => {
            if (theClickedLetter == wordLetter) {

                theStatus = true;
                count++;
                guessSpans.forEach((span, spanIndex) => {
                    if (wordIndex === spanIndex) {
                        span.innerHTML = theClickedLetter;
                        test.push(theClickedLetter);
                    }
                });

            }

        });

        // outside Loop 
        // of the letter is wrong

        if (theStatus !== true) {
            wrongAttempts++;

            theDraw.classList.add(`wrong-${wrongAttempts}`);

            document.getElementById("fail").play();

            if (wrongAttempts === 8) {
                endgame();

                lettersContainer.classList.add("finished");
            }

        } else {
            document.getElementById("success").play();
            if ( wrongAttempts < 8 && theChosenWord.length === test.length) {
                let div = document.createElement("div");
                div.innerHTML = `Congrates, <br> The Word was "${randomValueValue}" <br> YOU ARE SMART , <br> but not too much. <br> <br> <br> you should go and try it again <br> ya Abn Coom Shkair el Asmant`;
                div.className = "popup";
                document.body.appendChild(div);
            }
        }
    }
});


function endgame() {
    let div = document.createElement("div");
    div.innerHTML = `Game Over,<br> The Word is "${randomValueValue}" . <br> <br> I will tell you something you may not know, <br> YOU ARE VERY STUPID. <br> My little brother solves it easily. <br> you should go and try it again <br> ya Abn Coom Shkair el Asmant `;
    div.className = "popup";
    document.body.appendChild(div);
}

