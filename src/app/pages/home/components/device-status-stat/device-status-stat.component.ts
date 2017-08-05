import { Component, OnInit } from '@angular/core';
import { DeviceStatusStatService } from './device-status-stat.service';

@Component({
  selector: 'device-status-stat',
  templateUrl: './device-status-stat.component.html',
  styleUrls: ['./device-status-stat.component.scss']
})
export class DeviceStatusStatComponent implements OnInit {

  public deviceStatus: Array<Object>;
  constructor(private deviceStatusStatService: DeviceStatusStatService) {
    this.deviceStatus = deviceStatusStatService.getData();
    this.deviceStatusStatService.getDeviceStatusStaticData().subscribe(
      (res) => {
        this.deviceStatus = res;
        this.deviceStatus.forEach(item => {
          if (item['status'] === 0) {
            item['statusName'] = '在线';
          } else if (item['status'] === 1) {
            item['statusName'] = '离线';
          }
        });
      }
    );
  }

  ngOnInit() { }

}
