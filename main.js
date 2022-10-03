const btnStart = document.querySelector(".start");
const screenBox = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const times = document.querySelector("#time");
const board = document.querySelector("#board");
const COLORSCIRCLE = ["#FFFFFF", "#c000ff", "#90f177"];

let maxSizeCircle = 30;
let minSizeCircle = 10;

//Передаем выбранное время
let time = 0;

// Конечный счет
let score = 0;

// Начинаем игру
btnStart.addEventListener("click", (e) => {
    e.preventDefault();
    screenBox[0].classList.add("up");
});

//Передаем выбранное время и запускаем доску
timeList.addEventListener("click", (e) => {
    if(e.target && e.target.tagName === "BUTTON"){
        time = parseInt(e.target.getAttribute("data-time"));
        startGame();
    }
});

// Прослушиваем доску и увеличиваем счет при клике на шар
board.addEventListener("click", (e) => {
    if(e.target.classList.contains("circle","oranges", "blues", "ran")){
        score++
        e.target.remove();
        createCircle ();
    }
})

// Запускаем таймер и функцию создающую шарик
function startGame (){
    screenBox[1].classList.add("up");
    createCircle ();

    const startTimer = setInterval(() => {
        time =+ time - 1;
        if( time < 10){
         time =`0${time}`;
        }

        times.innerHTML = `00 : ${time}`;

        if(time <= 0){
            clearInterval(startTimer);
            finishGame();
        }
    },1000);
}
//Выводим счет по окончанию времени
function finishGame () {
    times.parentNode.classList.add("hide");
    //Создаем кнопку рестарта
    const btnRestart = document.createElement("button");
    btnRestart.classList.add("btn-restart");
    screenBox[2].append(btnRestart);
    btnRestart.innerHTML="RESTART";
    //Выводим счет 
    board.innerHTML =`<h1> Score: ${score}</h1>`;
    //Кнопка рестарта
    btnRestart.addEventListener("click", () => {
        screenBox.forEach(item => {
            item.classList.remove("up")
        })
        times.parentNode.classList.remove("hide");
        board.innerHTML = "";
        btnRestart.remove();
        score = 0;
    })

}

//Создаем шар рандомного размера и в рандомном месте
function createCircle () {
    const circle = document.createElement("div");

    const {width, height} = board.
    getBoundingClientRect();

    let sizeCircle = Math.round(Math.random()*(maxSizeCircle - minSizeCircle) + minSizeCircle);
    let x = Math.floor(Math.random() * (width - (sizeCircle * 2)));
    let y = Math.floor(Math.random() * (height - (sizeCircle * 2)))

    circle.classList.add("circle");
    circle.style.background = COLORSCIRCLE [Math.floor(Math.random() * COLORSCIRCLE.length)]
    circle.style.width =`${sizeCircle}px`;
    circle.style.height =`${sizeCircle}px`;
    circle.style.top =`${x}px`;
    circle.style.left=`${y}px`;
    board.append(circle);
}
