var fev_activity = {

	// Page loaded
	bgcolr: "",
	init: function () {
		setTimeout(fev_activity.applyAction, 300);
		$('.ans').css("display", "none");
		$('.slide-data').click(function () {
			$(this).siblings(".ans").toggle(300);
		});
	},

	// assign mouse/key events 
	applyAction: function () {
		$(".fev_H_RevealBtn  .fevClickbtn").each(function () {
			var bgcolor = $(this).css("background-color");
			$(this).attr("data-color", bgcolor)
		})
		$(".fev_H_RevealBtn  .fevClickbtn").off("click", fev_activity.on_Clicked).on("click", fev_activity.on_Clicked);
	},

	on_Clicked: function () {
		if ($(this).hasClass("slectedbtn")) {
			return false;
		}
		$(".fev_H_RevealBtn  .slectedbtn").removeClass("slectedbtn")
		$(".fev_H_RevealBtn .displaypopup").removeAttr("style");
		var bgcolr = $(this).data("color");
		var id = $(this).attr("id");
		var poup = $(".fev_H_RevealBtn .displaypopup[data-id='" + id + "']");
		$(poup).css({ "background-color": bgcolr, "color": "#000" });
		var popholder = $(".fev_H_RevealBtn .popholder");
		$(this).after($(popholder));
		//$(popholder).show().attr("tabindex", "0");
		//$(popholder).focus();
		$(this).addClass("slectedbtn")
	}
}

$(document).ready(fev_activity.init);