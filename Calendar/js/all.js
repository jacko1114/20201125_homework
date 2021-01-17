import {
    Lunar,
    Solar,
    LunarSolarConverter
} from "./lunarToSolar.js"
const weekArray = [{
    ch: "日",
    eng: "Sun"
}, {
    ch: "一",
    eng: "Mon"
}, {
    ch: "二",
    eng: "Tue"
}, {
    ch: "三",
    eng: "Wed"
}, {
    ch: "四",
    eng: "Thu"
}, {
    ch: "五",
    eng: "Fri"
}, {
    ch: "六",
    eng: "Sat"
}];

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
let found, deg = 0;
const createWeek = () => {
    const weekTemplate = document.querySelector("#week");

    weekArray.forEach(item => {
        const clonedWeek = weekTemplate.content.cloneNode(true);
        clonedWeek.querySelector(".week").innerHTML = `<span>${item.ch}</span><span class="eng">${item.eng}</span>`;;

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
const convertWeekDay = (week) => {
    switch (week) {
        case 1:
            return "ㄧ";
        case 2:
            return "二";
        case 3:
            return "三";
        case 4:
            return "四";
        case 5:
            return "五";
        case 6:
            return "六";
        default:
            return "日"
    }

}
const getSolarFestivalDay = (dateObj, month, day, festival) => {
    let date = new Date(dateObj.year, month, day);

    return {
        month: date.getMonth(),
        day: date.getDate(),
        weekday: date.getDay(),
        festival: festival
    }
}
const getMother_Day = (dateObj) => {
    let date = new Date(dateObj.year, 4, 1);
    let firstSunday;
    let i = 0;
    do {
        date = new Date(dateObj.year, 4, 1 + i);
        firstSunday = date;
        i++;
    }
    while (date.getDay() != 0)

    return {
        month: firstSunday.getMonth(),
        day: firstSunday.getDate(),
        weekday: firstSunday.getDay(),
        festival: " 母親節"
    }
}
const getLunarFestivalDay = (year, month, day, festival) => {
    const converter = new LunarSolarConverter();
    let solar = converter.LunarToSolar(new Lunar(year, month, day));
    let newYearSolar = converter.LunarToSolar(new Lunar(year, 1, 1));
    let date = new Date(solar.solarYear, solar.solarMonth - 1, solar.solarDay);
    return {
        month: date.getMonth(),
        day: date.getDate(),
        weekday: date.getDay(),
        festival: festival
    }

}

const createCalendar = (calendarDay) => {
    getThisCalendarFirstDay(calendarDay);
    document.querySelector(".calendar-weeks-day").innerHTML = "";
    const dayTemplate = document.querySelector("#day");
    dayArray.forEach(item => {
        const clonedDay = dayTemplate.content.cloneNode(true);
        let color = item.month != calendarDay.month ? "other-month" :
            item.weekDay == 0 || item.weekDay == 6 ? "weekend" : "this-month";
        let bgColor = item.year == today.year && item.month == today.month && item.date == today.date ? "today" : "non-today";

        clonedDay.querySelector(".day .day-date").setAttribute("data-year", item.year);
        clonedDay.querySelector(".day .day-date").setAttribute("data-month", item.month);
        clonedDay.querySelector(".day .day-date").setAttribute("data-day", item.date);
        clonedDay.querySelector(".day .day-date").innerText = item.date.toString().padStart(2, "0");
        clonedDay.querySelector(".day").setAttribute("data-date", `${[item.year, (parseInt(item.month) + 1).toString().padStart(2, "0"), item.date.toString().padStart(2, "0")].join("-")}`)
        clonedDay.querySelector(".day .day-date").classList.add(color);
        clonedDay.querySelector(".day").classList.add(bgColor);
        clonedDay.querySelector(".day").onclick = function () {
            showItemList(this)
        }
        document.querySelector(".calendar-weeks-day").appendChild(clonedDay);
    })

    document.querySelector(".calendar-heading-title h2 .title-year").textContent = calendarDay.year;
    document.querySelector(".calendar-heading-title h2 .title-mon").textContent = `${monthEng[calendarDay.month]}`;
    document.querySelector(".calendar-heading-title h2 .title-mon-num").textContent = calendarDay.month + 1;

    showCount();
}
const showFestival = () => {
    let festivals = [];
    let lunarFestivalArr = [{
        y: calendarDay.year - 1,
        m: 12,
        d: 30,
        f: "除夕"
    }, {
        y: calendarDay.year,
        m: 1,
        d: 1,
        f: "春節"
    }, {
        y: calendarDay.year,
        m: 1,
        d: 15,
        f: "元宵節"
    }, {
        y: calendarDay.year,
        m: 5,
        d: 5,
        f: "端午節"
    }, {
        y: calendarDay.year,
        m: 7,
        d: 7,
        f: "七夕"
    }, {
        y: calendarDay.year,
        m: 8,
        d: 15,
        f: "中秋節"
    }, {
        y: calendarDay.year,
        m: 9,
        d: 9,
        f: "重陽節"
    }];
    let solarFestivalArr = [{
        o: calendarDay,
        m: 0,
        d: 1,
        f: "元旦"
    }, {
        o: calendarDay,
        m: 1,
        d: 14,
        f: "西洋情人節"
    }, {
        o: calendarDay,
        m: 1,
        d: 28,
        f: "和平紀念日"
    }, {
        o: calendarDay,
        m: 2,
        d: 8,
        f: "婦女節"
    }, {
        o: calendarDay,
        m: 3,
        d: 1,
        f: "愚人節"
    }, {
        o: calendarDay,
        m: 3,
        d: 4,
        f: "婦幼節"
    }, {
        o: calendarDay,
        m: 3,
        d: 5,
        f: "清明節"
    }, {
        o: calendarDay,
        m: 4,
        d: 1,
        f: "勞動節"
    }, {
        o: calendarDay,
        m: 7,
        d: 8,
        f: "父親節"
    }, {
        o: calendarDay,
        m: 8,
        d: 28,
        f: "教師節"
    }, {
        o: calendarDay,
        m: 9,
        d: 10,
        f: "國慶日"
    }, {
        o: calendarDay,
        m: 11,
        d: 25,
        f: "聖誕節"
    }]
    lunarFestivalArr.forEach(x => {
        festivals.push(getLunarFestivalDay(x.y, x.m, x.d, x.f))
    })
    solarFestivalArr.forEach(x => {
        festivals.push(getSolarFestivalDay(x.o, x.m, x.d, x.f))
    })
    festivals.push(getMother_Day(calendarDay))
    festivals.sort((a, b) =>
        a.month > b.month ? 1 : a.month < b.month ? -1 : a.month == b.month && a.day > b.day ? 1 : a.month == b.month && a.day < b.day ? -1 : 0
    )
    let newYearEve = festivals.find(x => x.festival == "除夕");
    let newYear = festivals.find(x => x.festival == "春節");
    if (newYearEve.day == newYear.day) {
        newYearEve.day -= 1;
        newYearEve.weekday -= 1;
        if (newYearEve.day == 0) {
            newYearEve.month -= 1;
            newYearEve.day = 31;
        }
        if (newYearEve.weekday == -1) {
            newYearEve += 7;
        }
    }
    let festivalDay = document.querySelector(".festival-day");
    festivalDay.innerHTML = "";
    festivals.filter(item => item.month == calendarDay.month).forEach(item => {
        let li = document.createElement("li")
        li.textContent = `${item.month+1}/${item.day}(${convertWeekDay(item.weekday)}) ${item.festival}`;
        festivalDay.appendChild(li);
    })
}
const showCount = () => {
    let arr = Array.from(document.querySelectorAll(".day .day-date"));
    arr.forEach(item => {
        let preCount = item.querySelector(".count");
        if (preCount) preCount.remove();

        let count = document.createElement("div");
        let date = [item.dataset.year, (parseInt(item.dataset.month) + 1).toString().padStart(2, "0"), item.dataset.day.toString().padStart(2, "0")].join("-");
        let rows = todos.filter(subItem => subItem.date == date).length;
        if (rows > 0) {
            count.textContent = rows;
            count.classList.add("count");
            count.setAttribute("data-date", date);
            item.appendChild(count);
        }
    })
}
const alertModal = () => {
    document.querySelector(".item-alert").classList.add("open");
}
const deleteModal = () => {
    document.querySelector(".item-delete").classList.toggle("open");
}
const deleteItem = (target, e) => {
    let p = target.parentNode.parentNode.querySelector("p")
    e.stopPropagation();
    let index = todos.findIndex(x => x.date == p.dataset.date && x.time == p.dataset.time && x.content == p.dataset.content)
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    showCount();
    showItemList(p)
}
const editBindData = (target, e) => {
    e.stopPropagation();
    let p = target.parentNode.parentNode.querySelector("p");
    document.querySelector(".item-edit input[type='date']").value = p.dataset.date;
    document.querySelector(".item-edit input[type='time']").value = p.dataset.time;
    document.querySelector(".item-edit input[type='text']").value = p.dataset.content;
    document.querySelector(".item-edit input[type='color']").value = p.dataset.color;

    found = todos.find(x => x.date == p.dataset.date && x.time == p.dataset.time && x.content == p.dataset.content && x.color == p.dataset.color);
}
const showItemList = (target) => {
    let modal = document.querySelector(".item-list");
    modal.classList.add("open");
    modal.querySelector(".item-list-display ul").innerHTML = "";
    modal.querySelector(".item-list-display h3 span").innerText = `${target.dataset.date.split("-")[1]}/${target.dataset.date.split("-")[2]}`;
    modal.querySelector(".btn-close").onclick = closeModal;
    modal.querySelector(".close").onclick = closeModal;
    modal.querySelector(".add-item").onclick = addModal;
    modal.querySelector(".item-add .btn-close").onclick = closeAddModal;
    modal.querySelector(".item-add input[type='date']").setAttribute("value", target.dataset.date);
    modal.querySelector(".item-add .save").onclick = addItem;
    modal.querySelector(".item-edit .save").onclick = editItem;
    modal.querySelector(".item-edit .btn-close").onclick = closeEditModal;
    modal.querySelector(".item-alert .close").onclick = closeAlertModal;

    todos.filter(subItem => subItem.date == target.dataset.date).sort((a, b) => {
        if (+a.time.split(":")[0] < +b.time.split(":")[0]) return -1
        else if (+a.time.split(":")[0] > +b.time.split(":")[0]) return 1
        else if (+a.time.split(":")[0] == +b.time.split(":")[0]) {
            if (+a.time.split(":")[1] == +b.time.split(":")[1]) return 0
            else if (+a.time.split(":")[1] > +b.time.split(":")[1]) return 1
            else return -1
        }
    }).forEach(x => {
        let li = document.createElement("li");
        let before = document.createElement("span");
        let p = document.createElement("p");
        let span = document.createElement("span");
        let edit = document.createElement("i");
        let del = document.createElement("i");

        before.classList.add("before");
        before.style.background = x.color;
        p.textContent = `${x.time} - ${x.content}`;
        p.setAttribute("data-date", x.date);
        p.setAttribute("data-time", x.time);
        p.setAttribute("data-content", x.content);
        p.setAttribute("data-color", x.color);
        edit.classList.add("fas", "fa-pencil-alt", "edit", "ps-3");
        del.classList.add("fas", "fa-ban", "delete", "ms-3");
        del.onclick = (e) => {
            deleteModal();
            document.querySelector(".item-delete .sure").addEventListener("click", () => {
                deleteItem(del, e);
                closeDeleteModal();
            })
            document.querySelector(".item-delete .cancel").addEventListener("click", () => {
                closeDeleteModal();
            })
        }
        span.append(edit, del);
        li.classList.add("d-flex", "justify-content-around");
        li.append(before, p, span);
        modal.querySelector(".item-list-display ul").append(li);
        modal.querySelectorAll(".edit").forEach(item => {
            item.onclick = (e) => {
                editModal();
                editBindData(item, e);
            };
        })
    })
}
const closeModal = () => {
    document.querySelector(".item-list.open").classList.remove("open");
    closeAddModal();
    closeEditModal();
}
const closeAddModal = () => {
    if (document.querySelector(".item-add").classList.contains("open")) {
        document.querySelector(".item-add.open").classList.remove("open");
    }
}
const closeEditModal = () => {
    if (document.querySelector(".item-edit").classList.contains("open")) {
        document.querySelector(".item-edit.open").classList.remove("open");
    }
}
const closeDeleteModal = () => {
    if (document.querySelector(".item-delete").classList.contains("open")) {
        document.querySelector(".item-delete.open").classList.remove("open");
    }
}
const closeAlertModal = () => {
    if (document.querySelector(".item-alert").classList.contains("open")) {
        document.querySelector(".item-alert.open").classList.remove("open");
    }
}
const addModal = () => {
    document.querySelector(".item-add").classList.toggle("open");
    if (document.querySelector(".item-edit").classList.contains("open")) {
        document.querySelector(".item-edit.open").classList.remove("open");
    }
    if (document.querySelector(".item-alert").classList.contains("open")) {
        document.querySelector(".item-alert.open").classList.remove("open");
    }
}
const editModal = () => {
    document.querySelector(".item-edit").classList.toggle("open");
    if (document.querySelector(".item-add").classList.contains("open")) {
        document.querySelector(".item-add.open").classList.remove("open");
    }
    if (document.querySelector(".item-alert").classList.contains("open")) {
        document.querySelector(".item-alert.open").classList.remove("open");
    }
}
const addItem = () => {
    let date = document.querySelector(".item-add input[type='date']").value.trim();
    let time = document.querySelector(".item-add input[type='time']").value.trim();
    let content = document.querySelector(".item-add input[type='text']").value.trim();
    let color = document.querySelector(".item-add input[type='color']").value.trim();

    if (date.length == 0 || time.length == 0 || content.length == 0 || color == "") {
        alertModal();
        closeAddModal();
        return;
    } else {
        let obj = {
            date,
            time,
            content,
            color
        };
        todos.push(obj);
        window.localStorage.setItem("todos", JSON.stringify(todos));

        document.querySelector(".item-add input[type='time']").value = "";
        document.querySelector(".item-add input[type='text']").value = "";
        document.querySelector(".item-add input[type='color']").value = "#000000";
    }

    closeAddModal();
    showCount();
    showItemList(document.querySelector(`.day[data-date='${date}']`))
}
const editItem = () => {
    let editedDate = document.querySelector(".item-edit input[type='date']").value.trim();
    let editedTime = document.querySelector(".item-edit input[type='time']").value.trim();
    let editedContent = document.querySelector(".item-edit input[type='text']").value.trim();
    let editedColor = document.querySelector(".item-edit input[type='color']").value.trim();

    if (editedDate.length == 0 || editedTime.length == 0 || editedContent.length == 0 || editedColor == "") {
        alertModal();
        closeEditModal();
        return;
    } else {
        found.date = editedDate;
        found.time = editedTime;
        found.content = editedContent;
        found.color = editedColor;

        localStorage.setItem("todos", JSON.stringify(todos));
        closeEditModal();
        showCount();
        showItemList(document.querySelector(`.day[data-date='${editedDate}']`));
    }
}
const createBackgroundImage = () => {
    for (let i = 1; i <= 12; i++) {
        let divblock = document.createElement("div");
        if (i != 1) divblock.className = "opacity";
        divblock.classList.add("item-list-front");
        divblock.setAttribute("style", `background: url("./images/${i}.jpg"); background-size: cover;`);
        divblock.setAttribute("data-id", i - 1);
        document.querySelector(".item-list-content").append(divblock);
    }
}

window.addEventListener("load", () => {
    createWeek();
    calendarDay = setToday();
    today = setToday();
    createCalendar(calendarDay);
    showFestival();
    createBackgroundImage();
})
document.querySelector(".btn-today button").addEventListener("click", () => {
    document.querySelector(`div[data-id="${calendarDay.month}"`).classList.add("opacity");
    calendarDay = setToday();
    createCalendar(calendarDay);
    showFestival();
    document.querySelector(`div[data-id="${calendarDay.month}"`).classList.remove("opacity");
});
document.querySelector(".btn-preYear button").addEventListener("click", () => {
    calendarDay.year -= 1;
    createCalendar(calendarDay);
    showFestival();
})
document.querySelector(".btn-preMonth button").addEventListener("click", () => {
    document.querySelector(`div[data-id="${calendarDay.month}"`).classList.add("opacity");
    if (calendarDay.month == 0) {
        calendarDay.year -= 1;
        calendarDay.month = 11;
    } else {
        calendarDay.month -= 1;
    }
    document.querySelector(`div[data-id="${calendarDay.month}"`).classList.remove("opacity");

    createCalendar(calendarDay);
    showFestival();
})
document.querySelector(".btn-nextMonth button").addEventListener("click", () => {
    document.querySelector(`div[data-id="${calendarDay.month}"`).classList.add("opacity");
    if (calendarDay.month == 11) {
        calendarDay.year += 1;
        calendarDay.month = 0;
    } else {
        calendarDay.month += 1;
    }
    document.querySelector(`div[data-id="${calendarDay.month}"`).classList.remove("opacity");
    createCalendar(calendarDay);
    showFestival();
})
document.querySelector(".btn-nextYear button").addEventListener("click", () => {
    calendarDay.year += 1;
    createCalendar(calendarDay);
    showFestival();
})
setInterval(() => {
    deg += 3;
    document.querySelector(".banner").style.filter = `hue-rotate(${deg}deg)`;
}, 300)