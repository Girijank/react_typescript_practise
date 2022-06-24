

function _thisinit() {
    $(".ctr_reveal p").hide();
    $(".ctr_reveal").append("<span>&nbsp;</span>");
    $(".ctr_reveal").addClass("hideCtr");
    $(".glossary-deco").on("click", function (event) {
        // console.log("UUUIUIUIUIUI");
        event.stopImmediatePropagation();
    })
    $(".ctr_btn").on("click", function () {
        var clickedBox = $(this).siblings(".ctr_reveal");
        clickedBox.find("p").toggle();
        clickedBox.find("span").toggle();
        clickedBox.toggleClass("hideCtr");
    })
   /*  $(".ctr_reveal").on("click", function () {
        var clickedBox = $(this);
        clickedBox.find("p").toggle();
        clickedBox.find("span").toggle();
        clickedBox.toggleClass("hideCtr");
    }) */
}

$(document).ready(function () {
    _thisinit();
})


