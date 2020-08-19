import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserappHeaderComponent } from './userapp-header.component';

describe('UserappHeaderComponent', () => {
  let component: UserappHeaderComponent;
  let fixture: ComponentFixture<UserappHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserappHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserappHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
