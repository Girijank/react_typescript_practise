$(document).ready(function () {
    //For any modals that say "Instructions" and can't be changed in the json,
    //run this to change it to "Instrucciones"
    $.onCreate('h3.modal-title', function (elements) {

        $.onCreate('.showContent', function (elements) {
            changeTitle();

            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    var el = mutation.target;

                    if (mutation.target.classList.contains('modal-show')) {
                        changeTitle();
                    }
                });
            });

            observer.observe(document.querySelector('.modal-dialog'), {
                attributes: true,
                attributeOldValue: true,
                attributeFilter: ['class']
            });
        }, true)
    }, true);

    function changeTitle() {
        if ($('.showContent').text().indexOf("Match a question") >= 0) {
            $('h3.modal-title').text('Instrucciones');
        } else if($('.showContent').text().indexOf("Congratulations") >= 0) {
            $('h3.modal-title').text('Correcto');
        } else {
            $('h3.modal-title').text('Mirar de nuevo');
        }
    }
});