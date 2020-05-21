import { Component, OnInit } from '@angular/core';

declare var jQuery;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    jQuery(document).ready(function () {
        jQuery("#owl-example-mod_109")
            .owlCarousel({

                itemsDesktop: [1199,
                    3
                ],
                itemsDesktopSmall: [
                    993, 3
                ],
                itemsTablet: [768,
                    2],
                itemsMobile: [590,
                    2],


                items: 5,

                navigation: false,
                pagination: false,

                paginationNumbers: false
            });
    });
  }

}
