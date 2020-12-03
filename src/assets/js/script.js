(function() {
	"use strict";

	//cover images
	jQuery( ".cover-image").each(function() {
		  var attr = jQuery(this).attr('data-image-src');
		
		  if (typeof attr !== typeof undefined && attr !== false) {
			  jQuery(this).css('background', 'url('+attr+') center center');
		  }
	});
	
	//cover image2
	jQuery( ".cover-image2").each(function() {
		  var attr = jQuery(this).attr('data-image-src');
		
		  if (typeof attr !== typeof undefined && attr !== false) {
			  jQuery(this).css('background', 'url('+attr+') center center');
		  }
	});
	
	//mCustomScrollbar
	// jQuery(".app-sidebar").mCustomScrollbar({
	// 	theme:"minimal",
	// 	autoHideScrollbar: true,
	// 	scrollbarPosition: "outside"
	// });

	//PAGE LOADING
	jQuery(window).on("load", function(e) {
		jQuery("#spinner").fadeOut("slow");
	})
	
	// tooltip
	jQuery("[data-toggle='tooltip']").tooltip();

	// popover
	jQuery('[data-toggle="popover"]').popover({
		container: 'body'
	});

	/*----SideBar----*/
	jQuery(".app-sidebar a").each(function() {
	  var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) { 
			jQuery(this).addClass("active");
			jQuery(this).parent().addClass("active"); // add active to li of the current link
			jQuery(this).parent().parent().prev().addClass("active"); // add active class to an anchor
			jQuery(this).parent().parent().prev().click(); // click the item to make it drop
		}
	});
	

	/*----FullScreen----*/
	jQuery(document).on("click","#fullscreen-button", function toggleFullScreen() {
		if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
			if (document.documentElement.requestFullScreen) {
			  document.documentElement.requestFullScreen();
			} else if (document.documentElement.mozRequestFullScreen) {
			  document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullScreen) {
			  document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			} else if (document.documentElement.msRequestFullscreen) {
			  document.documentElement.msRequestFullscreen();
			}
		} else {
			if (document.cancelFullScreen) {
			  document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
			  document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
			  document.webkitCancelFullScreen();
			} else if (document.msExitFullscreen) {
			  document.msExitFullscreen();
			}
		}
	})

	/*----GlobalSearch----*/
	jQuery(document).on("click", "[data-toggle='search']", function(e) {
		var body = jQuery("body");

		if(body.hasClass('search-gone')) {
			body.addClass('search-gone');
			body.removeClass('search-show');
		}else{
			body.removeClass('search-gone');
			body.addClass('search-show');
		}
	});
	var toggleSidebar = function() {
		var w = jQuery(window);
		if(w.outerWidth() <= 1024) {
			jQuery("body").addClass("sidebar-gone");
			jQuery(document).off("click", "body").on("click", "body", function(e) {
				if(jQuery(e.target).hasClass('sidebar-show') || jQuery(e.target).hasClass('search-show')) {
					jQuery("body").removeClass("sidebar-show");
					jQuery("body").addClass("sidebar-gone");
					jQuery("body").removeClass("search-show");
				}
			});
		}else{
			jQuery("body").removeClass("sidebar-gone");
		}
	}
	toggleSidebar();
	jQuery(window).resize(toggleSidebar);
		
	/*----CollapseableLeftMenu----*/
	jQuery("[data-collapse]").each(function() {
		var me = jQuery(this),
				target = me.data('collapse');

		me.click(function() {
			jQuery(target).collapse('toggle');
			jQuery(target).on('shown.bs.collapse', function() {
				me.html('<i class="fa fa-minus"></i>');
			});
			jQuery(target).on('hidden.bs.collapse', function() {
				me.html('<i class="fa fa-plus"></i>');
			});
			return false;
		});
	});
	
	/*----Alerts----*/
	jQuery(".alert-dismissible").each(function() {
		var me = jQuery(this);

		me.find('.close').on("click", function(e) {
			me.alert('close');
		});
	});
	
})();