var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
var glossary;
var letters = [];
var terms = "";
var fr_lang = "chinese";
var to_lang = "english";
var temp_lang;

var tableHeader = "Pinyin + Chinese Character";

function checktableHeader(txt) {
  if (txt.trim() == "chinese") {
    txt = tableHeader;
  }
  return txt
}


$('.lang_switch').click(function(){
  temp_lang = fr_lang;
  fr_lang = to_lang;
  to_lang = temp_lang;

  letters = [];
  glossary = '';
  terms = '';
  getGlossary();
});

function getGlossary(){
  $.getJSON('glossary/glossary.json', function(data) {
    glossary = data['glossary'].sort(function(a, b) {
      return (a[fr_lang].toLowerCase().localeCompare(b[fr_lang].toLowerCase(), "es-ES"));
    });

    console.log(glossary);

    showResults();
  });
}

function showResults() {

  $('.lang_switch').html('<a href="#" class="lang_switch">View '+jsUcfirst(to_lang)+' to '+jsUcfirst(fr_lang)+' glossary</a>');

  $.each(alphabet, function(letter) {
    $.each(glossary, function(index, value) {
      if (glossary[index][fr_lang].charAt(0).toUpperCase() == alphabet[letter].toUpperCase() && letters.indexOf(alphabet[letter]) == -1) {
        letters.push(alphabet[letter]);
      }
    });
  });

  $.each(letters, function(letter) {
    terms += '<a name="' + letters[letter].toUpperCase() + '"></a><h3>' + letters[letter].toUpperCase() + '</h3>';

    terms += '<div class="table-offset"><table class="table table-hover">';
     //terms += '<thead><tr><th>'+jsUcfirst(fr_lang)+'</th><th>'+jsUcfirst(to_lang)+'</th></thead>';
    terms += '<thead><tr><th>'+jsUcfirst(checktableHeader(fr_lang))+'</th><th>'+jsUcfirst(checktableHeader(to_lang))+'</th></thead>';
    terms += '<tbody>';

    $.each(glossary, function(index, value) {
      var firstLetter = glossary[index][fr_lang].charAt(0);

      if (firstLetter == letters[letter] || firstLetter == letters[letter].toUpperCase()) {

        if(fr_lang == 'english'){
          terms += '<tr><td><strong>' + glossary[index][fr_lang] + '</strong></td><td>' + glossary[index][to_lang] + '</td></tr>';
        }else{
          terms += '<tr><td><strong>' + glossary[index][fr_lang] + '</strong></td><td>' + glossary[index][to_lang] + '</td></tr>';
        }

      }
    });

    terms += '</tbody>';
    terms += '</table></div>';
    terms += '<a href="#" title="Back to top">Back to top</a></div>';
  });

  $('#terms').html(terms);
}

function jsUcfirst(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

getGlossary();
