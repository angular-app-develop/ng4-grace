import { Component, OnInit } from '@angular/core';
import { AlarmLevelStatService } from './alarm-level-stat.service';
import 'easy-pie-chart/dist/jquery.easypiechart.js';

@Component({
  selector: 'alarm-level-stat',
  templateUrl: './alarm-level-stat.component.html',
  styleUrls: ['./alarm-level-stat.component.scss']
})
// TODO: move easypiechart to component
export class AlarmLevelStatComponent implements OnInit {

  public alarmLevels: Array<Object>;

  constructor(private alarmLevelStatService: AlarmLevelStatService) {
    //this.alarmLevels = this._alarmLevelStatService.getData();
    this.alarmLevelStatService.getAlarmStatbyLevelData().subscribe(
      (res) => {
        this.alarmLevels = res.items;
        this.alarmLevels.forEach(item => {
          item['icon'] = 'bigLevel' + item['id'] + '.png';
        });
      }
    )
  }
  ngOnInit() { }
}
