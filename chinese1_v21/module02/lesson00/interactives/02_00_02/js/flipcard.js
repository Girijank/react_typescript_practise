$(document).ready(function () {

    var fc_title = "";
    function isjFlipCard() {
        if ($(".jFlipCard").length) {
            checkFlipCard()
        }
    }

    function checkFlipCard() {
        if ($(".jFlipCard .ui_card").length && $(".jFlipCard .ui-dialog").length) {
            init()
        } else {
            setTimeout(checkFlipCard, 300)
        }
    }

    function init() {
        updatedCopyright()
        //posCopyright();
    }

    function updatedCopyright() {
        var thiscopy = $(".jFlipCard").closest(".ilShell").find(".fev_flipcardcopyright");

        var pos = "top"
        if ($(thiscopy).length) {
            $(thiscopy).each(function (i) {
                var _this = $(this);
                var copytext = "";
                copytext += "<p>" + $(_this).html() + "</p>";
                var popupbtn = $('<a href="javascript:void(0);" data-placement="' + pos + '" data-html="true" data-toggle="popover" data-content="' + copytext + '">©</a>');
                $(_this).closest(".ui_card").after($(popupbtn));
                $(popupbtn).addClass("fev_copybtn").addClass("fevlocation_" + (i + 1));
                $(popupbtn).popover();
                $(_this).closest(".ui_flip").find("p:first").remove();
            })     
            $(thiscopy).remove();
        } else {
            setTimeout(updatedCopyright, 300)
        }
    }


    isjFlipCard();
})

function posCopyright() {
    var thiscopy = $(".jFlipCard").closest(".ilShell").find(".ui_card");
    var copytext = "";

    $(thiscopy).each(function (i) {
        var cur = $(thiscopy).eq(i);
        console.log("len :", $(cur).find("p .fev_flipcardcopyright").length);
        var child = $(cur).find("p .fev_flipcardcopyright");
        $(cur).find("p .fev_flipcardcopyright").remove();
        $(cur).append($(child));
    })
}

// function updatedCopyright() {
//     var thiscopy = $(".jFlipCard").closest(".ilShell").find(".fev_flipcardcopyright");
//     var copytext = "";
//     var pos = "top"
//     if ($(thiscopy).length) {
//         $(thiscopy).each(function () {
//             copytext += "<p>" + $(this).html() + "</p>"
//         })

//         if (copytext != "") {
//             var popupbtn = $('<a href="javascript:void(0);" data-placement="' + pos + '" data-html="true" data-toggle="popover" data-content="' + copytext + '">©</a>');
//             $(thiscopy).closest(".jFlipCard").append($(popupbtn));
//             $(popupbtn).addClass("fev_copybtn");
//             $(popupbtn).popover();
//         }
//         $(thiscopy).remove();

//     } else {
//         setTimeout(updatedCopyright, 300)
//     }
// }