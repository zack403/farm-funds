import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmifyShoppingDetailComponent } from './farmify-shopping-detail.component';

describe('FarmifyShoppingDetailComponent', () => {
  let component: FarmifyShoppingDetailComponent;
  let fixture: ComponentFixture<FarmifyShoppingDetailComponent>;

  beforeEach(async(() => {
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
