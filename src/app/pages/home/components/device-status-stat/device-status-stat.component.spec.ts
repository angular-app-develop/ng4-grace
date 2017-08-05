import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceStatusStatComponent } from './device-status-stat.component';

describe('DeviceStatusStatComponent', () => {
  let component: DeviceStatusStatComponent;
  let fixture: ComponentFixture<DeviceStatusStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceStatusStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceStatusStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
