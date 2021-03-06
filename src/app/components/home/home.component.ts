import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

declare var jQuery;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
      
        this.authSvc.logout();
        jQuery("#layerslider_1").layerSlider({
          createdWith: '6.6.053',
          sliderVersion: '6.6.053',
          type: 'fullwidth',
          preventSliderClip: false,
          skin: 'v6',
          hoverPrevNext: false,
          navStartStop: false,
          navButtons: false,
          showCircleTimer: false,
          popupWidth: 640,
          popupHeight: 360,
          skinsPath: 'https://demo.joomlabuff.com/realgarden/components/com_layer_slider/base/static/layerslider/skins/'
        });

          jQuery("#owl-example-mod_109").owlCarousel({

            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [993, 3],
            itemsTablet: [768, 2],
            itemsMobile: [590, 2],


            items: 5,

            navigation: false,
            pagination: false,

            paginationNumbers: false


          });

          jQuery("#owl-example-mod_110").owlCarousel({
            itemsDesktop: [1199, 2],
            itemsDesktopSmall: [979, 1],
            itemsTablet: [768, 1],
            itemsMobile: [479, 1],

            loop: true,
            autoPlay: true,

            items: 2,

            navigation: false,
            pagination: false,

            paginationNumbers: false
          });

           // Filters
        jQuery('.sp-simpleportfolio-filter li a').on('click', function(event){
          event.preventDefault();
          var $self = jQuery(this);
          var $this = jQuery(this).parent();

          if($this.hasClass('active')) {
            return;
          }

          $self.closest('ul').children().removeClass('active');
          $self.parent().addClass('active');

          var $local = $self.closest('.sp-simpleportfolio').children('.sp-simpleportfolio-items');
          
          $local.shuffle( 'shuffle', $this.data('group') );
        });
  }

}
