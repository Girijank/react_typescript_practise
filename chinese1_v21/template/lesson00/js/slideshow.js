$(document).ready(function () {
    $('.center').css('text-align','center');        // OPTIONAL
    $('.btnResults').attr('href','#slideShowOne');  // point to your slideshow ID

    $('.btnResults').click(function(){
        var buttonVal = $(this).attr('data-ref');
        var userText = $('#sld_' + buttonVal).val();
        $('#txt_' + buttonVal + ' strong').text(userText);
        $('#sld_' + buttonVal).attr("tabindex","-1");
        $('.left').focus();
    });

    setTimeout(function(){
        $('.carousel-control').click(function(){
            setTimeout(function(){
                $('.slide_txt').focus();
                $('.slide_txt').off("keypress focus blur");
            },500)
        });
    },500);

    $('.btnReset').click(function(){
        $('.slide_txt').val('');
        $('.txt_results strong').text('');
        $('#slideShowOne').carousel(0);
    });

    $('.carousel-inner').attr('role','region').attr('aria-label','Slideshow').attr('tabindex',0);
    $('.item').removeAttr('role'); // optional, removes role attribute from slides.

    // CUT AUDIO - Slideshows
    $('.carousel-control, .carousel-indicators li, a.tab').click(function() {
        $('.mejs-container').find('.mejs-pause').find('button').trigger('click');
    });

});

