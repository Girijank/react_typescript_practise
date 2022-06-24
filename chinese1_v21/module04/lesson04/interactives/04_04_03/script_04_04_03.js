$(document).ready(function () {
    $('.fevng_slideshow').on('quizmoReady', function () {
        var _this = $(this);

        //  var titlehtm = $(this).find(".il_viewport h2.il_int_title").html();
        function checkHeading() {
            var titlehtm = $(_this).find(".il_viewport h2.il_int_title");
            var tvTitleEle = $(_this).find(".il_textversion h2.il_int_title");
            if ($(titlehtm).length && $(tvTitleEle).length) {
                var getTitle = $(titlehtm).html() + " — <span class='textVersionTitle'>Text Version</span>";
                $(tvTitleEle).empty().html(getTitle)
            } else {
                setTimeout(checkHeading, 200)
            }

        }

        checkHeading();

    });
});
