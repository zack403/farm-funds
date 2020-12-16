import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientappComponent } from './clientapp.component';

describe('ClientappComponent', () => {
  let component: ClientappComponent;
  let fixture: ComponentFixture<ClientappComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
