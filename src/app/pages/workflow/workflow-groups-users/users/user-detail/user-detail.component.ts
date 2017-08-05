import { Component, ViewChild, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { WorkflowGroupUserService } from '../../workflow-group-user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '@models/workflow/user';
import { EventMode } from '@models/workflow/eventMode';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserModalComponent implements OnInit {

  user: User = new User();
  title: string;
  mode: EventMode;
  isAddMode: boolean;

  userId_translate: string;
  userIdNotEmpty_translate: string;
  userName_translate: string;
  userNameNotEmpty_translate: string;
  userEmail_translate:string;
  ok_translate: string;
  cancel_translate: string;

  langKeys = [
    'workflow.user.confirmDeleteuser',
    'workflow.user.addUserSuccess',
    'workflow.user.addUserMemberError',
    'workflow.user.updateUserSuccess',
    'workflow.user.updateUserError',
    'workflow.user.userIdNotNull',
    'workflow.user.userNameNotNull',
    'workflow.user.userId',
    'workflow.user.userName',
    'workflow.user.userEmail',
    'general.common.add',
    'general.common.edit',
    'general.common.error',
    'general.common.ok',
    'general.common.cancel'
  ];

  langMap: Map<string, string> = new Map<string, string>();


  constructor(private service: WorkflowGroupUserService, private ngModal: NgbActiveModal,private translate: TranslateService) {
  }


  ngOnInit() {
    this.getTranslateMessage();
    this.title = this.langMap.get('general.common.add');
    this.isAddMode = true;
    if (this.mode == EventMode.edit) {
      this.user = this.service.getUser();
      this.title = this.langMap.get('general.common.edit');
      this.isAddMode = false;
    }
  }

  getTranslateMessage(): void {
    this.translate.get(this.langKeys).subscribe(res => {
      for (let key of this.langKeys) {
        this.langMap.set(key, res[key]);
      }
      this.userId_translate = this.langMap.get('workflow.user.userId');
      this.userName_translate = this.langMap.get('workflow.user.userName');
      this.userIdNotEmpty_translate = this.langMap.get('workflow.user.userIdNotNull');
      this.userNameNotEmpty_translate = this.langMap.get('workflow.user.userNameNotNull');
      this.userEmail_translate=this.langMap.get('workflow.user.userEmail');
      this.ok_translate = this.langMap.get('general.common.ok');
      this.cancel_translate = this.langMap.get('general.common.cancel');
    });
  }

  validate(): boolean {
    if (!this.user.userId) {
      this.service.showToast('error', this.langMap.get('workflow.user.userIdNotNull'), this.langMap.get('general.common.error'));
      return false;
    }
    if (!this.user.userName) {
      this.service.showToast('error', this.langMap.get('workflow.user.userNameNotNull'), this.langMap.get('general.common.error'));
      return false;
    }
    return true;
  }



  submit() {
    if (!this.validate()) return;
    if (this.mode == EventMode.edit) {
      this.service.editUser(this.user).subscribe((data) => {
        if (data && data._body) {
          this.user = this.service.convertToUser(JSON.parse(data._body));
          this.service.showToast('success', this.langMap.get('workflow.user.updateUserSuccess').replace('{0}', this.user.userName), '');
        }
      }, (error) => {
        this.service.showToast('error',  this.langMap.get('workflow.user.updateUserSuccess').replace('{0}', this.user.userName) + error._body, '');
      });
    }
    else {
      this.service.addUser(this.user).subscribe((data) => {
        if (data && data._body) {
          this.user = this.service.convertToUser(JSON.parse(data._body));
          this.service.showToast('success',this.langMap.get('workflow.user.addUserSuccess').replace('{0}', this.user.userName), '');
        }
      }, (error) => {
        this.service.showToast('error', this.langMap.get('workflow.user.addUsererror').replace('{0}', this.user.userName) + error._body, '');
      });
    }
    this.ngModal.close('ok');
  }

  close() {
    this.user = null;
    this.ngModal.close('cancel');
  }


}



