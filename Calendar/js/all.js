const weekArray = [{ch:"日",eng:"Sun"}, {ch:"一",eng:"Mon"},{ch:"二",eng:"Tue"},{ch:"三",eng:"Wed"},{ch:"四",eng:"Thu"},{ch:"五",eng:"Fri"},{ch:"六",eng:"Sat"}];
const festivals = [{month:0,festival:"1/1(五) 元旦"},{month:1,festival:"2/10(三) 除夕"},{month:1,festival:"2/11(四) 春節"},,{month:1,festival:"2/26(五) 元宵節"},{month:1,festival:"2/28(日) 和平紀念日"},{month:2,festival:"3/8(一) 婦女節"},{month:3,festival:"4/4(日) 清明節"},{month:3,festival:"4/5(一) 兒童節"},{month:4,festival:"5/1(六) 勞動節"},{month:4,festival:"5/9(日) 母親節"},{month:5,festival:"6/14(一) 端午節"},{month:7,festival:"8/8(日) 父親節"},{month:8,festival:"9/21(二) 中秋節"},{month:8,festival:"9/28(二) 教師節"},{month:9,festival:"10/10(日) 國慶日"},{month:9,festival:"10/14(四) 重陽節"},{month:11,festival:"12/25(六) 聖誕節"}]
let today = {}
let calendarDay = {}
let dayArray = []
let monthEng = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "Augest",
    8: "September",
    9: "October",
    10: "Novermber",
    11: "December"
}
let todos = JSON.parse(localStorage.getItem("todos")) || []
let found;
let modal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false
})
const createWeek = () => {
    const weekTemplate = document.querySelector("#week");

    weekArray.forEach(item => {
        const clonedWeek = weekTemplate.content.cloneNode(true);
        clonedWeek.querySelector(".week").innerHTML =`<span>${item.ch}</span><span class="eng">${item.eng}</span>`;;

        document.querySelector(".calendar-weeks-title").appendChild(clonedWeek);
    })
}
const setToday = () => {
    let day = new Date();
    return {
        year: day.getFullYear(),
        month: day.getMonth(),
        date: day.getDate(),
        weekDay: day.getDay()
    }
}
const getThisMonthFirstDay = ({
    year,
    month
}) => {
    let day = new Date(year, month, 1);
    return day.getDay();
}
const getThisCalendarFirstDay = ({
    year,
    month
}) => {
    dayArray = [];

    for (let i = 0; i < 42; i++) {
        let day = new Date(year, month, 1 - getThisMonthFirstDay(calendarDay) + i);
        dayArray.push({
            year: day.getFullYear(),
            month: day.getMonth(),
            date: day.getDate(),
            weekDay: day.getDay()
        })
    }
}
const createCalendar = (calendarDay) => {
    getThisCalendarFirstDay(calendarDay);
    document.querySelector(".calendar-weeks-day").innerHTML = "";
    const dayTemplate = document.querySelector("#day");
    dayArray.forEach(item => {
        const clonedDay = dayTemplate.content.cloneNode(true);
        let color = item.year == today.year && item.month == today.month && item.date == today.date ? "today" : 
            item.month != calendarDay.month ? "other-month" :
            item.weekDay == 0 || item.weekDay == 6 ? "weekend" : "this-month";

        clonedDay.querySelector(".day .day-item-list").setAttribute("data-year", item.year);
        clonedDay.querySelector(".day .day-item-list").setAttribute("data-month", item.month);
        clonedDay.querySelector(".day .day-item-list").setAttribute("data-day", item.date);
        clonedDay.querySelector(".day .day-date").setAttribute("data-day", item.date);
        clonedDay.querySelector(".day").classList.add(color);
        document.querySelector(".calendar-weeks-day").appendChild(clonedDay);
    })

    document.querySelector(".calendar-heading-title h2 .title-year").textContent = calendarDay.year;
    document.querySelector(".calendar-heading-title h2 .title-mon").textContent = `${monthEng[calendarDay.month]}`;
    document.querySelector(".calendar-heading-title h2 .title-mon-num").textContent = calendarDay.month + 1;

    showTodos();
    addItemBydblClick();
}
const createBackground = () => {
    let i = 0;
    while (i < 12) {
        let div = document.createElement("div");
        if (i != 0) div.classList.add("opacity");
        div.setAttribute("style", `background:url('./images/${i + 1}.jpg') no-repeat center center;position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;`);
        div.setAttribute("data-month", i);
        document.querySelector(".calendar-title").appendChild(div);
        i++;
    }
}
const showFestival = () => {
    let festivalDay = document.querySelector(".festival-day");
    festivalDay.innerHTML = "";
    festivals.filter(item=> item.month == calendarDay.month).forEach(item=>{
        let li = document.createElement("li")
        li.textContent = item.festival;
        festivalDay.appendChild(li);
    })
}
const addTodos = () => {
    let date = document.querySelector(".modal-body input[type='date']").value.trim();
    let time = document.querySelector(".modal-body input[type='time']").value.trim();
    let content = document.querySelector(".modal-body input[type='text']").value.trim();

    if (date.length == 0 || time.length == 0 || content.length == 0) {
        alert("請完整填寫!");
        return;
    } else {
        let obj = {
            date,
            time,
            content
        };
        todos.push(obj);
        window.localStorage.setItem("todos", JSON.stringify(todos));

        document.querySelector(".modal-body input[type='date']").value = "";
        document.querySelector(".modal-body input[type='time']").value = "";
        document.querySelector(".modal-body input[type='text']").value = "";
        return "done";
    }
}
const showTodos = () => {
    let arr = Array.from(document.querySelectorAll(".day .day-item-list"));
    arr.forEach(item => {
        item.innerHTML = "";
    })
    todos.forEach(item => {
        let p = document.createElement("p");
        p.classList.add("item", "my-2");
        p.setAttribute("data-date", item.date);
        p.setAttribute("data-time", item.time);
        p.setAttribute("data-content", item.content);
        p.textContent += `${item.time} - ${item.content}`;
        let button = document.createElement("button");
        button.classList.add("rounded-circle", "btn", "far", "fa-times-circle", "delete");
        p.append(button);

        let found = arr.find(findItem => {
            return findItem.dataset.year == item.date.split("-")[0] &&
                findItem.dataset.month == `${parseInt(item.date.split("-")[1]) - 1}` &&
                findItem.dataset.day.padStart(2, "0") == item.date.split("-")[2]
        })
        if (found) found.append(p);

        editModel();
        deleteModel();
    })
}
const deleteItem = (item, e) => {
    e.stopPropagation();
    if (confirm("你確定刪除嗎?")) {
        let index = todos.findIndex(x => x.date == item.parentNode.dataset.date && x.time == item.parentNode.dataset.time && x.content == item.parentNode.dataset.content)
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        showTodos();
    }
}
const deleteModel = () => {
    document.querySelectorAll(".delete").forEach(item => {
        item.addEventListener("click", function (e) {
            deleteItem(this, e);
        })
    })
}
const editModel = () => {
    document.querySelectorAll(".item").forEach(item => {
        item.addEventListener("click", function () {
            modal.show();
            document.querySelector("h5.edit-title").style.display = "block";
            document.querySelector("button.save").style.display = "none";
            document.querySelector("h5.add-title").style.display = "none";
            document.querySelector("button.edit").style.display = "inline-block";

            document.querySelector(".modal-body input[type='date']").setAttribute("value", item.dataset.date);
            document.querySelector(".modal-body input[type='time']").setAttribute("value", item.dataset.time);
            document.querySelector(".modal-body input[type='text']").setAttribute("value", item.dataset.content);
        })
    })
}
const editTodos = () => {
    let editedDate = document.querySelector(".modal-body input[type='date']").value.trim();
    let editedTime = document.querySelector(".modal-body input[type='time']").value.trim();
    let editedContent = document.querySelector(".modal-body input[type='text']").value.trim();

    found = todos.find(x => x.date == item.dataset.date && x.time == item.dataset.time && x.content == item.dataset.content);
    found.date = editedDate;
    found.time = editedTime;
    found.content = editedContent;

    localStorage.setItem("todos", JSON.stringify(todos));
}
const addItemBydblClick = () => {
    document.querySelectorAll(".day-item-list").forEach(item => {
        item.addEventListener("dblclick", function () {
            modal.show();
            document.querySelector("h5.add-title").style.display = "block";
            document.querySelector("button.save").style.display = "inline-block";
            document.querySelector("h5.edit-title").style.display = "none";
            document.querySelector("button.edit").style.display = "none";

            document.querySelector("input[type='date']").setAttribute("value", [this.dataset.year, (parseInt(this.dataset.month) + 1).toString().padStart(2, "0"), this.dataset.day.toString().padStart(2, "0")].join("-"));
            document.querySelector("input[type='time']").setAttribute("value", "");
            document.querySelector("input[type='text']").setAttribute("value", "");
        })
    })
}


window.addEventListener("load", function () {
    createWeek();
    calendarDay = setToday();
    today = setToday();
    createCalendar(calendarDay);
    createBackground();
    showFestival();
})
document.querySelector(".btn-today button").addEventListener("click", function () {
    calendarDay = setToday();
    createCalendar(calendarDay);
    showFestival();
});
document.querySelector(".btn-preYear button").addEventListener("click", function () {
    calendarDay.year -= 1;
    createCalendar(calendarDay);
    showFestival();
})
document.querySelector(".btn-preMonth button").addEventListener("click", function () {
    if (calendarDay.month == 0) {
        calendarDay.year -= 1;
        calendarDay.month = 11;
    } else {
        calendarDay.month -= 1;
    }
    if (calendarDay.month == 11) document.querySelector(`[data-month="${0}"]`).classList.add("opacity");
    else document.querySelector(`[data-month="${calendarDay.month + 1}"]`).classList.add("opacity");
    document.querySelector(`[data-month="${calendarDay.month}"]`).classList.remove("opacity");

    createCalendar(calendarDay);
    showFestival();
})
document.querySelector(".btn-nextMonth button").addEventListener("click", function () {
    if (calendarDay.month == 11) {
        calendarDay.year += 1;
        calendarDay.month = 0;
    } else {
        calendarDay.month += 1;
    }

    if (calendarDay.month == 0) document.querySelector(`[data-month="${11}"]`).classList.add("opacity");
    else document.querySelector(`[data-month="${calendarDay.month - 1}"]`).classList.add("opacity");
    document.querySelector(`[data-month="${calendarDay.month}"]`).classList.remove("opacity");

    createCalendar(calendarDay);
    showFestival();
})
document.querySelector(".btn-nextYear button").addEventListener("click", function () {
    calendarDay.year += 1;
    createCalendar(calendarDay);
    showFestival();
})
document.querySelector(".form-body button.save").addEventListener("click", function () {
    if (addTodos() == "done") {
        alert("儲存完畢!!!!");
        showTodos();
        modal.hide();
    }
})
document.querySelector(".form-body button.edit").addEventListener("click", function () {
    editTodos();
    showTodos();
    alert("修改完畢!!!!");
})


document.querySelector(".add-item").addEventListener("click", function () {
    document.querySelector("h5.add-title").style.display = "block";
    document.querySelector("button.save").style.display = "inline-block";
    document.querySelector("h5.edit-title").style.display = "none";
    document.querySelector("button.edit").style.display = "none";
})