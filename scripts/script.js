let body = document.querySelector("body");
let btnStart = document.querySelector(".btn.start");
let time = document.querySelector("#time");
let add = document.querySelector(".btn.add");
let remove = document.querySelector(".btn.remove");
let idCountDown = "";
let minus = 25;
let second = 00;
const spaceMinus = 5;
const maxMinus = 100;
const minMinus = 0;
const preUrl = "https://raw.githubusercontent.com/hyquaq/25m/master";

function updateTitle() {
    document.title = `Time ${addZero(minus)}:${addZero(second)}`;
}

function resetTitle() {
    document.title = `Time`;
}

function addZero(number) {
    return number >= 10 ? number : `0${number}`;
}

function playSound() {
    let sound = document.createElement("audio");
    sound.setAttribute("src", preUrl + "/audios/sound.wav");
    sound.autoplay = true;
    // console.log(sound);
    // document.appendChild(sound);
}

function countDown() {
    if (second === 0 && minus === 0) {
        clearInterval(idCountDown);
        playSound();
        // alert("time stop!!!");
        // btnStart.classList.remove("bx-pause");
        // btnStart.classList.add("bx-play");
        // body.classList.remove("run");
        btnStart.click();

        return;
    }
    if (second === 0 && minus !== 0) {
        minus--;
        second = 60;
    }
    second--;
    time.innerHTML = `${addZero(minus)}:${addZero(second)}`;
    updateTitle();
}

// run time
btnStart.addEventListener("click", (e) => {
    console.log(e);
    body.classList.toggle("run");
    if (e.target.classList.contains("stop")) {
        // turn off
        resetTitle();

        e.target.classList.remove("bx-pause");
        e.target.classList.add("bx-play");
        clearInterval(idCountDown);

        e.target.classList.remove("stop");
        add.classList.remove("active");
        remove.classList.remove("active");
        minus = 25;
        second = 00;
        time.innerHTML = `${addZero(minus)}:${addZero(second)}`;
    } else {
        // turn on
        updateTitle();

        e.target.classList.add("bx-pause");
        e.target.classList.remove("bx-play");
        e.target.classList.add("stop");
        // disable button add remove
        add.classList.add("active");
        remove.classList.add("active");

        idCountDown = setInterval(countDown, 1000);
    }
});

// add minus
add.addEventListener("click", (e) => {
    minus += spaceMinus;
    if (minus >= maxMinus) minus -= spaceMinus;
    time.textContent = `${addZero(minus)}:${addZero(second)}`;
});

// add minus
remove.addEventListener("click", (e) => {
    minus -= spaceMinus;
    if (minus <= minMinus) minus += spaceMinus;
    time.textContent = `${addZero(minus)}:${addZero(second)}`;
});
