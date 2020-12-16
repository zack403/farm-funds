import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserappComponent } from './userapp.component';

describe('UserappComponent', () => {
  let component: UserappComponent;
  let fixture: ComponentFixture<UserappComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
