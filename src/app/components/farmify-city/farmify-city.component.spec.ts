import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FarmifyCityComponent } from './farmify-city.component';

describe('FarmifyCityComponent', () => {
  let component: FarmifyCityComponent;
  let fixture: ComponentFixture<FarmifyCityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmifyCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmifyCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
