import { Component, OnInit } from '@angular/core';
import { AlarmTrendChartService } from './alarm-trend-chart.service';

@Component({
  selector: 'alarm-trend-chart',
  templateUrl: './alarm-trend-chart.component.html',
  styleUrls: ['./alarm-trend-chart.component.scss']
})
export class AlarmTrendChartComponent implements OnInit {
  chartOption: any;
  constructor(private alarmTrendChartService: AlarmTrendChartService) {
    this.chartOption = alarmTrendChartService.getData();
    alarmTrendChartService.getRealData().subscribe(
      (res) => {
        
      }
    )
  }

  ngOnInit() { }

}
