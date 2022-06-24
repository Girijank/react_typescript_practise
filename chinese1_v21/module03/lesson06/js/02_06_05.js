
$(document).ready(function () {
    $(".fevcontrolbtns button.btn.collapsed").off("click", onbtnClick).on("click", onbtnClick);

    function onbtnClick() {
        $(".fevcontrolbtns button.btn").removeAttr("data-clicked")
        $(this).attr("data-clicked", true);
        var par = $(this).closest(".fevcontrolbtns");
        if ($(par).find("button.btn:not(.collapsed)").length) {
            $(par).find("button.btn:not(.collapsed)").each(function () {
                if ($(this).attr("data-clicked") == undefined) {
                    $(this).click();
                }
            })
        }
    }
})