$(document).ready(() => {
    $(".filter-list").on("click", ".filter-item", function () {
        console.log(this);
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
    })
})