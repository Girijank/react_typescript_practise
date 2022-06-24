/**
 * Created by jmullins on 1/10/17.
 */


var param1var = getQueryVariable("id");
document.getElementById("toolCall").setAttribute("data-id", param1var);
console.log("it is - " + param1var);


$(document).ready(function() {

    //$('.toolCall').attr("data-id", param1var );


});


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }

}




