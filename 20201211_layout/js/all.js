$(function(){
    if($(".menu-btn").is(":visble")){
        $(".header-menu").hide();
        $(".menu-btn").on("click",function(){
            $(".header-menu").toggle();
        })
    }
});