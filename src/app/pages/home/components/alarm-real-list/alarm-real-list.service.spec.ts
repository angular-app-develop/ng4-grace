import { TestBed, inject } from '@angular/core/testing';

import { AlarmRealListService } from './alarm-real-list.service';

describe('AlarmRealListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmRealListService]
    });
  });

  it('should be created', inject([AlarmRealListService], (service: AlarmRealListService) => {
    expect(service).toBeTruthy();
  }));
});
