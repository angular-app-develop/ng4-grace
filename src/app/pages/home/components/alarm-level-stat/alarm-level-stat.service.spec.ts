import { TestBed, inject } from '@angular/core/testing';

import { AlarmLevelStatService } from './alarm-level-stat.service';

describe('AlarmLevelStatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmLevelStatService]
    });
  });

  it('should be created', inject([AlarmLevelStatService], (service: AlarmLevelStatService) => {
    expect(service).toBeTruthy();
  }));
});
