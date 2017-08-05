import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmTrendChartComponent } from './alarm-trend-chart.component';

describe('AlarmTrendChartComponent', () => {
  let component: AlarmTrendChartComponent;
  let fixture: ComponentFixture<AlarmTrendChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmTrendChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmTrendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
