import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsSubscriptionComponent } from './products-subscription.component';

describe('ProductsSubscriptionComponent', () => {
  let component: ProductsSubscriptionComponent;
  let fixture: ComponentFixture<ProductsSubscriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
