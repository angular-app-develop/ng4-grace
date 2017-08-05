import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterPipe } from '@workflow/components/filter/filter.pipe';
import { WorkflowGroupUserService } from '../../workflow-group-user.service';
import { User } from '@models/workflow/user';
import { Group } from '@models/workflow/Group';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap/popover/popover';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'add-member-popover-content',
  templateUrl: './add-member-popover-content.component.html',
  styleUrls: ['./add-member-popover-content.component.scss']
})
export class AddMemberPopoverContentComponent implements OnInit {

  constructor(private service: WorkflowGroupUserService, private translate: TranslateService) {
    this.group = this.service.getcurrentGroup();
    this.getGroupMembers();
  }

  users: Array<User>;

  groupMembers: Array<User>;

  group: Group;

  currentUser: User;

  searchUserText: string;

  @Output() refreshMembers = new EventEmitter<any>();

  @Output() popoverClose = new EventEmitter<any>();

  langKeys = [
    'workflow.group.addGroupMemberSuccess',
    'workflow.group.addGroupMemberError'
  ];

  langMap: Map<string, string> = new Map<string, string>();

  ngOnInit() {
    this.getTranslateMessage();
  }

  getTranslateMessage(): void {
    this.translate.get(this.langKeys).subscribe(res => {
      for (let key of this.langKeys) {
        this.langMap.set(key, res[key]);
      }
    });
  }

  getUsers(): void {
    this.service.getData().subscribe((data) => {
      let dataSource = JSON.parse(data._body);
      let source = this.service.convertToUsers(dataSource.data);
      if (this.users) this.users.length = 0;
      this.filterUserData(source);
    });
  }

  filterUserData(users: Array<User>) {
    if (!users || users.length == 0) return;
    for (let u of users) {
      if (this.groupMembers.filter((m) => m.userId == u.userId).length > 0) continue;
      if (!this.users) {
        this.users = new Array<User>();
      }
      this.users.push(u);
    }
  }

  selectUser(user): void {
    this.currentUser = user;
  }

  getGroupMembers() {
    this.service.getGroupMembers(this.group.id).subscribe(
      (data) => {
        this.groupMembers = this.service.convertToUsers(JSON.parse(data._body).data);
      })
  }

  addMember(user: User): void {
    this.service.addGroupMember(this.group.id, user.userId).subscribe((data) => {
      this.refreshMembers.emit('ok');
      this.service.showToast('success', this.langMap.get('workflow.group.addGroupMemberSuccess').replace('{0}', user.userName), '');
    }, (error) => {
      this.refreshMembers.emit('error');
      this.service.showToast('error', this.langMap.get('workflow.group.addGroupMemberSuccess').replace('{0}', user.userName) + error, '');
    });
  }

}
