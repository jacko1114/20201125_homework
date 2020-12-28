const $g = (value) =>{
    if (value.includes('#')) {return document.querySelector(value);}
    let nodelist = document.querySelectorAll(value);
    return nodelist.length == 1 ? nodelist[0] : nodelist;
}

const $c = (value) => {
    return document.createElement(value);
}

const choiceIcon = (device) => {
    let i = $c("i");
    i.classList.add("fas","fs-1");

    device.includes("iPhone") ? i.classList.add("fa-mobile-alt")
    : device.includes("iPad") ? i.classList.add("fa-tablet-alt") 
    : i.classList.add("fa-laptop");

    return i;
}

const displayChinese = (eng) => {
    let color = "";
    switch(eng){
        case "white":
            color = "米白";
            break;
        case "black":
            color = "黑";
            break;
        case "red":
            color = "紅";
            break;
        case "blue":
            color = "海軍藍";
            break;
        case "yellow":
            color = "黃";
            break;
        case "coral":
            color = "珊瑚紅";
            break;
        case "green":
            color = "綠";
            break;
        case "purple":
            color = "紫";
            break;
        case "graphite":
            color = "石墨黑";
            break;
        case "silver":
            color = "金屬銀";
            break;
        case "gold":
            color = "玫瑰金";
            break;
        case "gray":
            color = "太空灰";
            break;
    }
    return `${color}色`;
}

export {$g, $c, choiceIcon, displayChinese};