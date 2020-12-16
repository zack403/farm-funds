import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FarmifyShoppingDetailComponent } from './farmify-shopping-detail.component';

describe('FarmifyShoppingDetailComponent', () => {
  let component: FarmifyShoppingDetailComponent;
  let fixture: ComponentFixture<FarmifyShoppingDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmifyShoppingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmifyShoppingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
