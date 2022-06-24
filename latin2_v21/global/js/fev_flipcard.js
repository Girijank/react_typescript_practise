
var checkingMaxcount = 5;
var fc_checkingcount = 0;
var _activityId, _jsonPath, _cardFront, _cardBack;
var _isTextVersion = false;
var _dataHolder = [];
var _cardHolder = [];
var _textversionHolder = [];
var _wrapper = "<div class='fev-wrapper'>Wrapper</div>";
var _cardBox = "<div class='fev-info-holder'></div><div class='fev-content-holder'>Card Holder</div>";
var _cardBody_start = "<div class='fev-container'><div class='fev-card'";
var _cardBody_end = "</div></div>";
var _instrBackdrop = "<div class='dialog_backdrop' title='dialog_backdrop'></div>";
var tv_front = "<h4>Front of the card</h4>";
var tv_back = "<h4>Back of the card</h4>";
var quesIcon = "<button type='button' aria-label='Directions' class='il_question_mark ng-scope'>?</button>";

function _loadJsonFile(count) {
	var activityId = _dataHolder[count].id;
	var jsonPath = _dataHolder[count].path;
	_cardHolder = [];
	_textversionHolder = [];
	$.getJSON(jsonPath, function (data) {
		var jsonData = data;
		var _instr = data.body.instruction;
		var _instr_tv = data.body.instruction_textversion;
		var noOfCards = jsonData.body.cards.length;
		if (_instr_tv != undefined) {
			_textversionHolder.push("<h4>Instruction</h4><p>" + _instr_tv + "</p><hr>");
		}
		for (var i = 0; i < noOfCards; i++) {
			var _card = jsonData.body.cards[i];
			var _cardFront = "<div class='front'>" + _card.front.content + "</div>"
			var _cardBack = "<div class='back'>" + _card.back.content + "</div>"
			var _tvCardFront = _card.front.textversion;
			var _tvCardBack = _card.back.textversion;
			_cardHolder.push(_cardBody_start + "id='" + _card.id + "' tabindex='0'>" + _cardFront + _cardBack + _cardBody_end);
			_textversionHolder.push(tv_front + _tvCardFront + tv_back + _tvCardBack + "<hr>");
		}
		_dataHolder[count].instr = _instr;
		_dataHolder[count].cards = _cardHolder;
		_dataHolder[count].tv = _textversionHolder;
		_dataHolder[count].showTv = false;
		count++;
		if (count < _dataHolder.length) {
			_loadJsonFile(count);
		} else {
			_appendMarkupToPage(0);
		}
	});
}

function _appendMarkupToPage(count) {
	var activityId = _dataHolder[count].id;
	if (!$(document).find("#" + activityId).hasClass("FlipcardComplete")) {
		var cards = _dataHolder[count].cards;
		var instr = _dataHolder[count].instr;
		var btn_id = "btn_" + activityId;
		var instrWindow = "<div class='modal_holder'><div class='modal-dialog modal-show'><div class='modal-content'><div class='modal-header'><h3 class='modal-title'>Instructions</h3></div><div class='modal-body'><div class='modalContent'>" + instr + "</div></div><div class='modal-footer'><button type='button' class='il_modalbtn il_btn btn-primary' tabindex='0' data-ng-click='vm.modalClose()'>OK</button></div></div></div></div>";
		var toggleBtn = "<button class='il_textbtn il_btn fev-showtext' id='" + btn_id + "'>Show Text Version</button>";
		$(document).find("#" + activityId).html(_wrapper);
		$("#" + activityId).find(".fev-wrapper").html(_cardBox);
		$("#" + activityId).find(".fev-wrapper").append(toggleBtn);
		$("#" + activityId).find(".fev-content-holder").html(cards);
		$("#" + activityId).find('.fev-showtext').html("Show Text Version");
		$("#" + activityId).find(".fev-content-holder").css("width", "fit-content");

		if (instr != undefined) {
			$("#" + activityId).find(".fev-info-holder").append(quesIcon);
			$("#" + activityId).find(".fev-info-holder").append(_instrBackdrop);
			$("#" + activityId).find(".fev-info-holder").append(instrWindow);
		}

		$("#" + btn_id).click(function () {
			var showID = $(this).attr("id").split("_")[1];
			_showContent(showID);
		});
		$(document).find("#" + activityId).addClass("FlipcardComplete")
	}
	count++;
	// console.log("+++ " + count);
	if (count < _dataHolder.length) {
		_appendMarkupToPage(count);
	} else {
		initFlipEvent();
	}
}

function initFlipEvent() {
	$('.fev-interactive-container .il_modalbtn').off("click").on("click", function () {
		// $(this).hide();
		$(this).closest(".modal_holder").hide();
		$(this).closest(".fev-info-holder").find(".dialog_backdrop").hide();
	});

	$('.fev-interactive-container .il_question_mark').off("click").on("click", function () {
		// $(this).hide();
		$(this).siblings(".modal_holder").show();
		$(this).siblings(".dialog_backdrop").show();
	});

	$('.fev-card').off("click").on("click", function () {
		$(this).toggleClass('flipped');
	});

	$('.fev-card').off("keyup").on("keyup", function (e) {
		if (e.keyCode == 9) {
			$(this).addClass("fev-card-focus");
		}
		if (e.keyCode == 13) {
			$(this).toggleClass('flipped');
		}
	});

	$('.fev-card').off("focusout").on("focusout", function (e) {
		$(this).removeClass("fev-card-focus");
	});
}

function _showContent(showID) {
	var obj = _dataHolder.filter(function (entry) { return entry.id == showID; });
	if (!obj[0].showTv) {
		_showTextVersion(showID);
	} else {
		_showFlipCard(showID);
	}
	obj[0].showTv = !obj[0].showTv;
}

function _showTextVersion(showID) {
	var obj = _dataHolder.filter(function (entry) { return entry.id == showID; });
	var tv = obj[0].tv;
	$("#" + showID).find(".fev-content-holder").css("width", "100%");
	$("#" + showID).find(".fev-content-holder").html(tv);
	$("#" + showID).find('.fev-showtext').html("Show Interactive");
	$("#" + showID).find('.fev-wrapper').css("height", "auto");
	$("#" + showID).find(".fev-info-holder").hide();
	$("#" + showID).find(".btn-show-answer").off("keyup").on("keyup", function (e) {
		if (e.keyCode == 13) {
			$(this).click();
		}
	});
}

function _showFlipCard(showID) {
	var obj = _dataHolder.filter(function (entry) { return entry.id == showID; });
	var cards = obj[0].cards;
	$("#" + showID).find(".fev-content-holder").css("width", "fit-content");
	$("#" + showID).find(".fev-content-holder").html(cards);
	$("#" + showID).find('.fev-showtext').html("Show Text Version");
	$("#" + showID).find('.fev-wrapper').css("height", "");
	$("#" + showID).find(".fev-info-holder").show();
	initFlipEvent();
	// _checkContentWidth();
}

function _checkContentWidth() {
	setTimeout(function () {
		var _totalWidth = 0;
		var _wrapperWidth = parseInt($(".fev-wrapper").css("width").slice(0, -2));
		$(".fev-content-holder > .fev-container").each(function (i) {
			_totalWidth += parseInt($(this).css("width").slice(0, -2));
			if (_totalWidth >= _wrapperWidth) {
				$("<div class='empty'></div>").insertBefore($(this));
				_totalWidth = 0;
			}
		})
	}, 100);
}

function _thisinit() {
	$(document).find(".fev-interactive-container").each(function () {
		var activityId = $(this).attr("id");
		var jsonPath = $(this).find(".fev-flipcard").attr("data-json");
		_dataHolder.push({ "id": activityId, "path": jsonPath });
	})
	if (!_dataHolder.length) {
		return;
	}
	// console.log("XXXXX " + _dataHolder.length);
	_loadJsonFile(0);
}

function _checkFlipcardActivity() {
	if ($(document).find(".fev-interactive-container:not(.FlipcardComplete)").length) {
		_thisinit();
	} else if (fc_checkingcount <= checkingMaxcount) {
		++fc_checkingcount;
		setTimeout(_checkFlipcardActivity, 200);
	}
}

$(document).ready(function () {
	_checkFlipcardActivity()
})


