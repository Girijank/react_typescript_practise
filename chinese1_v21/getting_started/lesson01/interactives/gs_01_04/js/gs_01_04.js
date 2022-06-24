$(document).ready(function () {

	// ====================================================
	// POPUPS !!!!!
	// ====================================================

	// add in close button
	var closeBtn = $(document.createElement('button')).attr({ 'class': 'closeit', "aria-label": "close" }).html('<span class="glyphicon glyphicon-remove"></span>');
	$('.custom_dialog .panel-head').append(closeBtn);


	var activeele = "";

	// close popup function
	$('.closeit, #coverit').click(function () {
		closebtn_commonfn()
	});

	$('.closeit, #coverit').on("keypress", function (e) {
		if (e.which == 13) { closebtn_commonfn() }
	});

	// open popups
	$('.dialog_trigger').click(function () {
		commonfn(this)
	});

	$('.dialog_trigger').on("keypress", function (e) {
		if (e.which == 13) {
			commonfn(this)
		}
	});

	$(".custom_dialog").attr({ "tabindex": "0", "role": "dialog" })
	$("a.dialog_trigger").attr({ "role": "button" })
	$(".coverit").attr("aria-hidden", "true")

	function commonfn(_this) {
		var whichone = $(_this).attr('data-dialog');
		$('#' + whichone).fadeIn(500);
		$('#coverit').fadeIn();
		$("a.dialog_trigger").attr({ "tabindex": "-1", "aria-hidden": "true" })
		activeele = $(_this);
		setTimeout(function () {
			$('#' + whichone).focus()
		}, 100);
	}

	function closebtn_commonfn() {
		$('.custom_dialog').hide();
		$('#coverit').hide();
		$("a.dialog_trigger").attr({ "tabindex": "0" }).removeAttr("aria-hidden")
		$(activeele).focus();
	}

	setTimeout(function () {

		$("[tabindex], .ui-button, .toggleSwitch, .closeit, .print ").attr("tabindex", "0");
		//$("a.dialog_trigger").attr({ "tabindex": "-1", "aria-hidden":"true" })
		$("a.dialog_trigger").each(function () {
			var title = $(this).attr("title")
			$(this).attr({ "tabindex": "-1", "aria-hidden": "true", "aria-label": title })
		})
		$(".dialog_backdrop").attr({ "aria-hidden": "true" })
		$(".toggleSwitch").addClass("center-block");
		$(".ui-button").on("click", function () {
			$(".dialog_trigger").attr("tabindex", "0").removeAttr("aria-hidden");
			$($(".dialog_trigger").eq(0)).focus();
		})

		$(".ui-dialog").off("keypress keyup keydown")


	}, 1000);


});