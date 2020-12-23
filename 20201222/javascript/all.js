let answer; 
let leftTimes = 10;
let totalTimes = leftTimes;
const start = document.getElementById("start");
const restart = document.getElementById("restart");
const cheat = document.getElementById("cheat");
const guessResults = document.getElementById("guessResults");
const userGuess = document.getElementById("userGuess");
const guess = document.getElementById("guess");
const modal = document.querySelector("modal");
const generateNumber = () => {
    let numberArray = [];
    while(numberArray.length < 4){
        let number = Math.floor(Math.random()*10);
        if(!numberArray.includes(number)) numberArray.push(number);
    }
    return numberArray;
}
const startGame = () => {
    if(start.getAttribute("disabled")) {return;}
    clear();
    answer = generateNumber();
    btnControl("start");
}
const abortGame = () => {
    if(restart.getAttribute("disabled")) {return;}
    clear();
    btnControl("restart");
    leftTimes = 10;
}
const showAnswer = () => {
    if(!cheat.getAttribute("disabled")) alert(`答案為 : ${answer.join('')}`);
}
const clear = () => {
    guessResults.innerHTML = "";
}
const doGuess = () => {
    let input = userGuess.value;
    let inputArray = input.split('');
    let inputArrayNumber = inputArray.map(item => parseInt(item));
    let inputSet = new Set(inputArrayNumber);
    if(inputArrayNumber.includes(NaN) || inputArrayNumber.length > 4 || inputArrayNumber == 0 || inputSet.size < 4){
        alert("請輸入4個不重複數字!");
        userGuess.value = "";
        return;
    }

    leftTimes -= 1; //先過防呆，再扣次數
    let A = answer.filter((e,i) => i == inputArrayNumber.indexOf(e)).length;
    let B = answer.filter(e => inputSet.has(e)).length;
    render(A,B-A,input,leftTimes);
    winGame(A);
}
const render = (A, B, input) => {
    let li = document.createElement("li");
    li.setAttribute("class","list-group-item");
    let className = A == 4 ? "success" : A == 3 ? "primary" : A == 2 ? "warning" : A == 1 ? "info": "danger";
    let colorClassName = leftTimes == 0 ? "danger" : "warning";

    let span = document.createElement("span");
    span.classList.add("label",`label-${className}`,"mr-1","ml-1");
    span.textContent = `${A}A${B}B`;

    let spanColor = document.createElement("span");
    spanColor.classList.add(`text-${colorClassName}`);
    spanColor.textContent = leftTimes;
    
    li.append("剩餘次數 : ",spanColor,`/${totalTimes}`, span, `猜測 : ${input}`);
    guessResults.appendChild(li);
}
const winGame = (A)=>{
    if(A == 4 && leftTimes == 0){
        setTimeout(function(){
            alert("驚險過關!!!!");
            btnControl("pass");
        },500)
    }else if(A == 4){
        setTimeout(function(){
            let words = ["猜對!! 很棒!!👊🏻👊🏻👊🏻", "幹! 超強的啦!!🤙", "唉唷!! 不錯喔!!👍👍", "對了，真的假的啦!!"]
            alert(words[Math.floor(Math.random() * words.length)]);
            btnControl("end");
        },500);
    }else if(leftTimes == 0){
        setTimeout(function(){
            alert("失敗，大俠請重新來過!");
            btnControl("gameOver");
        },400);
    }
}
const btnControl = (status) =>{
    switch(status){
        case "start":
            start.setAttribute("disabled",true);
            restart.removeAttribute("disabled");
            cheat.removeAttribute("disabled");
            userGuess.removeAttribute("disabled");
            guess.removeAttribute("disabled");
            userGuess.value = "";
            break;
        case "end":
        case "restart":
        case "pass":
            start.removeAttribute("disabled");
            restart.setAttribute("disabled",true);
            cheat.setAttribute("disabled",true);
            userGuess.setAttribute("disabled",true);
            guess.setAttribute("disabled",true);
            userGuess.value = "";
            break;
        case "gameOver":
            start.setAttribute("disabled",true);
            restart.removeAttribute("disabled");
            cheat.setAttribute("disabled",true);
            userGuess.setAttribute("disabled",true);
            guess.setAttribute("disabled",true);
            userGuess.value = "";
            break;
        default:
            restart.setAttribute("disabled",true);
            cheat.setAttribute("disabled",true);
            userGuess.setAttribute("disabled",true);
            guess.setAttribute("disabled",true);

            
    }
}

btnControl();

start.addEventListener("click",startGame);
restart.addEventListener("click",abortGame);
cheat.addEventListener("click",showAnswer);
guess.addEventListener("click", function(){
    if(!guess.getAttribute("disabled"))  doGuess();
})
userGuess.addEventListener("keyup",function(event){
    if(event.code == "Enter") doGuess();
        // keyCode == 13，keyCode已被棄用
})
