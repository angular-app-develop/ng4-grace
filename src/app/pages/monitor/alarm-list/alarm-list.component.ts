import { Component, OnInit } from '@angular/core';
import { AlarmListService } from './alarm-list.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { AlarmSeverityImgRenderComponent } from '@components/alarm-severity-img-render-componet';

@Component({
  selector: 'app-alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.scss']
})
export class AlarmListComponent implements OnInit {
  columnHeaders: any;
  ngOnInit() {
    this.setTableColumnSettings();
  }

  query: string = '';
  settings: any;

  columnHeaderKeys: string[];

  source: LocalDataSource = new LocalDataSource();


  constructor(protected service: AlarmListService, public translate: TranslateService) {


    this.service.getAlarmListData().subscribe((data) => {
      this.source.load(data);

    });
  }

  setTableColumnSettings(): void {
    this.columnHeaderKeys = ["general.alarm.coreEventName", "general.alarm.severityName", "general.alarm.coreSourceName",
      "general.alarm.corePointName", "general.alarm.occureRemark", "general.alarm.birthTime", "general.alarm.clearTime",
      "general.alarm.clearedByName", "general.alarm.confirmTime", "general.alarm.confirmerName"
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
      columns: {
        severityId: {
          title: this.columnHeaders["general.alarm.severityName"],
          type: 'custom',
          renderComponent: AlarmSeverityImgRenderComponent
        },
        coreEventName: {
          title: this.columnHeaders["general.alarm.coreEventName"],
          type: 'string'
        },
        // severityName: {
        //   title: this.columnHeaders["general.alarm.severityName"],
        //   type: 'string'
        // },
        coreSourceName: {
          title: this.columnHeaders["general.alarm.coreSourceName"],
          type: 'string'
        },
        corePointName: {
          title: this.columnHeaders["general.alarm.corePointName"],
          type: 'string'
        },
        occureRemark: {
          title: this.columnHeaders["general.alarm.occureRemark"],
          type: 'string'
        },
        birthTime: {
          title: this.columnHeaders["general.alarm.birthTime"],
          type: 'string'
        },
        clearTime: {
          title: this.columnHeaders["general.alarm.clearTime"],
          type: 'string'
        },
        clearedByName: {
          title: this.columnHeaders["general.alarm.clearedByName"],
          type: 'string'
        },
        confirmTime: {
          title: this.columnHeaders["general.alarm.confirmTime"],
          type: "string"
        },
        confirmerName: {
          title: this.columnHeaders["general.alarm.confirmerName"],
          type: "string"
        }
      }
    };
  }

  ngOnDestroy() {

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
