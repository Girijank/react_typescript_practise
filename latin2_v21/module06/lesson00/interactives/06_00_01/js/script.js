var fev_imgClick = {
	// Page loaded
	init: function () {
		fev_imgClick.applyAction();
	},

	// assign mouse/key events 
	applyAction: function () {
		$(".fev_imgClick  .imgclickbtn").off("click touchstart", fev_imgClick.onPopupOpen).on("click touchstart", fev_imgClick.onPopupOpen)
		$(".fev_imgClick  .imgclickbtn").attr({ "tabindex": "0", "aria-label": "hotspot" })
		$(".fev_imgClick  .closeit").off("click touchstart", fev_imgClick.onPopupClose).on("click touchstart", fev_imgClick.onPopupClose)
		$(".fev_imgClick  .poup_bgblack").off("click touchstart", fev_imgClick.onPopupClose).on("click touchstart", fev_imgClick.onPopupClose);

		$("a.print").each(function () {
			$(this).attr("tabindex", "0")
		})

	},

	onPopupClose: function () {
		var id = "#" + $(".fev_imgClick .popupContent:visible").data("popid");
		$(".fev_imgClick  .imgclickbtn").attr({ "tabindex": "0" });
		$(".fev_imgClick .popupHolder").hide();
		$(id).focus();
	},

	onPopupOpen: function () {
		$(".fev_imgClick .popupwin").attr({ "tabindex": "0" })
		$(".fev_imgClick .popupContent").hide()
		var id = $(this).attr("id");
		$(this).closest(".fev_imgClick").find("[data-popid='" + id + "']").show();
		$(".fev_imgClick .popupHolder").show();
		$(".fev_imgClick  .imgclickbtn").attr({ "tabindex": "-1" })
		$(".fev_imgClick .popupwin").focus();
	}
}

$(document).ready(fev_imgClick.init);