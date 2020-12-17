import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GalleryGridViewComponent } from './gallery-grid-view.component';

describe('GalleryGridViewComponent', () => {
  let component: GalleryGridViewComponent;
  let fixture: ComponentFixture<GalleryGridViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryGridViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
