import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {WorkflowService} from '@services/workflow/workflow.service';
import {AuthenticationService} from '@layout/services/authentication.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {List} from 'linqts';
import {SearchInfoObject, WorkflowTaskDetailOperation} from '@models/workflow/index';
import * as moment from 'moment';
import {ToastService} from '@services/common/toast.service';

interface SearchInfoList {
  processDefinitionName: string;
  id: string;
  name: string;
  startTime: string;
  status: string;
  curOperator: string;
}

@Component({
  selector: 'app-workflow-search',
  templateUrl: './workflow-search.component.html',
  styleUrls: ['./workflow-search.component.scss']
})

export class WorkflowSearchComponent implements OnInit {
  private applyer: string;
  startTimeAC: AbstractControl;
  endTimeAC: AbstractControl;
  applicantAC: AbstractControl;
  searchInfoList: List<SearchInfoList>;
  searchInfoArray: Array<SearchInfoObject>;
  searchFilterArray: Array<SearchInfoObject>;
  filterConf: Array<any>;
  form: FormGroup;
  historyProcess: any;
  settings: any;
  columnHeaders: any;
  columnHeaderKeys: string[];
  endProcess: string;
  agree: string;
  invalidStartTime: string;
  invalidEndTime: string;
  endTimeNotValid: string;

  processDefinitionId: string;

  source: LocalDataSource = new LocalDataSource();

  constructor(private workflowService: WorkflowService,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private translate: TranslateService,
              private toastService: ToastService) {
    this.form = formBuilder.group({
      'startTime': ['', Validators.compose([Validators.required])],
      'endTime': ['', Validators.compose([Validators.required])],
      'applicant': ['', Validators.compose([Validators.required])]
    });
    this.startTimeAC = this.form.controls['startTime'];
    this.endTimeAC = this.form.controls['endTime'];
    this.applicantAC = this.form.controls['applicant'];
    this.applyer = this.authenticationService.getUserName();
    // console.log('this.applyer1: ' + this.applyer);

    this.searchInfoList = new List<SearchInfoList>();
    this.searchInfoArray = new Array<SearchInfoObject>();
    this.searchFilterArray = new Array<SearchInfoObject>();

    if (localStorage.langKey) {
      const lang = localStorage.langKey;
      translate.use(lang);
    }
  }

  ngOnInit() {
    this.getURLParams();
    this.setTableColumnSettings();
    this.getTranslateMessage();
    this.getHistoryProcessByProcessDefinitionId(this.processDefinitionId);
  }

  getURLParams() {
    this.route.queryParams.subscribe(params => {
      if (params['processDefinitionId']) {
        this.processDefinitionId = params['processDefinitionId'];
      }else {
        this.processDefinitionId = params['activiti_leave:1:4'];
      }
    });
  }

  setTableColumnSettings(): void {
    this.columnHeaderKeys = ['workflow.todoList.opeation', 'workflow.common.processInstanceId', 'workflow.todoList.processDefinitionName',
      'workflow.common.applicantName', 'workflow.todoList.createTime', 'workflow.todoList.name', 'workflow.common.currentApproval'
    ];
    this.translate.get(this.columnHeaderKeys).subscribe((values) => {
      this.columnHeaders = values;
      this.loadTableColumnSettings();
    });
  }

  getTranslateMessage() {
    this.translate.get(['workflow.leave.endProcess', 'workflow.common.invalidStartTime', 'workflow.common.invalidEndTime', 'workflow.leave.endTimeNotValid']).subscribe(res => {
      this.endProcess = res['workflow.leave.endProcess'];
      this.invalidStartTime = res['workflow.common.invalidStartTime'];
      this.invalidEndTime = res['workflow.common.invalidEndTime'];
      this.endTimeNotValid = res['workflow.leave.endTimeNotValid'];
    });
  }

  loadTableColumnSettings(): void {
    this.settings = {
      mode: 'external', // inline|external|click-to-edit
      hideSubHeader: true,
      actions: {
        columnTitle: this.columnHeaders['workflow.todoList.opeation'],
        add: false,
        edit: true,
        delete: false,
        custom: [],
        position: 'left', // left|right
      },
      edit: {
        editButtonContent: '<i class="ion-information-circled"></i>',
      },
      columns: {
        processInstanceId: {
          title: this.columnHeaders['workflow.common.processInstanceId'],
          type: 'string',
          filter: false,
          sortDirection: 'desc'
        },
        processDefinitionName: {
          title: this.columnHeaders['workflow.todoList.processDefinitionName'],
          type: 'string',
          filter: false
        },
        applicantName: {
          title: this.columnHeaders['workflow.common.applicantName'],
          type: 'string',
          filter: false
        },
        startTime: {
          title: this.columnHeaders['workflow.todoList.createTime'],
          type: 'string'
        },
        status: {
          title: this.columnHeaders['workflow.todoList.name'],
          type: 'string'
        },
        curOperator: {
          title: this.columnHeaders['workflow.common.currentApproval'],
          type: 'string'
        }
      }
    };
  }

  getHistoryProcessByProcessDefinitionId(processDefinitionId): void {
    this.workflowService.getHistoryProcessByProcessDefinitionId(processDefinitionId).subscribe((res) => {
      this.searchInfoArray = [];
      const data = res.data;
      // this.searchInfoList = new List<SearchInfoList>();
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const item = new SearchInfoObject();
          item.processInstanceId = data[i]['id'];
          item.processDefinitionId = data[i]['processDefinitionId'];
          item.processDefinitionName = '';
          const startTime = data[i]['startTime'];
          item.startTime = moment(startTime).format('YYYY-MM-DD');
          item.status = '';
          item.curOperator = '';
          this.searchInfoArray.push(item);
        }
        this.getProcessesName();
        this.getHistoryProcessByProcessInstanceId();
        this.getHistoricVariableInstances();
      }
    });
  }

  getHistoryProcessByProcessInstanceId(): void {
    if (this.searchInfoArray.length > 0) {
      for (let i = 0; i < this.searchInfoArray.length; i++) {
        this.workflowService.getHistoryProcessByProcessInstanceId(this.searchInfoArray[i].processInstanceId).subscribe((res) => {
          const data = res.data;
          if (data.length > 0) {
            if (data[0].endActivityId === 'endevent1') {
              this.searchInfoArray[i].status = this.endProcess;
            } else {
              this.workflowService.getHistoryTaskByProcessInstanceId(this.searchInfoArray[i].processInstanceId).subscribe((result) => {
                const taskData = result.data;
                if (taskData.length > 0) {
                  for (let j = 0; j < taskData.length; j++) {
                    this.searchInfoArray[i].taskId = taskData[j].id;
                    if (taskData[j].id > taskData[0].id) {
                      this.searchInfoArray[i].status = taskData[j].name;
                      this.searchInfoArray[i].curOperator = taskData[j].assignee;
                    } else {
                      this.searchInfoArray[i].status = taskData[0].name;
                      this.searchInfoArray[i].curOperator = taskData[0].assignee;
                    }
                  }
                }
              });
            }
          }
        });
      }
    }
  }

  getProcessesName(): void {
    this.workflowService.getProcesses().subscribe((res) => {
      const data = res.data;
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (this.searchInfoArray.length > 0) {
            for (let j = 0; j < this.searchInfoArray.length; j++) {
              if (this.searchInfoArray[j].processDefinitionId === data[i].id) {
                this.searchInfoArray[j].processDefinitionName = data[i].name;
              }
            }
          }
        }
      }
    });
  }

  getHistoricVariableInstances(): void {
    this.workflowService.getAllHistoricVariableInstances().subscribe((res) => {
      const data = res.data;
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (this.searchInfoArray.length > 0) {
            for (let j = 0; j < this.searchInfoArray.length; j++) {
              if (this.searchInfoArray[j].processInstanceId === data[i].processInstanceId) {
                const variable = data[i].variable;
                if (variable.name === 'applyUserId') {
                  this.searchInfoArray[j].applicantName = variable.value;
                }
              }
            }
          }
        }
      }
    });
  }

  goDetail(event): void {
    const row = event.data;
    this.router.navigate(['/pages/workflow/workflowleavedocument'],
      {
        queryParams: {
          id: row.processInstanceId,
          type: WorkflowTaskDetailOperation[WorkflowTaskDetailOperation.historyDetail]
        }
      });
  }

  searchByStartTime(): void {
    this.searchFilterArray = [];
    const tmpStartTime = Date.parse(this.startTimeAC.value.year + '-' + this.startTimeAC.value.month + '-' + this.startTimeAC.value.day);
    const tmpEndTime = Date.parse(this.endTimeAC.value.year + '-' + this.endTimeAC.value.month + '-' + this.endTimeAC.value.day);
    if (tmpStartTime > tmpEndTime) {
      this.toastService.showToast('warning', this.endTimeNotValid, '');
      return;
    }
    if (!tmpStartTime && tmpEndTime) {
      this.toastService.showToast('warning', this.invalidStartTime, '');
      return;
    }
    if (tmpStartTime && !tmpEndTime) {
      this.toastService.showToast('warning', this.invalidEndTime, '');
      return;
    }

    for (let i = 0; i < this.searchInfoArray.length; i++) {
      if (this.searchInfoArray.length > 0) {
        if (tmpStartTime || tmpEndTime) {
          if (Date.parse(this.searchInfoArray[i].startTime) > tmpStartTime && Date.parse(this.searchInfoArray[i].startTime) < tmpEndTime) {
            this.searchFilterArray.push(this.searchInfoArray[i]);
          } else {
            this.searchFilterArray = [];
          }
        } else {
          this.searchFilterArray.push(this.searchInfoArray[i]);
        }
      }
    }
  }

  search(): void {
    this.applyer = '';
    this.getHistoryProcessByProcessDefinitionId(this.processDefinitionId);
    this.searchByStartTime();
    this.source.load(this.searchFilterArray);
    this.filterConf = [{field: 'applicantName', search: this.applicantAC.value}];
    this.source.setFilter(this.filterConf, false);
  }

  reset(): void {
    this.form.patchValue({startTime: ''});
    this.form.patchValue({endTime: ''});
    this.form.patchValue({applicant: ''});
  }
}
