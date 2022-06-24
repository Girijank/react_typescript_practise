$(document).ready(function () {

	function run() {
		setTimeout(checkHeader, 100);
	}

	function checkHeader() {
		if ($(".jTimeline #head").length) {
			this_init();
		} else {
			run()
		}
	}

	function this_init() {
		var title = $(".jTimeline #head h1").text();
		var h2 = $("<h2 class='activitytitle'>" + title + "</h2>");
		$(".jTimeline #head").append($(h2))
		$(".jTimeline #head h1").remove()
		$(".jTimeline #head h3").remove();

		$(".jTimeline .jcarousel-item a").each(function () {
			$(this).attr({ "href": "javascript:void(0)", "tabindex": "0" });
			$(this).focus(function () {
				$(this).mouseover()
			})
		})

		$(".jTimeline span.tooltip").each(function (i) {
			var tip = $(".fev_activity_tooltip.hide a").eq(0);
			$($(".jTimeline span.tooltip").eq(i)).before($(tip));
		})
		//$(".jTimeline span.tooltip").before($(".fev_activity_tooltip.hide a"));
		$(".jTimeline span.tooltip").remove();
		$(".fev_activity_tooltip.hide").remove();

	}

	run();

})