$(document).ready(function () {
    $(window).scroll(function () {
        let scroll_height = $(window).scrollTop();
        let offset = $(".navigation-list").offset().top;
        let lists = $(".navigation-list li");
        if (scroll_height > offset) {
            $("header nav").css("position","static");
            
        } else {
            $("header nav").css("position","sticky");
        }

        $(".navigation-list").find("li").siblings().removeClass("active");

        if(scroll_height>7622){
            $(".navigation-list").find(lists[4]).addClass("active");
        }else if(scroll_height>6922){
            $(".navigation-list").find(lists[3]).addClass("active");
        }else if(scroll_height>6252){
            $(".navigation-list").find(lists[2]).addClass("active");
        }else if(scroll_height>1820){
            $(".navigation-list").find(lists[1]).addClass("active");
        }else if(scroll_height>680){
            $(".navigation-list").find("li").first().addClass("active");
        }
        else{
            $(".navigation-list").find("li").siblings().removeClass("active");
        }
    });
    $(".navigation-list")
    .find("a")
    .on("click", function(e) {
        e.preventDefault();
        $(this).parent().siblings().removeClass("active");

        $(this).parent().addClass("active");

        let target = $(this).attr("href");
        let offset = target == "#TNGA-core" ? $(target).offset().top : $(target).offset().top - 100;
        $("html,body").animate({scrollTop: offset},600);
    });

    $(".advantage-tabs").find("a").on("click",function(e){
        e.preventDefault();
        let target = $(this).attr("href");
        let offset =  $(target).offset().top - 80;
        console.log(target);
        $("html,body").animate({scrollTop: offset},400);
    })

    $(".side-menu").find("li").on("click",function(){
        $("html,body").animate({scrollTop: 0},600);
    })
});