import { Component, OnInit } from '@angular/core';

declare var jQuery;
@Component({
  selector: 'app-gallery-grid-view',
  templateUrl: './gallery-grid-view.component.html',
  styleUrls: ['./gallery-grid-view.component.css']
})
export class GalleryGridViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
