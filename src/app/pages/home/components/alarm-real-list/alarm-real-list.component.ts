import { Component, OnInit } from '@angular/core';
import { AlarmRealListService } from './alarm-real-list.service';

@Component({
  selector: 'alarm-real-list',
  templateUrl: './alarm-real-list.component.html',
  styleUrls: ['./alarm-real-list.component.scss']
})
export class AlarmRealListComponent implements OnInit {
  public alarmReals: Array<object>;
  constructor(private alarmRealListService: AlarmRealListService) {
    //this.alarmReals=this.alarmRealListService.getData();
    this.alarmRealListService.getRealListData().subscribe(
      (res) => {
        this.alarmReals = res;
        this.alarmReals.forEach(element => {
          element['img'] = 'level' + element['severityId'] + '.png';
          element['name'] = element['coreSourceName'] + element['corePointName'];
          if (element['occurRemark']) {
            element['name'] += element['occurRemark'];
          }
        });
      }
    );
  }

  ngOnInit() { }

}
