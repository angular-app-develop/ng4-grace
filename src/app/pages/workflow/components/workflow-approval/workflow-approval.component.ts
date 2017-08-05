import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '@layout/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { DefaultModal } from '@components/default-modal/default-modal.component';
import { Variable, TaskResolveRequest } from '@models/workflow/index';
import { WorkflowService } from '@services/workflow/workflow.service';
import { TodoTaskService } from '@services/workflow/todoTaskService';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-workflow-approval',
  templateUrl: './workflow-approval.component.html',
  styleUrls: ['./workflow-approval.component.scss']
})
export class WorkflowApprovalComponent implements OnInit {
  @Input() taskId: number;
  @Input() processInstanceId: number;
  @Input() taskDefinitionKey: string;
  @Input() owner: string;
  @Input() approvalName: string;
  @Input() controlDisabled: boolean;

  disabled: boolean = false;
  form: FormGroup;
  remarkAC: AbstractControl;
  approvedOption: number = 1;
  remark: string;
  approver: string;
  approvedTime: Date;
  modalTip: string;
  commitSuccessTip: string;
  userInvalidTip: string;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private workflowService: WorkflowService,
    private todoTaskService: TodoTaskService,
    private translate: TranslateService) {
    this.form = formBuilder.group({
      'remarkAC': ['', Validators.compose([Validators.maxLength(128)])]
    });
    this.remarkAC = this.form.controls['remarkAC'];
  }

  ngOnInit() {
    this.getTranslateMessage();
    if (this.controlDisabled) {
      this.disabled = true;
      if (this.taskId) {
        this.getTaskVariableAndComment();
      }
    }
  }

  getTaskVariableAndComment() {
    let getHistroyProcessVaraible = this.workflowService.getHistoricVariableInstances(this.processInstanceId);
    let getHistoricComment = this.workflowService.getHistoricComment(this.processInstanceId);
    let getHistoricTask = this.workflowService.getHistoricTaskInstancesByTaskDefinitionKey(this.processInstanceId, this.taskDefinitionKey);

    Observable.forkJoin([getHistroyProcessVaraible, getHistoricComment, getHistoricTask])
      .subscribe(results => {
        this.assemblingData(results[0], results[1], results[2]);
      }, (err) => {
        this.todoTaskService.showToast('warning', err._body, 'warning');
      });
  }

  completeTask() {
    if (!this.form.valid) {
      return;
    }
    if (!this.authenticationService.getUserName()) {
      this.showAlertInfo(this.userInvalidTip);
      return;
    }
    let variables = [];
    variables.push(new Variable(this.approvalName, (this.approvedOption === 1) ? true : false));
    variables.push(new Variable(this.taskDefinitionKey + "approver", this.authenticationService.getUserName()));
    variables.push(new Variable(this.taskDefinitionKey + "approvedTime", new Date()));
    if (this.owner) {
      this.taskResolveComplete(variables);
    }
    else {
      this.taskComplete(variables);
    }
  }

  private taskResolveComplete(variables) {
    let taskResolveRequest = new TaskResolveRequest("resolve");
    this.workflowService.taskComment(this.taskId, this.remarkAC.value)
      .map((data) => { })
      .mergeMap(res => {
        return this.workflowService.taskResolve(this.taskId, taskResolveRequest);
      })
      .mergeMap(res => {
        return this.workflowService.taskComplete(this.taskId, variables);
      }).subscribe((data) => {
        this.showAlertInfo(this.commitSuccessTip);
        this.router.navigate(['/pages/workflow/workflowdesktop'], { queryParams: { type: 'ok' } });
      }, (err) => {
        this.showAlertInfo(err._body);
      });
  }

  private taskComplete(variables) {
    this.workflowService.taskComment(this.taskId, this.remarkAC.value)
      .map((data) => { })
      .mergeMap(res => {
        return this.workflowService.taskComplete(this.taskId, variables);
      }).subscribe((data) => {
        this.showAlertInfo(this.commitSuccessTip);
        this.router.navigate(['/pages/workflow/workflowdesktop'], { queryParams: { type: 'ok' } });
      }, (err) => {
        this.showAlertInfo(err._body);
      });
  }

  private assemblingData(getTaskVaraibleResponse: any, getHistoricCommentResponse: any, getHistoricTaskResponse: any) {
    if (!getTaskVaraibleResponse)
      return;
    if (!getHistoricCommentResponse || getHistoricCommentResponse.length == 0)
      return;
    if (!getHistoricTaskResponse || getHistoricTaskResponse.data.length == 0)
      return;
    if (getTaskVaraibleResponse.data.length == 0)
      return;

    for (var i = 0; i < getTaskVaraibleResponse.data.length; i++) {
      if (getTaskVaraibleResponse.data[i].variable.name === this.approvalName) {
        this.approvedOption = getTaskVaraibleResponse.data[i].variable.value === true ? 1 : 0;
      }
      if (getTaskVaraibleResponse.data[i].variable.name === this.taskDefinitionKey + "approver") {
        this.approver = getTaskVaraibleResponse.data[i].variable.value;
      }
      if (getTaskVaraibleResponse.data[i].variable.name === this.taskDefinitionKey + "approvedTime") {
        this.approvedTime = getTaskVaraibleResponse.data[i].variable.value;
      }
    }
    let definitionTasks = getHistoricTaskResponse.data.filter(oc => oc.endTime != null);
    definitionTasks.sort(this.sortedArray);
    let tmpcomment = getHistoricCommentResponse.find(oc => oc.taskId == definitionTasks[0].id);
    if (!tmpcomment)
      return;
    this.remark = tmpcomment.message;
  }

  private sortedArray(a, b) {
    var dateA = new Date(a.startTime).getTime();
    var dateB = new Date(b.startTime).getTime();
    return dateA < dateB ? 1 : -1;
  }

  private getTranslateMessage() {
    this.translate.get(["general.common.tip", "general.common.commitSuccess", "general.login.userInvalid"]).subscribe(res => {
      this.modalTip = res["general.common.tip"];
      this.commitSuccessTip = res["general.common.commitSuccess"];
      this.userInvalidTip = res["general.login.userInvalid"];
    });
  }

  private showAlertInfo(message: string) {
    const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
    activeModal.componentInstance.modalHeader = this.modalTip;
    activeModal.componentInstance.modalContent = message;
  }
}
