import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {GlobalState} from '@app/global.state';
import {WorkflowService} from '@services/workflow/workflow.service';
import {ApprovedRecord} from '@models/workflow/index';

@Component({
  selector: 'app-approved-record',
  templateUrl: './workflow-approved-record.component.html',
  styleUrls: ['./workflow-approved-record.component.scss']
})

export class WorkflowApprovedRecordComponent implements OnInit {
  agree: string;
  disagree: string;
  approvedRecordArray: Array<ApprovedRecord>;

  @Input() processInstanceId: number;

  constructor(private _state: GlobalState,
              private translate: TranslateService,
              private workflowService: WorkflowService) {
    this.approvedRecordArray = new Array<ApprovedRecord>();
    if (localStorage.langKey) {
      const lang = localStorage.langKey;
      translate.use(lang);
    }
  }

  ngOnInit() {
    this.getTranslateMessage();
    this.getApprovedRecord(this.processInstanceId);
  }

  getApprovedRecord(processInstanceId): void {
    this.getHistoricTaskInstances(processInstanceId);
  }

  getHistoricTaskInstances(processInstanceId): void {
    this.workflowService.getHistoricTaskInstances(processInstanceId).subscribe((res) => {
      const data = res.data;
      // console.log('data: ' + JSON.stringify(data));
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const item = new ApprovedRecord();
          const { id, assignee, endTime, taskDefinitionKey, name } = data[i];
          item.taskId = id;
          // item.claimName = assignee;
          item.claimTime = endTime;
          item.taskDefinitionKey = taskDefinitionKey;
          item.curPoint = name;
          if (item.claimTime) {
            this.approvedRecordArray.push(item);
          }
        }
      }
      this.getHistoricVariableInstances(this.processInstanceId);
      this.getHistoricComment(this.processInstanceId);
    });
  }

  getHistoricVariableInstances(processInstanceId): void {
    this.workflowService.getHistoricVariableInstances(processInstanceId).subscribe((res) => {
      const data = res.data;
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (this.approvedRecordArray.length > 0) {
            for (let j = 0; j < this.approvedRecordArray.length; j++) {
              if (data[i].variable.name === 'approver' || data[i].variable.name === 'managementAuditapprover') {
                this.approvedRecordArray[j].claimName = data[i].variable.value;
              }
              if (this.approvedRecordArray[j].taskDefinitionKey === 'hrAudit' && data[i].variable.name === 'hrApproved') {
                if (data[i].variable.value === true)
                  this.approvedRecordArray[j].result = this.agree;
                else
                  this.approvedRecordArray[j].result = this.disagree;
              }
              if (this.approvedRecordArray[j].taskDefinitionKey === 'managementAudit' && data[i].variable.name === 'managementApproved') {
                if (data[i].variable.value === true)
                  this.approvedRecordArray[j].result = this.agree;
                else
                  this.approvedRecordArray[j].result = this.disagree;
              }
            }
          }
        }
      }
    });
  }

  getHistoricComment(processInstanceId): void {
    this.workflowService.getHistoricComment(processInstanceId).subscribe((data) => {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (this.approvedRecordArray.length > 0) {
            for (let j = 0; j < this.approvedRecordArray.length; j++) {
              if (this.approvedRecordArray[j].taskId === data[i].taskId) {
                this.approvedRecordArray[j].remark = data[i].message;
              }
            }
          }
        }
      }
    });
  }

  getTranslateMessage() {
    this.translate.get(['workflow.common.agree', 'workflow.common.disagree']).subscribe(res => {
      this.agree = res['workflow.common.agree'];
      this.disagree = res['workflow.common.disagree'];
    });
  }
}
