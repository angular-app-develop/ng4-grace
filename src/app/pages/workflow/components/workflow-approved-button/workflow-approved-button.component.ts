import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DefaultModal } from '@components/default-modal/default-modal.component';
import { WorkflowService } from '@services/workflow/workflow.service';
import { TodoTaskService } from '@services/workflow/todoTaskService';
import { AuthenticationService } from '@layout/services/authentication.service';
import { TaskObject, WorkflowTaskDetailOperation, TaskActionRequest } from '@models/workflow/index';

@Component({
    template: `
        <a (click)="onClick()" class="approvedBtn approvedBtnBackground">       
         <span>{{renderValue}}</span>
        </a>  
    `,
    styleUrls: ['./workflow-approved-button.component.scss']
})

export class ApprovedButtonComponent implements ViewCell, OnInit {
    @Input() value;
    renderValue: string;
    taskObject: TaskObject;
    modalTip: string;

    constructor(private modalService: NgbModal,
        private router: Router,
        private service: WorkflowService,
        private authenticationService: AuthenticationService,
        private translate: TranslateService,
        private todoTaskService: TodoTaskService
    ) {
    }

    ngOnInit() {
        this.getTranslateMessage();
        this.taskObject = this.value;
    }

    getTranslateMessage() {
        this.translate.get(["workflow.common.approval"]).subscribe(res => {
            this.renderValue = res["workflow.common.approval"];
        });
    }

    onClick() {
        this.claimTask();
    }

    claimTask() {
        if (!this.taskObject)
            return;
        if (this.taskObject.assignee) {
            this.router.navigate(['/pages/workflow/workflowleavedocument'], {
                queryParams: {
                    id: this.taskObject.id,
                    type: WorkflowTaskDetailOperation[WorkflowTaskDetailOperation.todoTaskDetail]
                }
            });
        }
        else {
            let taskActionRequest = new TaskActionRequest("claim", this.authenticationService.getUserName());
            this.service.taskAction(Number(this.taskObject.id), taskActionRequest).subscribe((data) => {
                this.router.navigate(['/pages/workflow/workflowleavedocument'], {
                    queryParams: {
                        id: this.taskObject.id,
                        type: WorkflowTaskDetailOperation[WorkflowTaskDetailOperation.todoTaskDetail]
                    }
                });
            }, (err) => {
                this.showAlertInfo(err._body);
            });
        }
    }

    showAlertInfo(message: string) {
        const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
        activeModal.componentInstance.modalHeader = this.modalTip;
        activeModal.componentInstance.modalContent = message;
    }
}
