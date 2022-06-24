
$(document).ready(function () {
  init();
});

function init() {
  $(".btn_tabs").on("click", function () {
    var btnId = $(this).attr("id").split("_")[1];
    if (btnId == "all") {
      showAllContent();
    } else {
      var contentPath = $(this).attr("data-content");
      $(".content-box").empty().hide();
      $("#" + btnId).load(contentPath + " #custom_content");
      $("#" + btnId).fadeIn();
    }
  })
  showAllContent();
}

function showAllContent() {
  var btnList = $(document).find(".btn_tabs");
  var noOfBtns = $(btnList).length;
  $(".content-box").empty().hide();
  for (var i = 0; i < noOfBtns; i++) {
    var btnId = $(btnList).eq(i).attr("id").split("_")[1];
    var contentPath = $(btnList).eq(i).attr("data-content");
    $("#" + btnId).load(contentPath + " #custom_content");
    $("#" + btnId).fadeIn();
  }
}