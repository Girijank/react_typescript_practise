$(document).ready(function(){

	//Google Analytics Course specifics content
	if(typeof analytics != 'undefined'){//make sure we are setup for googleUA
	
		//****************text version***************************//
		$('.toggleSwitch').on('click', function() {	
			var uaCategory = 'Interactives';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+' Interactive';
			var uaAction = 'Text Version Clicked';
			var uaValue = '100';
			//console.log(uaCategory, uaAction, uaLabel,uaValue);
			analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
		});
		
		//****************text version - click to reveal***************************//
		$('.textVersion div.clickReveal a.title').on('click', function() {	
			var uaCategory = 'Interactives';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+' Interactive';
			var uaAction = 'Click to Reveal Clicked';
			var uaValue = '100';
			//console.log(uaCategory, uaAction, uaLabel,uaValue);
			analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
		});

		//****************model***************************//
		$('a.modal-pop').on('click', function() {
			var linkText = $(this).text();	
			var uaCategory = 'Navigational Elements';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+' Modal link: '+linkText;
			var uaAction = 'Modal Opened';
			var uaValue = '100';
			//console.log(uaCategory, uaAction, uaLabel,uaValue);
			analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
		});
		
		//****************pop-up***************************//
		$('a.pop').on('click', function() {
			var linkText = $(this).text();	
			var uaCategory = 'Navigational Elements';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+' Pop-up link: '+linkText;
			var uaAction = 'Pop-up Opened';
			var uaValue = '100';
			//console.log(uaCategory, uaAction, uaLabel,uaValue);
											
			analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
		});
		
		//****************tabs***************************//
		$('div.tabs a.tab').on('click', function() {
			var tabCount = $('div.tabs a.tab').length;
			var tabCurrent = $('div.tabs a.tab').index(this)+1;
			var tabText = $(this).text();	
			var uaCategory = 'Tabs';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+", Tab Title: "+tabText+", "+tabCurrent+" of "+tabCount;
			var uaAction = 'Tab Clicked On';
			var uaValue = '100';
			//console.log(uaCategory, uaAction, uaLabel,uaValue);
			analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
		});
		
		//****************accordions***************************//
		$('div.accordion a.title').on('click', function() {
			var accCount = $('div.accordion a.title').length;
			var accCurrent = $('div.accordion a.title').index(this)+1;
			var accText = $(this).text();	
			var uaCategory = 'Accordion';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+", Accordion Title: "+accText+", "+accCurrent+" of "+accCount;
			var uaAction = 'Accordion Clicked On';
			var uaValue = '100';
			//console.log(uaCategory, uaAction, uaLabel,uaValue);
			analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
		});
		
		//****************carousel***************************//
		$('div.carousel a.carousel-next, div.carousel a.carousel-prev').on('click', function() {
			var carCount = $('div.cslider div.card').length / $('div.carousel').data("sets");
			var uaCategory = 'Carousel';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+", Carousel Sets: "+carCount;
			var uaAction = 'Carousel Navigation Clicked On';
			var uaValue = '100';
			//console.log(uaCategory, uaAction, uaLabel,uaValue);
			analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
		});
		
		//****************roundabout***************************//
		$('ul.roundabout li.roundabout-moveable-item').on('click', function() {
			var rouCount = $('ul.roundabout li.roundabout-moveable-item').length ;
			var rouCurrent = $('ul.roundabout li.roundabout-moveable-item').index(this)+1;
			var uaCategory = 'Roundabout';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+", "+rouCurrent+" of "+rouCount;
			var uaAction = 'Roundabout Clicked On';
			var uaValue = '100';
			//console.log(uaCategory, uaAction, uaLabel,uaValue);
			analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
		});
		
		//****************click to reveal***************************//
		$('div.clickReveal a.title').on('click', function() {
			var accText = $(this).text();	
			var uaCategory = 'Accordions';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+", Accordion Title: "+accText;
			var uaAction = 'Click to Reveal Clicked';
			var uaValue = '100';
			//console.log(uaCategory, uaAction, uaLabel,uaValue);
			analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
		});
		
		
		//****************tool-tips***************************//
		$('.tip-top, .tip-bottom, .tip-right , .tip-left').on('mouseover', function() {
			var toolText = $(this).text();	
			var uaCategory = 'Tooltips';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+", Tooltip: "+toolText;
			var uaAction = 'Tooltip moused over';
			var uaValue = '100';
			console.log(uaCategory, uaAction, uaLabel,uaValue);
			//analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
		});
		
		
		//******************INTERACTIVES********************//
		//***************slide interactives***************//
		$('.ui_interactive').on('Begin', function(event) {
			var uaCategory = 'Interactives';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+' Interactive';
			var uaAction = 'Begin Button Clicked';
			var uaValue = '1';
			//console.log(uaCategory, uaAction, uaLabel,uaValue);
			analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
        });	
		
		$('.ui_interactive').on('CORRECT', function(event) { 
			var uaCategory = 'Interactives';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+' Answered Correctly';
			var uaAction = 'Submit Button Clicked';
			var uaValue = '1';
			//console.log(uaCategory, uaAction, uaLabel,uaValue);
			analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
		});
		
		$('.ui_interactive').on('INCORRECT', function(event) { 
			var uaCategory = 'Interactives';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+' Answered Incorrectly';
			var uaAction = 'Submit Button Clicked';
			var uaValue = '1';
			//console.log(uaCategory, uaAction, uaLabel,uaValue);
			analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
		});
		
		$('.ui_interactive').on('FAILED', function(event) { 
			var uaCategory = 'Interactives';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+' Failed';
			var uaAction = 'Submit Button Clicked';
			var uaValue = '1';
			//console.log(uaCategory, uaAction, uaLabel,uaValue);
			analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
		});	
		
		$('.ui_interactive').on('CONTINUE', function(event) { 
			var uaCategory = 'Interactives';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+' Continued, too many tries ';
			var uaAction = 'Submit Button Clicked';
			var uaValue = '1';
			//console.log(uaCategory, uaAction, uaLabel,uaValue);
			analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
		});	
		
		$('.ui_interactive').on('RESTARTED', function(event) { 
			var uaCategory = 'Interactives';
			var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+' Interactive restarted ';
			var uaAction = 'Restart Button Clicked';
			var uaValue = '1';
			//console.log(uaCategory, uaAction, uaLabel,uaValue);
			analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
		});	
		
		
		//*******************XML dialog buttons for begin,correct, incorrect, reset***********************//
		$('.ui_interactive').on('NEW-BUTTON', function(event) {
			$('.ui-dialog-buttonset :button').each(function() {
				$(this).on('click', function(event, data) {
					var intText = $(this).parent().parent().siblings(".ui-dialog-titlebar").text();
					var uaCategory = 'Interactives';
					var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+' Interactive: '+intText;
					var uaAction = 'Dialog Button Clicked';
					var uaValue = '1';
					//console.log(uaCategory, uaAction, uaLabel,uaValue);
					analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
				});	
			});
		});
		
		$('.ui_interactive').on('NEW-BUTTON-CLOSED', function(event) {
			$('.ui-dialog-buttonset :button').each(function() {
				$(this).on('click', function(event, data) {
					var intText = $(this).parent().parent().siblings(".ui-dialog-titlebar").text();
					var uaCategory = 'Interactives';
					var uaLabel = FLVS.Sitemap.module[current_module].title+":"+$('title').text()+' Interactive: '+intText;
					var uaAction = 'Dialog Button Clicked';
					var uaValue = '1';
					//console.log(uaCategory, uaAction, uaLabel,uaValue);
					analytics.trigger(uaCategory, uaAction, uaLabel,uaValue);
				});	
			});
		});
		
				
		
	};
	
	
	
});
