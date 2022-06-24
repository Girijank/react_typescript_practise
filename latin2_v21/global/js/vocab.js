$(document).ready(function () {

    $.getJSON('../../global/js/vocab.json', getVocabInfo);

    $(document).bind('cbox_complete', function () {
        $('#cboxLoadedContent').find('.kaltura').addClass('activeKalturaPlayer');
        buildKaltura();

        $('#cboxNext').click(function () {
            $('.activeKalturaPlayer').stop();
        });

        $('#cboxPrevious').click(function () {
            $('.activeKalturaPlayer').stop();
        });

        $('.activeKalturaPlayer').click('cbox_closed', function () {
            $('.activeKalturaPlayer').stop();
        });
    });

    function getVocabInfo(data) {

        $('.vocabElement').each(function (i, value) {
            var group = $(this).data('group');
            var width = $(this).data('maxwidth');
            var height = $(this).data('maxheight');
            var lightboxtext = $(this).data('lightboxtext');

            var word = data.words.filter(function (word) {
                return word.vocab == lightboxtext;
            });

            word = word[0];

            if (word != undefined) {
                $(this).colorbox({
                    rel: group,
                    width: width,
                    height: height,
                    html: buildHTML(word)
                });

            } else {
                console.log('!! Error with word: ' + lightboxtext);
            }
        });

    }


    function buildHTML(word) {
        var html = '<p class="vocab_word mb-1">' + word.vocab + '</p><div class="vocab_img"><img src="' + word.image.source + '" alt="' + word.image.alt + '" class="' + word.image.class + '" data-width="' + word.image.width + '"data-copyright="' + word.image.copyright + '"data-caption="' + word.image.caption + '" /><span class="copyright">' + word.image.copyright + '</span></div>';

        if (word.nivel == 'uno') {
            //html += '<a href="https://cdn.flvs.net/cdn/audio/index.htm" class="pop record_icon" data-height="240px"><img src="../../global/images/record.png" alt="Select to open recording tool." /></a><p class="vocab_word">' + word.vocab + '</p>' + word.usage + '';
            // html += '<div class="vocab_content"><div class="sptFrame pull-right" data-phrase="' + word.spt + '"></div><p class="vocab_word">' + word.vocab + '</p>' + word.usage + '';
            html += '<div class="vocab_content"><div class="sptFrame pull-right" data-phrase="' + word.spt + '"></div>' + word.usage + '';
        } else if (word.nivel == 'dos') {
            html += '<span class="vocab_phrase"><a href="//cdn.flvs.net/cdn/audio/index.htm" class="pop record_icon" data-height="240px"><img src="../../global/images/record.png" /></a>' + word.usage + '</span>';
        }

        if (word.localaudio) {
            html += '<audio class="audio" controls src="' + word.localaudio + '" ></audio>'
        } else {
            html += '<div id="' + word.kaltura + '" data-type="audio" class="kaltura pull-left"></div>';
        }

        return html;
    }


    function buildKaltura() {
        var videoID = {};

        var kalturaID = $('.activeKalturaPlayer').attr('id');

        var kaltura = {
            uiconf_id: "33130941",
            partner_id: "2061901",
            entry_id: kalturaID,
            //height:"400",
            //width:"640",
            class: "",
            type: "",
            thumb_class: "kWidgetPlayBtn",
            image_class: "",
            custom_css: "kaltura.css"
        };

        // clean up dimensions, set defaults for type audio
        if ($('.activeKalturaPlayer').data("width") && $('.activeKalturaPlayer').data("width") !== "0") {
            if ($('.activeKalturaPlayer').data("width") === "null") {
                kaltura.width = "";
            } else {
                var dwA = $('.activeKalturaPlayer').data("width");
                if (dwA.charAt && dwA.charAt(dwA.length - 1) == "%") {
                    dwA = dwA.substring(0, dwA.length - 1) / 100;

                    var parent = $('.activeKalturaPlayer').parent().width();
                    dwA = parent * dwA;
                    if (dwA > parent) {
                        dwA = parent;
                    }

                } else {
                    dwA = parseInt(dwA, 10);
                }
                kaltura.width = dwA;
            }

        } else if ($('.activeKalturaPlayer').data("type") && $('.activeKalturaPlayer').data("type") === "audio") {
            kaltura.width = "340";
        } else if ($('.activeKalturaPlayer').data("type") && $('.activeKalturaPlayer').data("type") === "audiobtn") {
            kaltura.width = "30";
        }

        if ($('.activeKalturaPlayer').data("height") && $('.activeKalturaPlayer').data("height") !== "0") {
            if ($('.activeKalturaPlayer').data("height") === "null") {
                kaltura.height = "";
            } else {
                var dwH = $('.activeKalturaPlayer').data("height");
                if (dwH.charAt && dwH.charAt(dwH.length - 1) == "%") {
                    dwH = dwH.substring(0, dwH.length - 1) / 100;

                    var parent = $('.activeKalturaPlayer').parent().height();
                    dwH = parent * dwH;
                    if (dwH > parent) {
                        dwH = parent;
                    }

                } else {
                    dwH = parseInt(dwH, 10);
                }
                kaltura.height = dwH;
            }


        } else if ($('.activeKalturaPlayer').data("type") && $('.activeKalturaPlayer').data("type") === "audio") {
            kaltura.height = "40";
        } else if ($('.activeKalturaPlayer').data("type") && $('.activeKalturaPlayer').data("type") === "audiobtn") {
            kaltura.height = "30";
        }
        // setup other attributes
        if ($('.activeKalturaPlayer').attr("id")) {
            kaltura.entry_id = $('.activeKalturaPlayer').attr("id");
        }
        if ($('.activeKalturaPlayer').attr("class")) {
            kaltura.class = $('.activeKalturaPlayer').attr("class");
        }
        if ($('.activeKalturaPlayer').data("uiconfid")) {
            kaltura.uiconf_id = $('.activeKalturaPlayer').data("uiconfid");
        }
        if ($('.activeKalturaPlayer').data("partnerid")) {
            kaltura.partner_id = $('.activeKalturaPlayer').data("partnerid");
        }
        if ($('.activeKalturaPlayer').data("type")) {
            kaltura.type = $('.activeKalturaPlayer').data("type");
        }

        videoID[kaltura.entry_id] = "paused";

        //set up various players
        if (kaltura.type === "audio") {
            kaltura.uiconf_id = "36511471";
            kaltura.class = "kalturaAudio";
            kaltura.thumb_class = "kWidgetPlayBtn audio";
            kaltura.image_class = "hide";
            kaltura.custom_css = "kaltura_audio.css";
        } else if (kaltura.type === "audiobtn") {
            kaltura.class = "kalturaAudioBtn";
            kaltura.uiconf_id = "36582731";
            kaltura.thumb_class = "kWidgetPlayBtn audiobtn";
            kaltura.image_class = "hide";
            kaltura.custom_css = "kaltura_audio.css";
        } else if (videoID.type === "videocc") {
            kaltura.uiconf_id = "35766781";
        }


        var scriptInclude = '//cdnapisec.kaltura.com/p/' + kaltura.partner_id + '/sp/' + kaltura.partner_id + '00/embedIframeJs/uiconf_id/' + kaltura.uiconf_id + '/partner_id/' + kaltura.partner_id;

        $.getScript(scriptInclude)
            .success(function (script, textStatus) {
                new kWidget.api({
                    'wid': '_' + kaltura.partner_id,
                }).doRequest({
                    'service': 'baseentry',
                    'action': 'list',
                    'filter:objectType': 'KalturaBaseEntryFilter',
                    'filter:idEqual': kaltura.entry_id
                }, function (data) {
                    if (!data.objects || !data.objects[0]) {
                        kWidget.log('Error getting entry')
                        return;
                    }
                    var entry = data.objects[0];
                    var settings = {
                        'targetId': kaltura.entry_id,
                        'wid': '_' + kaltura.partner_id,
                        'entry_id': kaltura.entry_id,
                        'uiconf_id': kaltura.uiconf_id,
                        'height': kaltura.height,
                        "width": kaltura.width,
                        // since we already have the click gesture run kWiget embed with special capture click flag:
                        'captureClickEventForiOS': true,
                        "flashvars": {
                            //This line adds your custom plugin:
                            "myCustomPluginName": {
                                'plugin': true,
                                //This line sets the plugin custom CSS file path:
                                "iframeHTML5Css": url_fromGlobal + "/css/" + kaltura.custom_css
                            },
                        }
                    }

                    // set callbakck to play on media ready ( works in iOS since we captured user gesture above)
                    settings.readyCallback = function (playerId) {
                        var kdp = document.getElementById(playerId);

                        // issue a play ( since we already clicked the play button )
                        kdp.kBind('mediaReady', function () {
                            //mark id as playing
                            videoID[playerId] = 'playing';

                            kdp.sendNotification('doPlay');

                            //binds for callback on sequential plays, then runs object and turns off all videos except
                            kdp.kBind("doPlay", function (id, data) {
                                $.each(videoID, function (key, value) {
                                    if (key !== id) {
                                        videoID[key] = 'paused';
                                        var kdpC = document.getElementById(key);
                                        kdpC.sendNotification('doPause');
                                    } else {
                                        videoID[key] = 'playing';
                                    }
                                });
                            })

                            //binds for callback on pause, then updates object
                            kdp.kBind("doPause", function (id, data) {
                                videoID[id] = 'paused';
                            })

                            $.each(videoID, function (key, value) {
                                if (key !== playerId) {
                                    var kdpC = document.getElementById(key);
                                    kdpC.sendNotification('doPause');
                                }
                            });

                        });

                    }


                    /*    var newbtn = $("<button>"+$('.activeKalturaPlayer').html()+"</button>")
                         $('.activeKalturaPlayer').each(function() {
                           $.each(this.attributes, function() {
                             if(this.specified) {
                               $(newbtn).attr(this.name, this.value);
                             }
                           });
                         });
     
                         $('.activeKalturaPlayer').replaceWith($(newbtn))*/


                    $('.activeKalturaPlayer')
                        .addClass(kaltura.class)
                        .append(
                            '<img class="kWidgetCentered ' + kaltura.image_class + '" src="' + kWidget.getKalturaThumbUrl(settings) + '"">' +
                            //'<div tabindex="0" aria-label="audio bar" class="kWidgetCentered '+ kaltura.thumb_class+'"></div>'+
                            '<div class="kWidgetCentered ' + kaltura.thumb_class + '"></div>' +
                            '<button tabindex="0" aria-label="audio bar" class="kalturaaudiobarbutton"></button>'
                        )
                        .click(function () {
                            kWidget.embed(settings);
                        }).on("keypress", function (e) {
                            if (e.which == 13) {
                                $(this).click();
                            }
                        });
                })


            })
            .fail(function (jqxhr, settings, exception) {
                $("div.log").text("Triggered ajaxError handler for Kaltura.");
            });

    }


});