import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
// import { GroupComponent } from '../group.component';
import { WorkflowGroupUserService } from '../../workflow-group-user.service';
import { Group } from '@models/workflow/group';
import { DelModalComponent } from '@components/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();

  selectUser: any;

  selectGroup: Group;

  filterConf: Array<any>;

  settings: any;

  langKeys = [
    'workflow.user.action',
    'workflow.user.userId',
    'workflow.user.userName',
    'workflow.group.confirmDeleteGroupMember',
    'workflow.deleteSuccess'
  ];

  langMap: Map<string,string> = new Map<string, string>();

  constructor(private service: WorkflowGroupUserService, private modal: NgbModal, private translate: TranslateService) {

  }

  ngOnInit() {
    this.getTranslateMessage();
  }

  getTranslateMessage(): void {
    this.translate.get(this.langKeys).subscribe(res => {
      for (let key of this.langKeys) {
        this.langMap.set(key, res[key]);
      }
      this.settings = this.setSetting();
    });
  }

  setSetting(): any {
    return {

      mode: 'external', // inline|external|click-to-edit

      hideSubHeader: true,

      actions: {
        columnTitle: this.langMap.get('workflow.user.action'),
        add: false,
        edit: false,
        delete: true,
        custom: [],
        position: 'right', // left|right
      },
      delete: {
        deleteButtonContent: '<i class="ion-trash-a"> </i>',
      },
      columns: {
        userId: {
          title: this.langMap.get('workflow.user.userId'),
          type: 'number'
        },
        userName: {
          title: this.langMap.get('workflow.user.userName'),
          type: 'string'
        }
      }
    };
  }

  load(group: Group): void {
    this.selectGroup = group;
    this.service.getGroupMembers(group.id).subscribe((data) => {
      let members = this.service.convertToUsers(JSON.parse(data._body).data);
      this.source.load(members);
    }, (error) => {
    });
  }


  delete(event) {
    this.selectUser = event.data;
    this.openModal(DelModalComponent);
  }

  search(searchText) {
    this.filterConf = [{ field: 'userId', search: searchText }, { field: 'userName', search: searchText }];
    this.source.setFilter(this.filterConf, false);
  }

  openModal(component): void {
    const activeModal = this.modal.open(component, { size: 'sm' });
    activeModal.componentInstance.content = this.langMap.get('workflow.group.confirmDeleteGroupMember').replace('{0}',this.selectUser.userName).replace('{1}',this.selectGroup.name);
    activeModal.result.then((v) => {
      if (v == 'ok') {
        this.service.deleteGroupMember(this.selectGroup.id, this.selectUser.userId).subscribe((data) => {
          this.load(this.selectGroup);
          this.service.showToast('success', this.langMap.get('workflow.deleteSuccess'), '');
        }, (error) => {

        });
      }
    });
  }




}
