import { TestBed, inject } from '@angular/core/testing';

import { DeviceDetailService } from './device-detail.service';

describe('DeviceDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceDetailService]
    });
  });

  it('should be created', inject([DeviceDetailService], (service: DeviceDetailService) => {
    expect(service).toBeTruthy();
  }));
});
