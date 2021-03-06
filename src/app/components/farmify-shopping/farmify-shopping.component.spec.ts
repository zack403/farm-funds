import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmifyShoppingComponent } from './farmify-shopping.component';

describe('FarmifyShoppingComponent', () => {
  let component: FarmifyShoppingComponent;
  let fixture: ComponentFixture<FarmifyShoppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmifyShoppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmifyShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
