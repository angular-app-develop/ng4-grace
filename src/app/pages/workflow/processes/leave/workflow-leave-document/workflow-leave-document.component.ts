import { Component, Input, Output, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbModule, NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '@layout/services/authentication.service';
import { WorkflowService } from '@services/workflow/workflow.service';
import { TodoTaskService } from '@services/workflow/todoTaskService';
import { TranslateService } from '@ngx-translate/core';
import { DefaultModal } from '@components/default-modal/default-modal.component';
import { TaskObject, UserTaskOperation, UserTaskApproved, WorkflowTaskDetailOperation, TaskActionRequest, Variable } from '@models/workflow/index';
import * as moment from 'moment';

@Component({
  selector: 'app-workflow-task-detail',
  templateUrl: './workflow-leave-document.component.html',
  styleUrls: ['./workflow-leave-document.component.scss']
})

export class WorkflowLeaveDocumentComponent implements OnInit {
  taskObject:TaskObject;
  private pageTitle: string;
  public parentPage: string = "";
  public id: number;
  public taskId: number;
  public taskName: string;
  public processInstanceId: number;
  public owner: string;
  public taskDefinitionKey: string;
  public createTime: string;
  public leaveType: string;
  public startTime: string;
  public endTime: string;
  public reason: string;
  public applyUserId: string;
  public assignee: string;

  private managementApproved = UserTaskApproved[UserTaskApproved.managementApproved];
  private hrApproved = UserTaskApproved[UserTaskApproved.hrApproved];
  private managementAudit = UserTaskOperation[UserTaskOperation.managementAudit];
  private hrAudit = UserTaskOperation[UserTaskOperation.hrAudit];

  private operationDisabled: boolean = false;
  private leaveDisabled: boolean = true;
  private managementDisabled: boolean = false;
  private hrDisabled: boolean = false;
  activeIds: string = "wf_info,";

  wf_operationActive: boolean = true;
  wf_infoActive: boolean = true;
  wf_formActive: boolean = true;
  wf_managementApprovedActive: boolean = false;
  wf_hrApprovedActive: boolean = false;
  wf_recordActive: boolean = false;

  selectedLeaveType: number;
  leaveTypes: any[];
  leaveStartTime: any;
  modalTip: string;
  commitSuccessTip: string;
  startProcessName: string;
  endProcessName: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: WorkflowService,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private todoTaskService: TodoTaskService,
    private translate: TranslateService) {
    if (localStorage.langKey) {
      const lang = localStorage.langKey;
      translate.use(lang);
    }
    this.getTranslateMessage();
  }

  ngOnInit() {
    // this.route.data.subscribe((data:{taskObject:TaskObject}) => {
    //   this.taskObject = data.taskObject;
    // });
    this.getURLParams();
  }

  getURLParams() {
    this.route.queryParams.subscribe(params => {
      this.parentPage = params["type"];
      this.id = params['id'];
      this.getPageData();
      this.getTranslateMessage();
    });
  }

  getPageData() {
    switch (this.parentPage) {
      case WorkflowTaskDetailOperation[WorkflowTaskDetailOperation.startevent1]:
        this.InitStartEventPageControls();
        break;
      case WorkflowTaskDetailOperation[WorkflowTaskDetailOperation.historyDetail]:
        if (this.id) {
          this.InitHistoryProcessPageControls();
        }
        break;
      case WorkflowTaskDetailOperation[WorkflowTaskDetailOperation.todoTaskDetail]:
        if (this.id) {
          this.InitTodoTaskPageControls();
        }
        break;
      default:
        break;
    }
  }

  private InitStartEventPageControls() {
    this.assignee = this.authenticationService.getUserName();
    this.applyUserId = this.authenticationService.getUserName();
    this.createTime = moment(new Date().toString()).format('YYYY-MM-DD HH:mm:ss');
    this.taskName = this.startProcessName;
    let ngbTab = "wf_form";
    this.setControlsDisabled(ngbTab, false, true, true, true);
  }

  private InitTodoTaskPageControls() {
    this.taskId = this.id;
    this.todoTaskService.getTaskById(this.taskId).subscribe(data => {
      this.setPageControlsValue(data);
      this.setTodoTaskControlsActiveAndDisable();
    }, (err) => {
      this.todoTaskService.showToast('warning', err._body, 'warning');
    });
  }

  private InitHistoryProcessPageControls() {
    this.processInstanceId = this.id;
    this.todoTaskService.getHistoryProcessById(this.processInstanceId).subscribe((data) => {
      if (!data)
        return;
      this.setHistoryControlsValue(data);
      let ngbTab = "wf_operation,wf_form";// = "wf_form,wf_approval1,wf_approva2,wf_record";
      this.setControlsDisabled(ngbTab, true, true, true, true);
    }, (err) => {
      this.todoTaskService.showToast('warning', err._body, 'warning');
    });
  }

  private setHistoryControlsValue(data) {
    if (!data)
      return;
    this.owner = data.owner;
    this.taskDefinitionKey = data.taskDefinitionKey;
    this.taskId = data.id;
    this.taskName = data.name;
    this.assignee = data.assignee;
    this.createTime = moment(new Date(data.createTime).toString()).format('YYYY-MM-DD HH:mm:ss');
    if (!data.variables || data.variables.length == 0)
      return;
    let endActivity = data.variables.find(oc => oc.name === "endActivityId");
    if (endActivity && endActivity.value != null) {
      this.taskName = this.endProcessName;
    }
    let processStartTime = data.variables.find(oc => oc.name === "processStartTime");
    if (processStartTime) {
      this.createTime = moment(new Date(processStartTime.value).toString()).format('YYYY-MM-DD HH:mm:ss');
    }
    this.leaveType = data.variables.find(oc => oc.name === "leaveType") != null ? data.variables.find(oc => oc.name == "leaveType").value : null;
    this.startTime = data.variables.find(oc => oc.name === "startTime") != null ? data.variables.find(oc => oc.name == "startTime").value : null;
    this.endTime = data.variables.find(oc => oc.name === "endTime").value;
    this.reason = data.variables.find(oc => oc.name === "reason").value;
    this.applyUserId = data.variables.find(oc => oc.name === "applyUserId").value;
  }

  private setPageControlsValue(data) {
    if (!data)
      return;
    this.taskName = data.name;
    this.processInstanceId = Number.parseInt(data.processInstanceId);
    this.owner = data.owner;
    this.taskDefinitionKey = data.taskDefinitionKey;
    this.createTime = data.createTime;
    this.assignee = data.assignee;
    if (!data.variables || data.variables.length == 0)
      return;
    this.leaveType = data.variables.find(oc => oc.name == "leaveType") != null ? data.variables.find(oc => oc.name == "leaveType").value : null;
    this.startTime = data.variables.find(oc => oc.name == "startTime") != null ? data.variables.find(oc => oc.name == "startTime").value : null;
    this.endTime = data.variables.find(oc => oc.name == "endTime").value;
    this.reason = data.variables.find(oc => oc.name == "reason").value;
    this.applyUserId = data.variables.find(oc => oc.name == "applyUserId").value;
  }

  private setTodoTaskControlsActiveAndDisable() {
    let ngbTab = "";
    switch (this.taskDefinitionKey) {
      case UserTaskOperation[UserTaskOperation.managementAudit]:
        ngbTab = "wf_operation,wf_operation,wf_approval1";
        this.setControlsDisabled(ngbTab, true, false, true, false);
        break;
      case UserTaskOperation[UserTaskOperation.hrAudit]:
        ngbTab = "wf_operation,wf_operation,wf_approval2";
        this.setControlsDisabled(ngbTab, true, true, false, false);
        break;
      case UserTaskOperation[UserTaskOperation.modifyApply]:
        ngbTab = "wf_form";
        this.setControlsDisabled(ngbTab, false, true, true, true);
        break;
      default:
        break;
    }
  }

  private setControlsDisabled(activeIds, leaveDisabled, managementDisabled, hrDisabled, operationDisabled) {
    this.activeIds += activeIds;
    this.leaveDisabled = leaveDisabled;
    this.managementDisabled = managementDisabled;
    this.hrDisabled = hrDisabled;
    this.operationDisabled = operationDisabled;
  }

  public beforePanelChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'wf_operation') {
      this.wf_operationActive = $event.nextState;
    }
    if ($event.panelId === 'wf_info') {
      this.wf_infoActive = $event.nextState;
    }
    if ($event.panelId === 'wf_form') {
      this.wf_formActive = $event.nextState;
    }
    if ($event.panelId === 'wf_managementApproved') {
      this.wf_managementApprovedActive = $event.nextState;
    }
    if ($event.panelId === 'wf_hrApproved') {
      this.wf_hrApprovedActive = $event.nextState;
    }
    if ($event.panelId === 'wf_record') {
      this.wf_recordActive = $event.nextState;
    }
  }

  private getTranslateMessage() {
    this.translate.get(["general.common.tip", "general.common.commitSuccess", "workflow.leave.fillInRequest",
      "workflow.todoDetail.title", "workflow.historyProcess.title", "workflow.leave.endProcess"]).subscribe(res => {
        this.modalTip = res["general.common.tip"];
        this.commitSuccessTip = res["general.common.commitSuccess"];
        this.startProcessName = res["workflow.leave.fillInRequest"];
        this.endProcessName = res["workflow.leave.endProcess"];
        switch (this.parentPage) {
          case WorkflowTaskDetailOperation[WorkflowTaskDetailOperation.historyDetail]:
            this.pageTitle = res["workflow.historyProcess.title"];
            break;
          case WorkflowTaskDetailOperation[WorkflowTaskDetailOperation.startevent1]:
            this.pageTitle = res["workflow.leave.fillInRequest"];
            break;
          default:
            this.pageTitle = res["workflow.todoDetail.title"];
            break;
        }
      });
  }
}
