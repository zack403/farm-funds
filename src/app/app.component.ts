import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Platform } from '@angular/cdk/platform';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { stringify } from '@angular/compiler/src/util';




declare var jQuery;
declare var Joomla: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'farmfunds';
  promptEvent: any;

  constructor(public router: Router, private swUpdate: SwUpdate, private platform : Platform) { 
	
	window.addEventListener('beforeinstallprompt', event => {
		this.promptEvent = event;
	  });

	this.swUpdate.available.subscribe(event => {
		this.updateToLatest();
	  });
  }


  ngOnInit() {
	if(this.platform.IOS ) {
		const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
		console.log("istand", isInStandaloneMode);
		if (!isInStandaloneMode) {
			Swal.fire({
				title: '',
				html:
				'<div> To install this web app on your device tap the Menu button and then <strong>"Add to Home screen" button.</strong></div>' +
				'<div style="margin-top: 10px"><img src="./assets/ios-menu-btn.png"> <i class="fa fa-arrow-right"></i> <img src="./assets/ios-add-btn.png"</div>',
				showCloseButton: true,
				allowOutsideClick: () => false,
				showCancelButton: false,
				showConfirmButton: false,
			})
		}
		
	}

	if(!this.router.url.includes('app/')) {
		jQuery('#floatingWhatsAppButton').floatingWhatsApp({
			phone: '+2348097365000', //WhatsApp Business phone number International format-
			//Get it with Toky at https://toky.co/en/features/whatsapp.
			headerTitle: 'Chat with us on WhatsApp!', //Popup Title
			popupMessage: 'Hello, how can we help you?', //Popup Message
			showPopup: true, //Enables popup display
			buttonImage: '<img src="https://rawcdn.githack.com/rafaelbotazini/floating-whatsapp/3d18b26d5c7d430a1ab0b664f8ca6b69014aed68/whatsapp.svg" />', //Button Image
			//headerColor: 'crimson', //Custom header color
			//backgroundColor: 'crimson', //Custom background button color
			position: "left",
			zIndex : 1000
		  });
	}

		var j2storeURL = 'index.html';
		(function ($) {
			$.ajaxSetup({
				headers: {
					'X-CSRF-Token': Joomla.getOptions('csrf.token')
				}
			});
		})(jQuery);
		jQuery(function ($) {
			$('a[target=ls-scroll]').each(function () {
				var href = this.getAttribute('href'),
					root = 'index.html';
				if (href.indexOf(root) === 0) this.setAttribute('href', href.substr(root.length));
			});
		});
		var LS_Meta = {
			"v": "6.6.053"
		};

		jQuery(function ($) {

			var addonId = $("#sppb-addon-1551312762459"),
				prentSectionId: any = addonId.parent().closest("section");

			if ($("#sppb-addon-1551312762459").find(".optintype-popup").length !== 0 && $("body:not(.layout-edit)")
				.length !== 0) {
				prentSectionId.hide();
			}

			if ($("#sppb-addon-1551312762459").find(".optintype-popup").length !== 0 && $("body:not(.layout-edit)")
				.length !== 0) {
				//var parentSection 	= $("#sppb-addon-1551312762459").parent().closest("section"),
				var addonWidth = addonId.parent().outerWidth(),
					optin_timein = 2000,
					optin_timeout = 10000,
					prentSectionId: any = ".com-sppagebuilder:not(.layout-edit) #" + addonId.attr("id");

				$(window).load(function () {
					setTimeout(function () {
						$.magnificPopup.open({
							items: {
								src: "<div class=\"sppb-optin-form-popup-wrap\" \">" + $(
									addonId)[0].outerHTML + "</div>"
								//src: "<div style=\"width:+"addonWidth"+\">" + $(addonId)[0].outerHTML + "</div>"
							},
							type: "inline",
							mainClass: "mfp-fade",
							disableOn: function () {
								return true;
							},
							callbacks: {
								open: function () {
									if (optin_timeout) {
										setTimeout(function () {
											$("#sppb-addon-1551312762459")
												.magnificPopup("close");
										}, optin_timeout);
									}
								}
							}
						});
					}, optin_timein);
				}); //window
			};
		})

		var jQowlImg = false;

		function initJQ() {
			if (typeof (jQuery) == 'undefined') {
				if (!jQowlImg) {
					jQowlImg = true;
					document.write('<scr' +
						'ipt type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></scr' +
						'ipt>');
				}
				setTimeout('initJQ()', 500);
			}
		}
		initJQ();

		if (jQuery) jQuery.noConflict();


		var jQowlImg = false;
		initJQ();

		if (jQuery) jQuery.noConflict();
  }

  updateToLatest(): void {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
