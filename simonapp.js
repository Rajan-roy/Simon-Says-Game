"use strict";

let gameseq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let gamePlaying = false;

let h2 = document.querySelector("h2");

// Sounds
const sounds = {
    correct: new Audio("sounds/correct-answer.mp3"),
    wrong: new Audio("sounds/wrong-answer.mp3"),
};

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    gamePlaying = true;
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
        gamePlaying = false;
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);

    gameseq.push(randColor);
    console.log(gameseq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] !== gameseq[idx]) {
        playSound("wrong");
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br><br> Press any key to start`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 150);
        reset();
    } else if (userSeq.length === gameseq.length) {
        playSound("correct");
        setTimeout(levelUp, 1000);
    }
}

function btnPress() {
    if (gamePlaying) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameseq = [];
    userSeq = [];
    level = 0;
    gamePlaying = false;
}

function playSound(soundName) {
    if (sounds[soundName]) {
        sounds[soundName].play();
    }
}