import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { WorkflowGroupUserService } from '../../workflow-group-user.service';
import { GlobalState } from '../../../../../global.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from '../user-detail/user-detail.component';
import { EventMode } from '@models/workflow/eventMode';
import { DelModalComponent } from '@components/delete-modal/delete-modal.component';
import { User } from '@models/workflow/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserTableComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();

  searchText: string;

  customers: FormGroup;

  selectUser: User;

  filterConf: Array<any>;

  langKeys = [
    'workflow.user.action',
    'workflow.user.userId', 'workflow.user.userName',
    'workflow.user.userEmail',
    'workflow.user.confirmDeleteUser',
    'workflow.deleteSuccess'
  ];

  langMap: Map<string, any> = new Map<string, any>();

  settings: any

  constructor(private _state: GlobalState, private service: WorkflowGroupUserService, private modal: NgbModal
    , private translate: TranslateService) {
    this.getTranslateMessage();
    this._state.subscribe('workflow.users', () => {
      this.load();
    });
  }

  ngOnInit() {
    this.load();
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
        edit: true,
        delete: true,
        custom: [],
        position: 'right', // left|right
      },

      edit: {
        editButtonContent: '<i class="ion-edit"></i>'
      },
      delete: {
        deleteButtonContent: '<i class="ion-trash-a"></i>',
      },
      columns: {
        userId: {
          title: this.langMap.get('workflow.user.userId'),
          type: 'number'
        },
        userName: {
          title: this.langMap.get('workflow.user.userName'),
          type: 'string'
        },
        email: {
          title: this.langMap.get('workflow.user.userEmail'),
          type: 'string'
        }
      }
    };
  }


  edit(event): void {
    let row = event.data;
    this.service.setUser(row);
    this.openModal(EventMode.edit, UserModalComponent);

  }

  add(event): void {
    let row = event.data;
    this.service.setUser(null);
    this.openModal(EventMode.add, UserModalComponent);
  }

  delete(event) {
    this.selectUser = event.data;
    const activeModal = this.modal.open(DelModalComponent, { size: 'sm' });
    activeModal.componentInstance.content =this.langMap.get('workflow.user.confirmDeleteUser') + this.selectUser.userName;
    activeModal.result.then((v) => {
      if (v == 'ok') {
        this.service.deleteUser(this.selectUser.userId).subscribe((data) => {
          this._state.notifyDataChanged('workflow.users', null);
          this.service.showToast('success', this.langMap.get('workflow.deleteSuccess'), '');
        });
      }
    });
  }

  search(event) {
    this.filterConf = [{ field: 'userId', search: this.searchText }, { field: 'userName', search: this.searchText }];
    this.source.setFilter(this.filterConf, false);
  }


  load(): void {
    this.service.getData().subscribe((data) => {
      let dataSource = JSON.parse(data._body);
      let users = this.service.convertToUsers(dataSource.data);
      this.source.load(users);
    });
  }

  openModal(mode: EventMode, component): void {
    const activeModal = this.modal.open(component, { size: mode == EventMode.add ? 'lg' : 'sm' });
    activeModal.componentInstance.mode = mode;
    activeModal.result.then((v) => {
      if (v == 'ok') {
        setTimeout(() => {
          this._state.notifyDataChanged('workflow.users', this.load());
        }, 3000);
      }
    });
  }
}
