import { Component, OnInit } from '@angular/core';

declare var jQuery;
@Component({
  selector: 'app-navigation-section',
  templateUrl: './navigation-section.component.html',
  styleUrls: ['./navigation-section.component.css']
})
export class NavigationSectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // jQuery(".sp-megamenu-wrapper li a").click(function (event) {
    //     event.preventDefault();
    //     var $self = jQuery(this);
    //     var $this = jQuery(this).parent();

    //     if($this.hasClass('active')) {
    //       return;
    //     }

    //     $self.closest('ul').children().removeClass('active');
    //     $self.parent().addClass('active');      
    // })

    // jQuery(".sp-dropdown-inner li a").click(function (event) {
    //   event.preventDefault();
    //   if(jQuery(".sp-megamenu-wrapper li a").hasClass("active")){
    //     jQuery(".sp-megamenu-wrapper li a").removeClass('active');
    //     var parent = jQuery(".sp-dropdown-inner li a");
    //     parent.addClass('active');
    //   };      
    // })
  }

}
