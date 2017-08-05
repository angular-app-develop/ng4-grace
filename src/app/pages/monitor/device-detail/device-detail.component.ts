import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DeviceDetailService } from './device-detail.service';
import { AlarmSeverityImgRenderComponent } from '@components/alarm-severity-img-render-componet';
import { PointStatusItemComponent } from './point-custom-item/point-status-item-componet';
import { PointOperationItemComponent } from './point-custom-item/point-operation-item-componet';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit {
  deviceposition = 'dsf';
  deviceId: string;
  deviceName: String;
  devicePath: string;
  device: any;
  status: string;
  maskStatus: string;
  settings: any;
  points: Array<object>;

  columnHeaderKeys: string[];
  columnHeaders: {};

  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router, private route: ActivatedRoute,
    private translate: TranslateService, private deviceDetailService: DeviceDetailService) {
    //this.source.load(this._DeviceDetailService.getData());
  }

  ngOnInit() {
    this.setTableColumnSettings();
    this.getURLParams();
  }
  getURLParams() {
    this.route.queryParams.subscribe(params => {
      this.deviceId = params['deviceId'];
      this.devicePath = params['path'];
      this.deviceName = params['name'];
      this.getPageData();
    });
  }

  getPageData() {
    if (!this.deviceId) {
      return;
    }
    this.deviceDetailService.getDeviceData(this.deviceId).subscribe(
      (res) => {
        this.device = res;
        if (this.device.status === 0) {
          this.status = '在线';
        } else {
          this.status = '离线';
        }
        if (this.device.mask) {
          this.maskStatus = '/assets/img/on.png';
        } else {
          this.maskStatus = '/assets/img/off.png';
        }
      }
    );
    this.deviceDetailService.getDeviceLivePoint(this.deviceId).subscribe(
      (res) => {
        this.points = res;
        this.points.forEach(item => {
          item['img'] = '1';
        });
        this.source.load(this.points);
      }
    );
  }

  maskClick(): void {
    if (!this.device) {
      return;
    }
    if (this.device.mask) {
      this.maskStatus = '/assets/img/off.png';
    } else {
      this.maskStatus = '/assets/img/on.png';
    }
  }

  setDeviceMask(): void {
    this.deviceDetailService.setDeviceMask(this.deviceId).subscribe(
      (res) => {
        if (res === 0) {

        }
      }
    );
  }
  setTableColumnSettings(): void {
    this.columnHeaderKeys = ['等级', '名称', '类型',
      '测点值', '设置值', '状态', '操作'
    ];
    this.translate.get(this.columnHeaderKeys).subscribe((values) => {
      this.columnHeaders = values;
      this.loadTableColumnSettings();
    });
  }
  loadTableColumnSettings(): void {
    this.settings = {
      actions: false,
      add: {
        addButtonContent: '<i class="ion-ios-plus-outline"></i>',
        createButtonContent: '<i class="ion-checkmark"></i>',
        cancelButtonContent: '<i class="ion-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="ion-edit"></i>',
        saveButtonContent: '<i class="ion-checkmark"></i>',
        cancelButtonContent: '<i class="ion-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="ion-trash-a"></i>',
        confirmDelete: true
      },
      pager: {
        display: true,
        perPage: 9
      },
      columns: {
        img: {
          title: this.columnHeaders['等级'],
          type: 'custom',
          renderComponent: AlarmSeverityImgRenderComponent
        },
        corePointName: {
          title: this.columnHeaders['名称'],
          type: 'string'
        },
        type: {
          title: this.columnHeaders['类型'],
          type: 'string'
        },
        collectValue: {
          title: this.columnHeaders['测点值'],
          type: 'string'
        },
        setvalue: {
          title: this.columnHeaders['设置值'],
          type: 'string'
        },
        state: {
          title: this.columnHeaders['状态'],
          type: 'custom',
          renderComponent: PointStatusItemComponent
        },
        operate: {
          title: this.columnHeaders['操作'],
          type: 'custom',
          renderComponent: PointOperationItemComponent
        }
      }
    };
  }
}
