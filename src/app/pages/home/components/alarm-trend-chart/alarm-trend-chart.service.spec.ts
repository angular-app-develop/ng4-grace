import { TestBed, inject } from '@angular/core/testing';

import { AlarmTrendChartService } from './alarm-trend-chart.service';

describe('AlarmTrendChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmTrendChartService]
    });
  });

  it('should be created', inject([AlarmTrendChartService], (service: AlarmTrendChartService) => {
    expect(service).toBeTruthy();
  }));
});
