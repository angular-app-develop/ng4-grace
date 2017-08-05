import { TestBed, inject } from '@angular/core/testing';

import { AlarmPostionStatService } from './alarm-postion-stat.service';

describe('AlarmPostionStatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmPostionStatService]
    });
  });

  it('should be created', inject([AlarmPostionStatService], (service: AlarmPostionStatService) => {
    expect(service).toBeTruthy();
  }));
});
