// JavaScript Document //
var cals = "";
var outputHTML = "";
var outputFilter = "";
var outputModules = "";
var textVersionClick = false;
var videoGalleryClick = false;
var textVersionUrl = "";
var thisTextVersion = "";
var cTips = new Object();
firstTimeComplete = false;

$(document).ready(function() {
    readXML();

    var cData;

    //------------   needed to handle language for GS ----------------//
    if (settings.use_local_language == true || external.render_for_ca == true || external.render_for_gs == true) {
        // Now we look for "lang" classes and appropriately parse them for the right people
        $('.lang').each(function() {
            var data = $(this).attr('data-term').split(":");
            var datatype = data[0];
            var casetype = data[1]; // uc
            var lang = language[datatype];

            if (casetype == 'uc') {
                $(this).html(lang.replace(/^(.)|\s(.)/g, function($1) {
                    return $1.toUpperCase();
                }));
            } else {
                $(this).html(lang.replace(/^(.)|\s(.)/g, function($1) {
                    return $1.toLowerCase();
                }));
            }
        });
    }


    cData = cals;

    //populate(cData);

    $('#applications').on('click', '.calBlock', function() {
        thisTextVersion = $(this);
        firstTimeComplete = true;
        textVersionClick = true;
        textVersionUrl = $(this).attr('data-link');

        cboxOpenedHandler();
        cboxDoneHandler();
    });

});




function populate(cals) {

    var metaArr = []; // array of all keywords //
    var modulesArr = []; // array of all modules //

    $.each(cals.tools, function(key, value) {
        var meta = ""; //string of keywords for data-meta attr//
		var course = "";
        var modules = "";
        var link = value.content.text;
        var image = value.text.toLowerCase().replace(/ /g, '_') + '.png';

        $.each(value.meta, function(mKey, mValue) {

            if (mValue.keywords) {
                meta = mValue.keywords.toString().replace(/,/g,', ');
                $.each(mValue.keywords, function(e, f) {
                    if (f !== "" && $.inArray(f, metaArr) == -1) {
                        metaArr.push(f);
                    }
                });
            }

			course = mValue.course;

            if (mValue.modules) {
                modulesArr = modulesArr.concat(mValue.modules);
                modules = mValue.modules;
            }

        });

        if (value.text && value.text.length > 80) {
            value.text = value.text.substring(0, 80) + "...";
        }

        outputHTML += '<li data-id="' + value.id + '" class="calBlock list-group-item" data-meta="' + meta + '" data-module="' + modules + '" data-url="tip.htm?id=' + value.id + '" data-link="' + value.content.text + '"><div class="row"><div class="col-xs-4"><img src="images/' + image + '" alt="' + value.text + '"></div><div class="col-xs-8"><h3>' + value.title + '</h3><p class="type">' + value.text + '</p><p class="meta"><strong>Keywords</strong>: ' + meta +'</p><p class="modules"><strong>Course</strong>: ' + course + ' - ' + modules + ' </p></div></div></li>';

    });
    metaArr = metaArr.filter(function(item, pos) {
        return metaArr.indexOf(item) == pos;
    });
    metaArr.sort();

    modulesArr = modulesArr.filter(function(item, pos) {
        return modulesArr.indexOf(item) == pos;
    });
    modulesArr.sort();


    $.each(metaArr, function(key, value) {
        outputFilter += '<label><input type="checkbox" name="type" value="' + value + '">' + value + '</label><br />';
    });

    $('#applications').html(outputHTML);
    $("#filters").append(outputFilter);


    initializer();
}

function readXML() {
    $.getJSON('data/tools.json')
        .done(function(cals) {
            populate(cals);

            //initial storage available
            if (sessionStorage) {
                sessionStorage.setItem('toolTips', JSON.stringify(cals));
            }

        })
        .fail(function() {
            console.log("error");
        })
}

function initializer() {
    //turn .videogallery links into to lightboxes
    $('.calBlock').colorbox();

    //turn the textversions links into lightboxes
    //$('.text-pop').colorbox();

    //initialize the sorting stuff
    sortInitializer($);
    sorter();
}

function sortInitializer($) {
    $.fn.sorted = function(customOptions) {
        var options = {
            reversed: false,
            by: function(a) {
                return a.text();
            }
        };
        $.extend(options, customOptions);
        data = $(this);
        arr = data.get();
        arr.sort(function(a, b) {
            var valA = options.by($(a));
            var valB = options.by($(b));
            if (options.reversed) {
                return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;
            } else {
                return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;
            }
        });
        return $(arr);
    };
}

function sorter() {
    // bind radiobuttons in the form
    var filterType = $('#filter input[name="type"]');
    var filterSort = $('#filter input[name="sort"]');

    console.log('177: '+filterSort);

    // get the first collection
    var applications = $('#applications');

    // clone videos to get a second collection
    var data = applications.clone();
	//console.log(data);

    $('#filter input:radio').click(function() {
        $('#filter input[name="type"]:checkbox').removeAttr('checked');
        $('#filter input[name="type"]:radio').prop('checked', true);
    });

    // attempt to call Quicksand on every form change
    filterType.add(filterSort).change(function(e) {

        if ($("#filter input:checkbox:checked").length == 0) {
            $('#filter input[name="type"]:checkbox').removeAttr('checked');
			$('#filter input[name="type"]:radio').prop('checked', true);
            var filteredData = data.find('li');
        } else {
			$('#filter input[name="type"]:radio').removeAttr('checked');

            var sortMeta = '';
            $.each($('#filter input[name="type"]:checkbox:checked'), function(i) {
				if(i>0){ sortMeta += ','; }
                sortMeta += 'li[data-meta]:contains("' + $(this).val() + '")';
            });

			console.log(sortMeta);

            var filteredData = data.find(sortMeta);
        }

        // if sorted by module
        if ($('input[name="sort"]:checked').val() == "module") {
            var sortedData = filteredData.sorted({
                by: function(v) {
                    return $(v).find('p[class=modules]').text();
                }
            });
        } else {
            // if sorted by name
            var sortedData = filteredData.sorted({
                by: function(v) {
                    return $(v).find('h3').text().toLowerCase();
                }
            });
        }

		if(sortedData.length == 0){
			sortedData = '<li>Sorry, no matches for your filters.</li>';
			$('#applications').html(sortedData);
		}else{
			// finally, call quicksand
			applications.quicksand(sortedData, {
				duration: 800,
				easing: 'easeInOutQuad'
			});
		}

		//$('#video_gallery').css('width', '100%');
    });
}


////// not sure yet
function scale() {
    if ($(window).width() <= 820) {
        var safeWidth = $(document).width() - 150;
        var safeHeight = $(document).height() - 160;

        var scaleWidth = video[num].width / safeWidth;
        var scaleHeight = video[num].height / safeHeight;

        if (scaleWidth > scaleHeight) {
            newvideoWidth = video[num].width / scaleWidth;
            newvideoHeight = video[num].height / scaleWidth;
        } else {
            newvideoWidth = video[num].width / scaleHeight;
            newvideoHeight = video[num].height / scaleHeight;
        }
    } else {
        newvideoWidth = video[num].width;
        newvideoHeight = video[num].height;
    }
}

function cboxDoneHandler() {
    $(document).bind('cbox_complete', function() {
        if (textVersionClick == true && firstTimeComplete == true) {
            $('.cboxIframe').contents().find('body').css({
                'margin-top': '2.5%',
                'margin-left': '2.5%',
                'font-family': 'Arial, Helvetica, sans-serif',
                'color': '#333'
            });
            $('.cboxIframe').contents().find('p').width('95%').css({
                'margin-top': '2.5%',
                'margin-left': '2.5%',
                'font-family': 'Arial, Helvetica, sans-serif',
                'color': '#333'
            });
            $('.cboxIframe').contents().find('h2').width('95%').css({
                'margin-top': '2.5%',
                'margin-left': '2.5%',
                'font-family': 'Arial, Helvetica, sans-serif',
                'color': '#333'
            });
            $('.cboxIframe').contents().find('h1').width('95%').css({
                'margin-top': '2.5%',
                'margin-left': '2.5%',
                'font-family': 'Arial, Helvetica, sans-serif',
                'color': '#333'
            });
            textVersionClick = false;
            firstTimeComplete = false;
        } else if (videoGalleryClick == true && firstTimeComplete == true) {
            videoGalleryClick = false;
            firstTimeComplete = false;
        }
    });

    $(document).bind('cbox_cleanup', function() {
        if (videoGalleryClick == true) {
            kWidget.destroy('kaltura_player');
        }
    });
}

function cboxOpenedHandler(entryID) {
    $(document).bind('cbox_open', function() {
        if (textVersionClick == true) {
            $.colorbox({
                fastIframe: false,
                html: '<iframe class="cboxIframe" name="cbox1390852247614" src="' + textVersionUrl + '" frameBorder="0"></iframe>',
                width: '80%',
                height: '95%'
            });
            firstTimeOpened = false;
        } else if (videoGalleryClick == true) {

            $.colorbox({
                html: '<p class="toptab">' + video[num].title + '</p><div id="kaltura_player" style="width:' + video[num].width + 'px;height:' + video[num].height + 'px;" class="showcase "></div>',
                width: windowWidth,
                height: windowHeight
            });
            firstTimeOpened = false;

            var kaltura = {
                uiconf_id: "33130941",
                partner_id: "2061901",
                entry_id: entryID,
                height: video[num].height,
                width: video[num].width,
                class: ""
            };

            var scriptInclude = '//cdnapisec.kaltura.com/p/' + kaltura.partner_id + '/sp/' + kaltura.partner_id + '00/embedIframeJs/uiconf_id/' + kaltura.uiconf_id + '/partner_id/' + kaltura.partner_id;

            $.getScript(scriptInclude)
                .done(function(script, textStatus) {

                    kWidget.embed({
                        'targetId': 'kaltura_player',
                        'wid': '_' + kaltura.partner_id,
                        'uiconf_id': kaltura.uiconf_id,
                        'entry_id': kaltura.entry_id,

                        // for autoplay on iOS:
                        'captureClickEventForiOS': $('#autoplay').attr("checked"),
                        'readyCallback': function(playerId) {
                            if (!$('#autoplay').attr("checked")) {
                                // no ready callback binding needed if no autoplay:
                                return;
                            }
                            // AutoPlay: issue a play on mediaReady
                            var kdp = document.getElementById(playerId);
                            kdp.kBind('mediaReady', function() {
                                kdp.sendNotification('doPlay');
                            });
                        }
                    });

                })
                .fail(function(jqxhr, settings, exception) {
                    $("div.log").text("Triggered ajaxError handler for Kaltura.");
                });

        }
    });

    $(document).bind('cbox_cleanup', function() {
        if (videoGalleryClick == true) {
            kWidget.destroy('kaltura_player');
        }
    });

}
