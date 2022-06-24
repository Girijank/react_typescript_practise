// Style Guide color swatches
function getContrastYIQ(hexcolor){
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

$.each( swatchColors, function( key, value ) {
    var textColor = getContrastYIQ(value);
    $('.swatches').append('<div class="swatch" style="background-color:#' + value + '; color:' + textColor + '">#' + value + '</div>');
});