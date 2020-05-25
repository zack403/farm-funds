import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

declare var j2store: any;
declare var jQuery;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  foodID: number;
  food: any = {};
  formData: any = {};
  constructor(private route: ActivatedRoute, private prodSvc: ProductsService) { }

  ngOnInit() {

    this.foodID = JSON.parse(this.route.snapshot.paramMap.get("id"));

    this.getFoodByID();

		var j2storeURL = '../../../index.html';
		
			if(typeof(j2store) == 'undefined') {
				var j2store: any = {};
			}

	if(typeof(jQuery) != 'undefined') {
		jQuery.noConflict();
	}

	if(typeof(j2store.jQuery) == 'undefined') {
		j2store.jQuery = jQuery.noConflict();
	}

	if(typeof(j2store.jQuery) != 'undefined') {

		(function($) {
			$(document).ready(function(){
				//date, time, datetime

				if( $('.j2store_date').length ){
					$('.j2store_date').datepicker({dateFormat: 'yy-mm-dd'});
				}

				if($('.j2store_datetime').length){
					$('.j2store_datetime').datetimepicker({
							dateFormat: 'yy-mm-dd',
							timeFormat: 'HH:mm',
							
			currentText: 'Now',
			closeText: 'Done',
			timeOnlyTitle: 'Choose Time',
			timeText: 'Time',
			hourText: 'Hour',
			minuteText: 'Minute',
			secondText: 'Seconds',
			millisecText: 'Milliseconds',
			timezoneText: 'Time Zone'
			
					});
				}

				if($('.j2store_time').length){
					$('.j2store_time').timepicker({timeFormat: 'HH:mm', 
			currentText: 'Now',
			closeText: 'Done',
			timeOnlyTitle: 'Choose Time',
			timeText: 'Time',
			hourText: 'Hour',
			minuteText: 'Minute',
			secondText: 'Seconds',
			millisecText: 'Milliseconds',
			timezoneText: 'Time Zone'
			});
				}

			});
		})(j2store.jQuery);
	}
	
		if (typeof(jQuery) !== 'undefined') {
		   jQuery(document).ready(function() {
		      jQuery("body").addClass("j2store-single-product-view view-product-3  the-innovators-3");
		  });
		}


      var main_image = "assets/images/shop/10.jpg";
      j2store.jQuery(document).ready(function () {
          var enable_zoom = 0;
          if (enable_zoom) {
              j2store.jQuery('#j2store-item-main-image-1').zoom();
          }
      });
}

onChange(value) {
  this.formData.price = value;
}

getFoodByID() {
  this.food = this.prodSvc.getFoodListById(this.foodID);
}

}
