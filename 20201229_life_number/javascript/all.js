const dateTimePicker = document.querySelector("input");
const submit = document.querySelector("#submit");
let today = new Date();
let todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
dateTimePicker.value = todayString;
let selectDate;
let constellation;
let lifeNumber;
let info;
let contellationArray = [
    {start:{month:1,date:21},end:{month:2,date:19}, eng:"Aquarius", cht:"水瓶座"},
    {start:{month:2,date:20},end:{month:3,date:20},eng:"Pisces",cht:"雙魚座"},
    {start:{month:3,date:21},end:{month:4,date:19},eng:"Aries",cht:"牡羊座"},
    {start:{month:4,date:20},end:{month:5,date:20},eng:"Taurus",cht:"金牛座"},
    {start:{month:5,date:21},end:{month:6,date:21},eng:"Gemini",cht:"雙子座"},
    {start:{month:6,date:22},end:{month:7,date:22},eng:"Cancer",cht:"巨蟹座"},
    {start:{month:7,date:23},end:{month:8,date:22},eng:"Leo",cht:"獅子座"},
    {start:{month:8,date:23},end:{month:9,date:22},eng:"Virgo",cht:"處女座"},
    {start:{month:9,date:23},end:{month:10,date:23},eng:"Libra",cht:"天秤座"},
    {start:{month:10,date:24},end:{month:11,date:21},eng:"Scorpio",cht:"天蠍座"},
    {start:{month:11,date:22},end:{month:12,date:20},eng:"Sagittarius",cht:"射手座"},
    {start:{month:12,date:21},end:{month:1,date:20},eng:"Capricorn",cht:"摩羯座"}
]

const getConstellation = (selectedDate) => {
    let month = new Date(selectedDate).getMonth() + 1;
    let date = new Date(selectedDate).getDate();
    return contellationArray.find(item => item.start.month == month && item.start.date <= date || item.end.month == month && item.end.date >= date);
}
const getLifeNumber = (selectedDate) => {
    return recursion(selectedDate.split("-").join(""))
}
const recursion = (value) => {
    return parseInt(value) >= 10 ? recursion(value.toString().split("").reduce((a,b)=> a + parseInt(b), 0)) : value;
}
const displayInfo = () => {
    document.querySelector(".row").classList.add("growup");
    setTimeout(function(){
        let span = document.createElement("span");
        let span_constellation = document.createElement("span");
        span.innerText = selectedDate;
        span.classList.add(`${constellation.eng}`);
        document.querySelector(".info-birthday").innerHTML = "";
        document.querySelector(".info-birthday").append(span," 出生的您，");
        span_constellation.classList.add(`${constellation.eng}`);
        span_constellation.innerText = constellation.cht;
        document.querySelector(".info-constellation").innerHTML = "";
        document.querySelector(".info-constellation").append("星座 : ",span_constellation);
        document.querySelector(".info-words").innerHTML = `生命剖析 : ${info}`;
        document.querySelector(".info-lifeNumber").innerHTML = `你的生命靈數 : ${lifeNumber}`;
    },250)
}

const ajax = (key,value) => {
    let url = "https://buildschoolapi.azurewebsites.net/api/number/GetNumerology";
    $.ajax({
        type : "Get",
        url : url,
        data : {
            constellation:key,
            number:value
        },
        dataType:"text", //回傳格式為 text
        success: function (res) {
            info = res;   
            displayInfo();
        },
        error: function(err){
            console.log(err)
        }
    })
}
const allProcedures = () =>{
    selectedDate = dateTimePicker.value;
    constellation = getConstellation(selectedDate);
    lifeNumber = getLifeNumber(selectedDate);
    if(constellation == undefined){
        alert("請輸入正確日期格式!");
        return;
    }else{
        let engConstellation = constellation.eng.toLowerCase();
        ajax(engConstellation,lifeNumber);
    }
}

submit.addEventListener("click",allProcedures);

dateTimePicker.addEventListener("keyup",function(event){
    if(event.code == "Enter") allProcedures();
})


