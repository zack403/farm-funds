import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodBankComponent } from './food-bank.component';

describe('FoodBankComponent', () => {
  let component: FoodBankComponent;
  let fixture: ComponentFixture<FoodBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
