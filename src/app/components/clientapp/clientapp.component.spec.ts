import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientappComponent } from './clientapp.component';

describe('ClientappComponent', () => {
  let component: ClientappComponent;
  let fixture: ComponentFixture<ClientappComponent>;

  beforeEach(async(() => {
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
