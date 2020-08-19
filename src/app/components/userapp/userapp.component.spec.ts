import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserappComponent } from './userapp.component';

describe('UserappComponent', () => {
  let component: UserappComponent;
  let fixture: ComponentFixture<UserappComponent>;

  beforeEach(async(() => {
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
