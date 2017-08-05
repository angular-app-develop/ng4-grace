import { TestBed, inject } from '@angular/core/testing';

import { AlarmListService } from './alarm-list.service';

describe('AlarmListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmListService]
    });
  });

  it('should ...', inject([AlarmListService], (service: AlarmListService) => {
    expect(service).toBeTruthy();
  }));
});
