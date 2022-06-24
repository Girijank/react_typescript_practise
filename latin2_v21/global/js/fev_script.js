var _latin = {

    "dialogHead": function () {
        // Module 1 - Juno Head
        $(document).find(".icon_local.juno").html("<img src='../../global/images/icons/head_juno.jpg' alt='Juno'><span class='copyright'>©Universal Images Group / ImageQuest 2021</span>");
        $(document).find(".icon_local.juno").attr("data-alt", "Juno");
        // Module 2 - Mercury Head        
        $(document).find(".icon_local.mercury").html("<img src='../../global/images/icons/head_mercury.jpg' alt='Mercury'><span class='copyright'>©Bridgeman Art Library / ImageQuest 2021</span>");
        $(document).find(".icon_local.mercury").attr("data-alt", "Mercury");
        // Module 3 - Vesta Head
        $(document).find(".icon_local.vesta").html("<img src='../../global/images/icons/head_vesta.jpg' alt='Vesta'><span class='copyright'>©Mondadori Electa / ImageQuest 2021</span>");
        $(document).find(".icon_local.vesta").attr("data-alt", "Vesta");
        // Module 4 - Mars Full
        $(document).find(".icon_local.mars_full").html("<img src='../../global/images/icons/full_mars.png' alt='Mars'><span class='copyright'>©Werner Forman / ImageQuest 2021</span>");
        $(document).find(".icon_local.mars_full").attr("data-alt", "Mars");
        // Module 4 - Mars Head
        $(document).find(".icon_local.mars").html("<img src='../../global/images/icons/head_mars.jpg' alt='Mars'><span class='copyright'>©Werner Forman / ImageQuest 2021</span>");
        $(document).find(".icon_local.mars").attr("data-alt", "Mars");
        $(document).find(".head.mars").html("<img src='../../global/images/icons/head_mars_small.jpg' alt='Mars'><span class='copyright'>©Werner Forman / ImageQuest 2021</span>");
        $(document).find(".head.mars").attr("data-alt", "Mars");
        // Module 5 - Diana Head
        $(document).find(".icon_local.diana").html("<img src='../../global/images/icons/head_diana_gi.jpg' alt='Diana'><span class='copyright'>©G. Dagli Orti / ImageQuest 2021</span>");
        $(document).find(".icon_local.diana").attr("data-alt", "Diana");
        // Module 6 - Apollo Head
        $(document).find(".icon_local.apollo").html("<img src='../../global/images/icons/head_apollo.jpg' alt='Apollo'><span class='copyright'>©G. Dagli Orti / ImageQuest 2021</span>");
        $(document).find(".icon_local.apollo").attr("data-alt", "Apollo");
    },

    "glossaryWrap": function () {
        $(document).find(".pop-over").each(function () {
            $(this).wrap("<span class='noWrap glossary-deco'></span>");
        })
    },

    "checkModalTitle": function () {
        // $(".wp-caption, .image-container").on("click", function () {
        //     setTimeout(findCaption, 500);
        // })
        $("#cboxNext, #cboxPrevious").on("click", function () {
            setTimeout(findCaption, 50);
        })
    },

    lightboxOnComplete: function () {
        _latin.imageAlt = "";
        var zoombtn = $(".image-container a.lightbox.cboxElement");
        if ($(zoombtn).length && $(".enlangeimgfn").length) {
            $(zoombtn).off("click", checkaltText).on("click", checkaltText);
            function checkaltText() {
                _latin.imageAlt = $(this).closest(".image-container").find("a:eq(0) img").attr("alt");
            }
        }

        $(document).bind('cbox_complete', function (e) {
            $("#colorbox #cboxLoadedContent img.cboxPhoto").attr("alt", _latin.imageAlt);
            // $("#colorbox #cboxTitle")
            findCaption();
        });
    },

    "ctr_enter": function () {
        $(document).find(".panel .panel-heading").attr("tabindex", "0");
        $(".panel .panel-heading").on("keyup", function (e) {
            if (e.keyCode == 13) {//key symbol [enter]
                $(this).click();
            }
        })
    },
    imageAlt: ""
}

function findCaption() {
    $(document).find("#cboxTitle").each(function () {
        var _cTitlePart = $(this).html().split("|");
        if (_cTitlePart[0].length == 0 && _cTitlePart.length <= 1) {
            return;
        }
        var popcaption = _cTitlePart.filter(function (el) {
            return el.trim() != "";
        });     
        $(this).html(popcaption.join("|"));

        // if (_cTitlePart[1] == "" || _cTitlePart[1] == " " || _cTitlePart[1] == "  ") {
        //     $(this).html(_cTitlePart[0]);
        // }
    })
}

$(document).ready(function () {
    $(document).keyup(function (e) {
        if (e.keyCode == 192) {//key symbol [`]
            if ($("body").hasClass("checklangspan")) {
                $("body").removeClass("checklangspan")
            } else {
                $("body").removeClass("checklangspan")
                $("body").addClass("checklangspan")
            }
        }
    })

    // _latin.dialogHead();

    _latin.glossaryWrap();
    _latin.checkModalTitle();
    _latin.ctr_enter();
    _latin.lightboxOnComplete();
})

_latin.dialogHead();


