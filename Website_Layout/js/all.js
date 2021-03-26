let btn = document.querySelector(".menu-btn");
let menu = document.querySelector(".header-menu");

window.addEventListener("resize",function(){
    menu.classList.add("inactive");
})

btn.addEventListener("click",function(){
    if(!menu.classList.contains("active")){
        menu.classList.add("active");
        menu.classList.remove("inactive");
    }else{
        menu.classList.remove("active");
        menu.classList.add("inactive");
    }
})