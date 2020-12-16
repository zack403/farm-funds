import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WithdrawalComponent } from './withdrawal.component';

describe('WithdrawalComponent', () => {
  let component: WithdrawalComponent;
  let fixture: ComponentFixture<WithdrawalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
