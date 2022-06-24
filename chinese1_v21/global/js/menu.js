$(function () {
    if (isexternal) return

    var loc = window.location.href; // returns the full URL

    //if (/welcome_/.test(loc) || /glossary/.test(loc) || /toolbox/.test(loc)) return $('nav').css('display', 'none')
    if ( /glossary/.test(loc) || /toolbox/.test(loc)) return $('nav').css('display', 'none')

    if (!FLVS.Sitemap || !FLVS.Sitemap.module.length) return

    createMenu()
    cleanup()

    if (gsLTI) {
        var why = "ASL 2 menu"
        unlockPage.init(why)
    }

    // FUNCTIONS

    function createMenu() {

        //console.log(FLVS.Sitemap);
        var module, link, modTitle, lesson, minutes, points, submenu, menuItem;
        var menu = $('<ul class="nav_menu_modules" />');
        var modules = FLVS.Sitemap.module;

        for (var i = 0; i < modules.length; i++) {
            module = modules[i]; //Assign module title

            modTitle = module.title;
            modNumber = module.num; // Lesson Menus

            submenu = $("<ul class=\"nav_menu_lessons mod".concat(i + 1, "\" />"));
            link = ""; //used for lesson menu columns

            var numTotalLessons = module.lesson.length - 1;
            var numLessons = Math.round(numTotalLessons / 2); // Run through each lesson

            for (var j = 0; j < module.lesson.length; j++) {
                lesson = module.lesson[j];
                minutes = lesson.time === 1 ? 'min' : 'mins';
                points = lesson.points === 1 ? "pt" : 'pts';
                link = lesson.page[0].href//.replace("../../", ""); //use for 2 column

                link2 = link;
                link = $('<a />').attr('href', link);
                link.html([$('<span class="lesson_num" />').html(lesson.num)[0], $('<span class="lesson_title" />').html(lesson.title)[0], $('<span class="lesson_nfo" />').html("".concat(lesson.time, " ").concat(minutes, " | ").concat(lesson.points, " ").concat(points))[0]]);
                submenu.append($('<li />').html(link));
            }

            var hidden = ['Getting Started', 'Collaboration', 'POC Template Designs', 'Style Guide', 'Welcome'];
            var temp = $('<a href="javascript:void(0)" class="modlink" />');

            if (hidden.indexOf(module.title) !== -1) {
                menuItem = temp.html(module.title).addClass('top-mod')
                if (module.title === 'Collaboration') temp.addClass('collab')
            } else menuItem = temp.html([
                $('<span class="mnumber" />').html(module.num),
                $('<span class="title" />').html(module.title)
            ]);

            menuItem = $('<li />').append(menuItem).append(submenu);

            if (module.visible === 'true') menu.append(menuItem);
        } //add menu to Menu Top button

        $('#nav_menu').append(menu);
        // setupEvents();

        setTimeout(function () {
            var increment = 100;
            $('.invisible').each(function () {
                var link = $(this)
                setTimeout(function () {
                    link.removeClass('invisible');
                }, increment);
                increment += 50;
            });
        }, 800);
    }

    function cleanup() {
        let menu = $('#nav_menu')
        let modules = $('.modlink')
        let lessons = $('.nav_menu_lessons')

        // Navigation Position
        var pos = $('#menu_inner').offset();

        menu.css('left', pos.left + 'px');

        // Position Popup Menu
        $(window).on('resize', function () {
            var pos = $('#menu_inner').offset();
            menu.css('left', pos.left + 'px');
        });


        $('.menubtn, .menubtn_mobile').click(function () {
            let button = $(this)

            modules.removeClass('selected')

            lessons.hide()

            if (!menu.is(':visible')) {
                $('body').append('<div class="menu_backdrop">&nbsp;</div>');

                $('.menu_backdrop').click(function () {
                    menu.fadeToggle('fast');
                    $(this).remove();
                    button.removeClass('selected')
                });

                button.addClass('selected')
            } else {
                $('.menu_backdrop').remove();
                button.removeClass('selected')
            }

            menu.fadeToggle('fast');
        });

        // Event for Showing Menu Lessons
        modules.click(function () {
            lessons.hide()

            let isModuleSelected = $(this).hasClass('selected')
            modules.removeClass('selected')

            if (isModuleSelected) return

            $(this)
                .addClass('selected')
                .next().stop().fadeIn('fast');
        });
    }
});
