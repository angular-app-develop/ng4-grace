import { Component, OnInit } from '@angular/core';
import { WorkflowGroupUserService } from '../../workflow-group-user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Group } from '@models/workflow/group';
import { EventMode } from '@models/workflow/eventMode';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'show-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  group: Group = new Group();
  title: string;
  mode: EventMode;
  isAddMode: boolean;

  groupId_translate: string;
  groupIdNotEmpty_translate: string;
  groupName_translate: string;
  groupNameNotEmpty_translate: string;
  ok_translate: string;
  cancel_translate: string;

  langKeys = [
    'workflow.group.confirmDeleteGroup',
    'workflow.group.addGroupSuccess',
    'workflow.group.addGroupMemberError',
    'workflow.group.updateGroupSuccess',
    'workflow.group.updateGroupError',
    'workflow.group.groupIdNotNull',
    'workflow.group.groupNameNotNull',
    'workflow.group.groupId',
    'workflow.group.groupName',
    'general.common.add',
    'general.common.edit',
    'general.common.error',
    'general.common.ok',
    'general.common.cancel'
  ];

  langMap: Map<string, string> = new Map<string, string>();

  constructor(private service: WorkflowGroupUserService, private ngModal: NgbActiveModal, private translate: TranslateService) {

  }

  ngOnInit() {
    this.getTranslateMessage();

    this.title = this.langMap.get('general.common.add');
    this.isAddMode = true;
    if (this.mode == EventMode.edit) {
      this.group = this.service.getcurrentGroup();
      this.title = this.langMap.get('general.common.edit');
      this.isAddMode = false;
    }
  }

  getTranslateMessage(): void {
    this.translate.get(this.langKeys).subscribe(res => {
      for (let key of this.langKeys) {
        this.langMap.set(key, res[key]);
      }
      this.groupId_translate = this.langMap.get('workflow.group.groupId');
      this.groupName_translate = this.langMap.get('workflow.group.groupName');
      this.groupIdNotEmpty_translate = this.langMap.get('workflow.group.groupIdNotNull');
      this.groupNameNotEmpty_translate = this.langMap.get('workflow.group.groupNameNotNull');
      this.ok_translate = this.langMap.get('general.common.ok');
      this.cancel_translate = this.langMap.get('general.common.cancel');
    });
  }

  validate(): boolean {
    if (!this.group.id) {
      this.service.showToast('error', this.langMap.get('workflow.group.groupIdNotNull'), this.langMap.get('general.common.error'));
      return false;
    }
    if (!this.group.name) {
      this.service.showToast('error', this.langMap.get('workflow.group.groupNameNotNull'), this.langMap.get('general.common.error'));
      return false;
    }
    return true;
  }



  submit() {
    if (!this.validate()) return;
    if (this.mode == EventMode.edit) {
      this.service.editGroup(this.group).subscribe((data) => {
        if (data && data._body) {
          this.group = JSON.parse(data._body);
          this.service.showToast('success', this.langMap.get('workflow.group.updateGroupSuccess').replace('{0}', this.group.name), '');
        }
      }, (error) => {
        this.service.showToast('error', this.langMap.get('workflow.group.updateGroupSuccess').replace('{0}', this.group.name) + error._body, '');
      });
    }
    else {
      this.service.addGroup(this.group).subscribe((data) => {
        if (data && data._body) {
          this.group = JSON.parse(data._body);
          this.service.showToast('success', this.langMap.get('workflow.group.addGroupSuccess').replace('{0}', this.group.name), '');
        }
      }, (error) => {
        this.service.showToast('error', this.langMap.get('workflow.group.addGrouperror').replace('{0}', this.group.name) + error._body, '');
      });
    }
    this.ngModal.close('ok');
  }

  close() {
    this.ngModal.close('cancel');
  }
}
