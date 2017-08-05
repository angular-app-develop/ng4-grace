import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSeachComponent } from './device-seach.component';

describe('DeviceSeachComponent', () => {
  let component: DeviceSeachComponent;
  let fixture: ComponentFixture<DeviceSeachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceSeachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
