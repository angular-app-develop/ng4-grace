import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkflowService } from '@services/workflow/workflow.service';
import { TranslateService } from '@ngx-translate/core';
import { Variable, ProcessInstanceRequest, Attachment, UserTaskApproved } from '@models/workflow/index';
import { AuthenticationService } from '@layout/services/authentication.service';
import { DefaultModal } from '@components/default-modal/default-modal.component';

@Component({
  selector: 'app-workflow-leave-request',
  templateUrl: './workflow-leave-request.component.html',
  styleUrls: ['./workflow-leave-request.component.scss']
})
export class WorkflowLeaveRequestComponent implements OnInit {
  @Input() taskId: number;
  @Input() leaveType: string;
  @Input() startTime: string;
  @Input() endTime: string;
  @Input() reason: string;
  @Input() owner: string;
  @Input() processInstanceId: number;
  @Input() controlDisabled: boolean;

  form: FormGroup;
  leaveTypeAC: AbstractControl;
  startTimeAC: AbstractControl;
  endTimeAC: AbstractControl;
  reasonAC: AbstractControl;
  disabled: boolean = false;
  rejectDisabled: boolean = true;

  modalTip: string;
  commitSuccessTip: string;
  endTimeNotValidTip: string;
  userInvalidTip: string;

  selectedLeaveType: number;
  leaveTypes: any[];
  leaveStartTime: any;
  leaveEndTime: any;
  leaveReason: string;

  currentSelectedFile: File;
  processAttachments: string[] = [];
  maxFileSize: number = 1024 * 1024;
  attachmentSizeNotAllowedTip: string;
  onlyOneAttachmentTip: string;
  @ViewChild('attachmentInput') attachmentInput: any;

  constructor(private router: Router,
    private service: WorkflowService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private translate: TranslateService) {
    this.form = formBuilder.group({
      leaveType: [null, Validators.compose([Validators.required])],
      startTime: ['', Validators.compose([Validators.required])],
      endTime: ['', Validators.compose([Validators.required])],
      reason: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(128)])]
    });
    this.leaveTypeAC = this.form.controls['leaveType'];
    this.startTimeAC = this.form.controls['startTime'];
    this.endTimeAC = this.form.controls['endTime'];
    this.reasonAC = this.form.controls['reason'];
    if (localStorage.langKey) {
      const lang = localStorage.langKey;
      translate.use(lang);
    }
  }

  ngOnInit() {
    this.getTranslateMessage();
    this.setControlsDisable();
    this.getLeaveDatas();
  }

  private getLeaveDatas() {
    if (!this.processInstanceId)
      return;
    this.service.getProcessInstanceVariables(this.processInstanceId).subscribe(res => {
      for (var i = 0; i < res.length; i++) {
        if (res[i].type === "binary") {
          this.processAttachments.push(res[i].name);
        }
      }
    });
  }

  private setControlsDisable(): boolean {
    if (!this.taskId)
      return false;
    if (this.controlDisabled) {
      this.disabled = true;
      this.rejectDisabled = true;
      this.leaveTypeAC.disable();
      this.startTimeAC.disable();
      this.endTimeAC.disable();
    } else {
      this.disabled = false;
      this.leaveTypeAC.enable();
      this.startTimeAC.enable();
      this.endTimeAC.enable();
      if (this.taskId) {
        this.rejectDisabled = false;
      }
    }
    return true;
  }

  private updateUI() {
    if (!this.taskId || this.taskId <= 0) {
      return;
    }
    let selectorLeaveType = this.leaveTypes.find(oc => oc.leaveTypeName === this.leaveType);
    if (selectorLeaveType) {
      this.selectedLeaveType = selectorLeaveType.id;
    }
    let tmpStartTime = new Date(this.startTime);
    let tmpEndTime = new Date(this.endTime);
    this.leaveStartTime = { year: tmpStartTime.getFullYear(), month: tmpStartTime.getMonth() + 1, day: tmpStartTime.getDate() };
    this.leaveEndTime = { year: tmpEndTime.getFullYear(), month: tmpEndTime.getMonth() + 1, day: tmpEndTime.getDate() };
    this.leaveReason = this.reason;
  }

  startLeave() {
    if (!this.validateParams())
      return;

    let item = new ProcessInstanceRequest();
    this.setProcessVariable(item);

    //only one attachment is allowed
    if (this.currentSelectedFile && this.processAttachments.length > 0) {
      this.showAlertInfo(this.onlyOneAttachmentTip);
      return;
    }
    //validate attachment size
    if (this.currentSelectedFile && this.currentSelectedFile.size >= this.maxFileSize) {
      this.showAlertInfo(this.attachmentSizeNotAllowedTip);
      return;
    }
    if (this.taskId) {
      //for attachment upload
      if (this.currentSelectedFile && this.processInstanceId) {
        this.upload(this.processInstanceId);
      }
      item.variables.push(new Variable(UserTaskApproved[UserTaskApproved.modifyApproved], "true"));
      this.completeTask(item.variables);
    }
    else {
      this.startWorkflow(item);
    }
  }

  rejectLeave() {
    if (!this.validateParams())
      return;

    let item = new ProcessInstanceRequest();
    this.setProcessVariable(item);
    if (this.taskId) {
      item.variables.push(new Variable(UserTaskApproved[UserTaskApproved.modifyApproved], "false"));
      this.completeTask(item.variables);
    }
  }


  private validateParams(): boolean {
    if (!this.form.valid) {
      return false;
    }
    if (this.disabled) {
      return false;
    }
    if (!this.validationLeaveTime())
      return false;

    if (!this.authenticationService.getUserName()) {
      this.showAlertInfo(this.userInvalidTip);
      return false;
    }

    return true;
  }

  private validationLeaveTime(): boolean {
    let tmpStartTime = this.startTimeAC.value.year + "-" + this.startTimeAC.value.month + "-" + this.startTimeAC.value.day;
    let tmpEndTime = this.endTimeAC.value.year + "-" + this.endTimeAC.value.month + "-" + this.endTimeAC.value.day;
    if (Date.parse(tmpStartTime) > Date.parse(tmpEndTime)) {
      this.showAlertInfo(this.endTimeNotValidTip);
      return false;
    }
    return true;
  }

  private setProcessVariable(item) {
    item.processDefinitionKey = "activiti_leave";
    item.returnVariables = false;
    item.variables = [];
    item.variables.push(new Variable("leaveType", this.leaveTypes[this.selectedLeaveType].leaveTypeName));
    item.variables.push(new Variable("startTime", this.startTimeAC.value.year + "-" + this.startTimeAC.value.month + "-" + this.startTimeAC.value.day));
    item.variables.push(new Variable("endTime", this.endTimeAC.value.year + "-" + this.endTimeAC.value.month + "-" + this.endTimeAC.value.day));
    item.variables.push(new Variable("reason", this.reasonAC.value));
    item.variables.push(new Variable("applyUserId", this.authenticationService.getUserName()));
    return item;
  }

  private startWorkflow(item) {
    this.service.startWorkflow(item).subscribe((data) => {
      //for file upload
      if (this.currentSelectedFile && data.json().id) {
        this.upload(data.json().id);
      }
      this.showAlertInfo(this.commitSuccessTip);
      this.router.navigate(['/pages/workflow/workflowdesktop'], { queryParams: { type: 'ok' } });
    }, (err) => {
      this.showAlertInfo(err._body);
    });
  }

  private completeTask(item) {
    this.service.taskComplete(this.taskId, item).subscribe((data) => {
      this.showAlertInfo(this.commitSuccessTip);
      this.router.navigate(['/pages/workflow/workflowdesktop'], { queryParams: { type: 'ok' } });
    }, (err) => {
      this.showAlertInfo(err._body);
    });
  }

  private showAlertInfo(message: string) {
    const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
    activeModal.componentInstance.modalHeader = this.modalTip;
    activeModal.componentInstance.modalContent = message;
  }

  private getTranslateMessage() {
    this.leaveTypes = [];
    this.translate.get(["general.login.userInvalid", "workflow.leave.endTimeNotValid", "general.common.tip",
      "general.common.commitSuccess", "workflow.leave.generalHoliday",
      "workflow.leave.sickLeave", "workflow.leave.leaveInLieu",
      "workflow.leave.casualLeave", "workflow.leave.marriageLeave",
      "workflow.common.attachmentSizeNotAllowed", "workflow.common.onlyOneAttachment"]).subscribe(res => {
        this.userInvalidTip = res["general.login.userInvalid"];
        this.endTimeNotValidTip = res["workflow.leave.endTimeNotValid"];
        this.modalTip = res["general.common.tip"];
        this.commitSuccessTip = res["general.common.commitSuccess"];
        this.leaveTypes.push({ leaveTypeName: res["workflow.leave.generalHoliday"], id: 0 });
        this.leaveTypes.push({ leaveTypeName: res["workflow.leave.sickLeave"], id: 1 });
        this.leaveTypes.push({ leaveTypeName: res["workflow.leave.leaveInLieu"], id: 2 });
        this.leaveTypes.push({ leaveTypeName: res["workflow.leave.casualLeave"], id: 3 });
        this.leaveTypes.push({ leaveTypeName: res["workflow.leave.marriageLeave"], id: 4 });
        this.attachmentSizeNotAllowedTip = res["workflow.common.attachmentSizeNotAllowed"];
        this.onlyOneAttachmentTip = res["workflow.common.onlyOneAttachment"];
        this.updateUI();
      });
  }

  fileChange($event) {
    let fileList: FileList = $event.target.files;
    if (fileList.length > 0) {
      if (fileList[0].size >= this.maxFileSize) {
        this.showAlertInfo(this.attachmentSizeNotAllowedTip);
        this.attachmentInput.nativeElement.value = "";
        return;
      }
      this.currentSelectedFile = fileList[0];
    } else {
      this.currentSelectedFile = null;
    }
  }

  upload(processInstanceId: number) {
    if (!this.currentSelectedFile)
      return;
    let formData: FormData = new FormData();
    formData.append('uploadFile', this.currentSelectedFile);
    this.service.processInstanceAttachment(processInstanceId, this.currentSelectedFile.name, formData).subscribe((data) => {
      console.log(`${this.currentSelectedFile.name} upload success`);
    }, (err) => {
      this.showAlertInfo(err._body);
    });
  }

  downloadFile(attachment: string) {
    this.service.downloadFile(this.processInstanceId, attachment).subscribe((data) => {
      console.log(`${attachment} download success`);
    }, (err) => {
      this.showAlertInfo(err._body);
    });
  }

  deleteAttachment() {
    this.processAttachments.forEach(attachment => {
      this.service.removeProcessInstanceVariable(this.processInstanceId, attachment).subscribe((data) => {
        console.log(`${attachment} removed`);
      }, (err) => {
        this.showAlertInfo(err._body);
      });
    });
    this.processAttachments = [];
  }

}
