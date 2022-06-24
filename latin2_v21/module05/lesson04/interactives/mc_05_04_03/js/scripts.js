$(document).ready(function () {

    function checktextversion() {
        if ($(".ng_il.fevng_mc .viewport.il_textversion.ng-hide").length) {
            init()
        } else {
            setTimeout(checktextversion, 200)
        }
        console.log("checktextversion")
    }

    function init() {
        console.log("hello")
        $(".ng_il.fevng_mc .viewport.il_textversion.ng-hide").show();
    }
    checktextversion();
})

