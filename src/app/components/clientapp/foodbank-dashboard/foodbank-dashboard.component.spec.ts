import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodbankDashboardComponent } from './foodbank-dashboard.component';

describe('FoodbankDashboardComponent', () => {
  let component: FoodbankDashboardComponent;
  let fixture: ComponentFixture<FoodbankDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodbankDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodbankDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
