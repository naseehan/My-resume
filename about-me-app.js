$("i").click(function(){
    $("h3").toggleClass("for-H3");
    $("body").toggleClass("for-body");
    $("p").toggleClass("for-H3");
    $("hr").toggleClass("for-H3");
    $(this).toggleClass("for-H3");
    $(this).toggleClass("fa-solid fa-moon dark-mode");
    $(this).toggleClass("fa-solid fa-sun");

})