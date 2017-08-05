import { TestBed, inject } from '@angular/core/testing';

import { DeviceStatusStatService } from './device-status-stat.service';

describe('DeviceStatusStatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceStatusStatService]
    });
  });

  it('should be created', inject([DeviceStatusStatService], (service: DeviceStatusStatService) => {
    expect(service).toBeTruthy();
  }));
});
