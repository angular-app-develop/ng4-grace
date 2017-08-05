import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { WorkflowService } from '@services/workflow/workflow.service';
import { TodoTaskService } from '@services/workflow/todoTaskService';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from '@components/default-modal/default-modal.component';
import { ApprovedButtonComponent } from '../workflow-approved-button/workflow-approved-button.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import * as moment from 'moment';
import { DurationTimePipe } from './workflow-tasks.pipe';

@Component({
  selector: 'app-workflow-tasks',
  templateUrl: './workflow-tasks.component.html',
  styleUrls: ['./workflow-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    ApprovedButtonComponent,
    DurationTimePipe
  ]
})

export class WorkflowTasksComponent implements OnInit {
  private columnHeaders: string[];
  private columnHeaderKeys: string[];
  private settings: any;
  private timer;

  dayLabel: string;
  hourLabel: string;
  minuteLabel: string;
  secondLabel: string;
  modalTip: string;
  commitSuccessTip: string;
  source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router,
    private service: WorkflowService,
    private todoTaskService: TodoTaskService,
    private modalService: NgbModal,
    private translate: TranslateService,
    private durationTimePipe: DurationTimePipe
  ) {
    if (localStorage.langKey) {
      const lang = localStorage.langKey;
      translate.use(lang);
    }
    this.getTasks();
  }

  ngOnInit() {
    this.getTranslateMessage();
    this.setTableColumnSettings();
    this.timer = setInterval(() => {
      this.getTasks();
    }, 60000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getTasks(): void {
    this.todoTaskService.getTaskList().subscribe((data) => {
      if (!data)
        return;
      let taskDataSource = data;
      this.source.load(taskDataSource);
    }, (err) => {
      this.todoTaskService.showToast('warning', err._body, 'warning');
    });
  }

  private showAlertInfo(message: string) {
    const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
    activeModal.componentInstance.modalHeader = this.modalTip;
    activeModal.componentInstance.modalContent = message;
  }

  private getTranslateMessage() {
    this.translate.get(["general.common.tip", "general.common.commitSuccess",
      "workflow.todoList.day", "workflow.todoList.hour", "workflow.todoList.minute", "workflow.todoList.second"])
      .subscribe(res => {
        this.modalTip = res["general.common.tip"];
        this.commitSuccessTip = res["general.common.commitSuccess"];
        this.dayLabel = res["workflow.todoList.day"];
        this.hourLabel = res["workflow.todoList.hour"];
        this.minuteLabel = res["workflow.todoList.minute"];
        this.secondLabel = res["workflow.todoList.second"];
      });
  }

  private setTableColumnSettings(): void {
    this.columnHeaders = ['', '', '', '', '', ''];
    this.columnHeaderKeys = ["workflow.todoList.processDefinitionName", "workflow.todoList.name", "workflow.todoList.applyer",
      "workflow.todoList.createTime", "workflow.todoList.duringTime", "workflow.todoList.opeation"
    ];
    this.translate.get(this.columnHeaderKeys).subscribe((values: string[]) => {
      let i = 0;
      for (var s in values) {
        this.columnHeaders[i] = values[s];
        i++;
      }
      this.loadTableColumnSettings();
    });
  }

  private loadTableColumnSettings(): void {
    this.settings = {
      actions: false,
      hideSubHeader: true,
      columns: {
        processDefinitionName: {
          title: this.columnHeaders[0],
          type: 'string',
          filter: false
        },
        name: {
          title: this.columnHeaders[1],
          type: 'string'
        },
        applyer: {
          title: this.columnHeaders[2],
          type: 'string',
          filter: false
        },
        createTime: {
          title: this.columnHeaders[3],
          type: 'string'
        },
        duringTime: {
          title: this.columnHeaders[4],
          type: 'html',
          valuePrepareFunction: (cell, row) =>
            this.durationTimePipe.transform(row.createTime, this.dayLabel, this.hourLabel, this.minuteLabel, this.secondLabel)
        },
        operation: {
          title: this.columnHeaders[5],
          type: 'custom',
          renderComponent: ApprovedButtonComponent,
          valuePrepareFunction: (cell, row) => row
        }
      }
    };
  }
}

