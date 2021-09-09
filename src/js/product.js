$(document).ready(() => {
    $(".filter-list").on("click", ".filter-item", function () {
        if ($(this).hasClass("active")|| $(this).find('.filter-menu').hasClass("visible")) {
            $(this).removeClass("active");
            $(this).find('.filter-menu').removeClass("visible");
        }
        else {
            $(".filter-menu").removeClass("visible");
            $(".filter-item").removeClass("active");
            $(this).addClass("active");
            $(this).find('.filter-menu').addClass("visible");
        }
        $(this).find(".filter-menu-list").on("click",".filter-menu-item",function(){
            if ($(this).hasClass("active")) {
                $(this).find(".filter-menu-item").removeClass("visible");
                // 
                $(this).closest(".filter-menu").removeClass("visible");
                $(this).closest(".filter-item").removeClass("active");
            }
            else {
                $(".filter-menu-item").removeClass("visible");
                $(".filter-menu-item").removeClass("active");
                $(this).addClass("active");
                $(this).find(".filter-menu-item").addClass("visible");
                // 
                $(this).closest(".filter-menu").removeClass("visible");
                $(this).closest(".filter-item").removeClass("active");
            }
        })
    })
})