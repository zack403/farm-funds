import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

declare var jQuery;
@Component({
  selector: 'app-navigation-section',
  templateUrl: './navigation-section.component.html',
  styleUrls: ['./navigation-section.component.css']
})
export class NavigationSectionComponent implements OnInit {
  constructor(private authSvc: AuthService) { }

  ngOnInit() {
    jQuery(".sp-megamenu-wrapper li a").click(function (event) {
        event.preventDefault();
        var $self = jQuery(this);
        var $this = jQuery(this).parent();

        if($this.hasClass('active')) {
          return;
        }

        $self.closest('ul').children().removeClass('active');
        $self.parent().addClass('active');      
    })

    jQuery(".sp-dropdown-inner li a").click(function (event) {
      event.preventDefault();
      jQuery('.sp-menu-item').removeClass('active');   
    })
  }

}
