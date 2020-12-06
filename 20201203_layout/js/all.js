$(document).ready(function () {
    $(window).scroll(function () {
        let scroll_height = $(window).scrollTop();
        let nav_height = $("nav").height();
        if (scroll_height > 60) {
            $("#gotop").addClass("active");
            $("nav").addClass("active");
            $(".banner").css("padding-top", `${nav_height}px`)
        } else {
            $("#gotop").removeClass("active");
            $("nav")
                .find("a")
                .removeClass("active");
            $("nav").removeClass("active");
            $(".banner").css("padding-top", "0")
        }
    });
    $("#gotop").on("click", function (e) {
        e.preventDefault();
        $("html,body").animate({ scrollTop: 0 }, 500);
    });
});