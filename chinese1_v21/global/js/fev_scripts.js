// $(document).ready(function () {
//     $(document).keyup(function (e) {
//         if (e.keyCode == 192) {//key syblom [`]
//             if ($("body").hasClass("checklangspan")) {
//                 $("body").removeClass("checklangspan")
//             } else {
//                 $("body").removeClass("checklangspan")
//                 $("body").addClass("checklangspan")
//             }
//         }
//     })
// })

function checkLangTag() {
    $(document).keyup(function (e) {
        if (e.keyCode == 192) {//key syblom [`]
            if ($("body").hasClass("checklangspan")) {
                $("body").removeClass("checklangspan");
                $(".fev_imgaltText").remove();
            } else {
                $("body").removeClass("checklangspan")
                $("body").addClass("checklangspan");
                forimageAlt();
            }
        }
    })
}

function forimageAlt() {
    $(document).find('img').each(function () {
        var alt = $(this).attr("alt");
        if (alt != undefined) {           
            $(this).after($("<span class='fev_imgaltText'>" + alt + "</span>"))
        }
    })

}


var fevcode_chinese = {

    addingClass: function () {
        $(document).find('a, img').each(function () {
            var attrb = $(this)[0].src == undefined ? "title" : "alt";
            var title = $(this).attr(attrb);
            if (title != undefined) {
                title = title.trim();
                var ind = title.indexOf("<em>");
                if (ind != -1) {
                    title = title.replace('<em>', "").replace('</em>', "");
                    $(this).attr(attrb, title);
                }
            }
        });

        var htmlele = 'a, button, div.panel-heading, span.da-arrows-prev, span.da-arrows-next, .btn-primary, input';

        $(document).find(htmlele).each(function () {
            if (!$(this).hasClass("fev_accessibility")) {
                $(this).addClass("fev_accessibility");
            }
        });

        $(document).find(".toggleSwitch, div.panel-heading span, .disabledPanel, .collapsed span").each(function () {
            $(this).removeClass("fev_accessibility");
        });

        $(document).find("#cboxNext, #cboxPrevious, figure .gallery").removeClass("fev_accessibility")

        $(document).find(".modalgal, #menu_outer").each(function () {
            $(this).attr("tabindex", "-1").removeClass("fev_accessibility");
        });
    },

    addTabIndex: function () {
        $('.fev_accessibility').focus(function () {
            $(this).mouseenter();
        });
        $('.fev_accessibility').blur(function () {
            $(this).mouseout();
        })
        $('.fev_accessibility').each(function (i) {
            var n = "0";
            var thistab = $(this).attr('tabindex') == undefined ? "0" : $(this).attr('tabindex');
            $(this).attr('tabindex', thistab);
            $(this).data('tabno', thistab);
        })

        $(document).keypress(function (e) {
            if (e.which == 13 && $(e.target).is(":focus") && $(e.target).hasClass("fev_accessibility")) {
                $(e.target).click();
            }
        });


        var rolebtn = $(".nav li[role='presentation'] a");
        $(rolebtn).on("click", function () {
            setTimeout(function () {
                for (var i = 0; i < $(rolebtn).length; i++) {
                    $($(rolebtn).eq(i)).attr('tabindex', $($(rolebtn).eq(i)).data('tabno'));
                }
            }, 500)

        })
    },

    vocabElement: function () {
        $(document).find(".vocabElement[data-lightboxtext]").each(function () {
            var lil_text = $(this).attr("data-lightboxtext");
            var par = $(this).closest(".wp-caption");
            if (lil_text != undefined && $(par).length) {
                lil_text = lil_text.trim();
                var caption = $(par).find(".wp-caption-text");
                if ($(caption).length) {
                    if (caption.text().trim() == lil_text) {
                        $(caption).attr("lang", "zh-Hans");
                    }
                }

            }

        })
    },

    colorbox: function () {
        $(document).bind('cbox_complete', function () {
            var cboxTitle = $(this).find("#cboxTitle");
            var txt = $(cboxTitle).text().trim();
            if (txt != "") {
                if (txt[txt.length - 1] == "|") {
                    var newtext = txt.slice(0, -1);
                    $(cboxTitle).text(newtext);
                }
            }
        });
    },

    init: function () {

        fevcode_chinese.addingClass();
        fevcode_chinese.addTabIndex();
        // fevcode_chinese.addAriaLabel();
        fevcode_chinese.vocabElement();
        fevcode_chinese.colorbox()       
    }
}

$(document).ready(function () {
    setTimeout(fevcode_chinese.init, 300);
    checkLangTag();
})

