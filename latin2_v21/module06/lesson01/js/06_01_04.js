
var imgList = [];
var optList = [];

$(document).ready(function () {
  var intCount = 0;
  var checkLoad = setInterval(function () {
    var noOfQA = $(document).find(".il_question").length;
    if (noOfQA >= 1) {
      clearInterval(checkLoad);
      init();
    }
    intCount++;
    if (intCount >= 200) {
      clearInterval(checkLoad);
    }
  }, 200);
});

function init() {
  findOptions();
  findImgCaptions();
}

function findOptions() {
  var dropDown = $(".ng_il").find(".dropdown-menu li");
  var dropDownLength = dropDown.length;
  for (var i = 1; i < dropDownLength; i++) {
    var optText = dropDown.eq(i).find("span").eq(0).text();
    optList.push("<p>" + optText + "</p>");
  }
  printOpt();
}

function printOpt() {
  var tvDiv = $(".ng_il").find(".textversion1");
  tvDiv.prepend("<div class='il_textversion_question slide0'><h4 class='ng-binding ng-scope'>Options</h4></div>");
  var optDiv = $(".ng_il").find(".slide0");
  optDiv.append(optList);
}

function findImgCaptions() {
  var activityImg = $(".ng_il").find("img");
  var activityCap = $(".ng_il").find(".caption");
  var noOfQA = $(activityImg).length;
  for (var i = 0; i < noOfQA; i++) {
    var obj = {};
    var imgAlt = $(activityImg).eq(i).attr("alt");
    var imgCap = $(activityCap).eq(i).text();
    if (addAltInList(imgAlt)) {
      obj.imgAlt = imgAlt;
      obj.imgCap = imgCap;
      imgList.push(obj);
    }
  }
  printAlt();
}

/* function addOption(addStr) {
  for (var i = 0; i < optList.length; i++) {
    if (addStr == optList[i].optText) {
      return false;
    }
  }
  return true;
} */

function addAltInList(addStr) {
  for (var i = 0; i < imgList.length; i++) {
    if (addStr == imgList[i].imgAlt) {
      return false;
    }
  }
  return true;
}


function printAlt() {
  for (var i = 0; i < imgList.length; i++) {
    var addCont = "<p>" + imgList[i].imgAlt + "</p><p>Text: " + imgList[i].imgCap + "</p>";
    var addTo = $(".il_textversion_question").eq(i + 1).find("h4");
    $(addCont).insertAfter(addTo);
  }
}
