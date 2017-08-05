import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '@layout/services/authentication.service';
import { WorkflowService } from '@services/workflow/workflow.service';
import { TodoTaskService } from '@services/workflow/todoTaskService';
import { DefaultModal } from '@components/default-modal/default-modal.component';
import { TaskActionRequest } from '@models/workflow/index';

@Component({
  selector: 'app-workflow-operation',
  templateUrl: './workflow-operation.component.html',
  styleUrls: ['./workflow-operation.component.scss']
})
export class WorkflowOperationComponent implements OnInit {
  @Input() taskId: number;
  @Input() controlDisabled: boolean;
  username: string;
  userToDelegateTo: string;
  disabled: boolean = true;
  users: any = [];
  modalTip: string;
  userToDelegateToNotNullTip: string;
  userNotFoundTip: string;
  delegateSuccessTip: string;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private workflowService: WorkflowService,
    private todoTaskService:TodoTaskService,
    private modalService: NgbModal,
    private translate: TranslateService) {
    if (localStorage.langKey) {
      const lang = localStorage.langKey;
      translate.use(lang);
    }
  }

  ngOnInit() {
    this.username = this.authenticationService.getUserName();
    if (this.taskId) {
      this.disabled = this.controlDisabled;
    }
    this.workflowService.getUsers().subscribe((data) => {
      let tmpUsers = JSON.parse(data._body).data;
      tmpUsers.forEach(element => {
        this.users.push(element.id);
      });
    }, (err) => {
      this.todoTaskService.showToast('warning', err._body, 'warning');
    });
    this.getTranslateMessage();
  }

  getTranslateMessage() {
    this.translate.get(["workflow.leave.userToDelegateToNotNull", "workflow.leave.userNotFound", "general.common.tip", "workflow.leave.delegateSuccess"]).subscribe(res => {
      this.userToDelegateToNotNullTip = res["workflow.leave.userToDelegateToNotNull"];
      this.userNotFoundTip = res["workflow.leave.userNotFound"];
      this.modalTip = res["general.common.tip"];
      this.delegateSuccessTip = res["workflow.leave.delegateSuccess"];
    });
  }

  searchUser = (text$: Observable<string>) =>
    map.call(distinctUntilChanged.call(debounceTime.call(text$, 200)),
      term => term.length < 2 ? [] : this.users.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  delegateTask() {
    if (this.disabled) {
      return;
    }
    if (!this.userToDelegateTo) {
      this.showAlertInfo(this.userToDelegateToNotNullTip);
      return;
    }
    //user validation
    let userValid = false;
    this.workflowService.getUsers().subscribe((data) => {
      let tmpUsers = JSON.parse(data._body).data;
      for (let user of tmpUsers) {
        if (user.id == this.userToDelegateTo) {
          userValid = true;
          break;
        }
      }
      if (!userValid) {
        this.showAlertInfo(this.userNotFoundTip);
        return;
      }
      let taskActionRequest = new TaskActionRequest("delegate", this.userToDelegateTo);
      this.workflowService.taskAction(this.taskId, taskActionRequest).subscribe((data) => {
        this.showAlertInfo(this.delegateSuccessTip);
        this.router.navigate(['/pages/workflow/workflowdesktop'], { queryParams: { type: 'ok' } });
      }, (err) => {
        this.todoTaskService.showToast('warning', err._body, 'warning');
      });
    }, (err) => {
      this.todoTaskService.showToast('warning', err._body, 'warning');
    });
  }

  showAlertInfo(message: string) {
    const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
    activeModal.componentInstance.modalHeader = this.modalTip;
    activeModal.componentInstance.modalContent = message;
  }

}
