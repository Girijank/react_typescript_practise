$(document).ready(function () {

  $.getJSON('../../global/js/numero.json', getNumberInfo);

  function getNumberInfo(data) {
    $('.numberElement').each(function (i, value) {
      var group = $(this).data('group');
      var width = $(this).data('maxwidth');
      var height = $(this).data('maxheight');
      var lightboxtext = $(this).data('lightboxtext');
      var numberid = $(this).data('numberid');

      var word = data.words.filter(function (word) {
        return word.numberid == numberid;
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
    var html = '<div class="sptFrame pull-right" data-phrase="' + word.number + '"></div>';
    html += '<div class="written">' + word.number + ' &mdash; ' + word.written + '</div>';
    html += '<img src="' + word.image.source + '" alt="' + word.image.alt + '" class="' + word.image.class + '" data-width="100%" data-copyright="' + word.image.copyright + '" /></div>';
    html += '<audio class="numero audio pull-left" controls src="../../global/media/numero/' + word.number + '.mp3"></audio>';
    html += '</div>';

    return html;
  }

});
