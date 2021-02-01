(function () {
	"use strict";

	var slideMenu = jQuery('.side-menu');
	jQuery('.app').addClass('sidebar-mini');
	
	// Toggle Sidebar
	jQuery(document).on("click", "[data-toggle='sidebar']", function(event) {
		event.preventDefault();
		jQuery('.app').toggleClass('sidenav-toggled');
	
	});
	 
	jQuery(document).on("click","#children-link", function(event) {
		event.preventDefault();
		jQuery('.app').removeClass('sidenav-toggled'); //hide sidebar when body is clicked

	 })


	 jQuery(document).on("click", ".app-content", function(event) {
		event.preventDefault();

		if(jQuery(".app-sidebar").is(":visible")){  
			jQuery('.app').removeClass('sidenav-toggled');
		}
	 })


	if ( jQuery(window).width() > 739) {     
		jQuery('.app-sidebar').on("mouseover", function(event) {
			event.preventDefault();
			jQuery('.app').removeClass('sidenav-toggled');
		});
	}
	
	// Activate sidebar slide toggle
	jQuery(document).on("click", "[data-toggle='slide']", function(event) {
		event.preventDefault();
		if(!jQuery(this).parent().hasClass('is-expanded')) {
			slideMenu.find("[data-toggle='slide']").parent().removeClass('is-expanded');
		}
		jQuery(this).parent().toggleClass('is-expanded');
	});

	// Set initial active toggle
	jQuery("[data-toggle='slide.'].is-expanded").parent().toggleClass('is-expanded');

	//Activate bootstrip tooltips
	jQuery("[data-toggle='tooltip']").tooltip();

})();
