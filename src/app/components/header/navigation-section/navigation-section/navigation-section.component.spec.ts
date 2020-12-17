import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavigationSectionComponent } from './navigation-section.component';

describe('NavigationSectionComponent', () => {
  let component: NavigationSectionComponent;
  let fixture: ComponentFixture<NavigationSectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
