import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResponseresetComponent } from './responsereset.component';

describe('ResponseresetComponent', () => {
  let component: ResponseresetComponent;
  let fixture: ComponentFixture<ResponseresetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseresetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
