import { Component, OnInit, ViewChild, Pipe, PipeTransform, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { WorkflowGroupUserService } from '../workflow-group-user.service';
import { Group } from '@models/workflow/group';
import { User } from '@models/workflow/user';
import { MemberListComponent } from './member-list/member-list.component';
import { AddMemberPopoverContentComponent } from './add-member-popover-content/add-member-popover-content.component';
import { DelModalComponent } from '@components/delete-modal/delete-modal.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventMode } from '@models/workflow/eventMode';
import { FilterPipe } from '../../components/filter/filter.pipe';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap/popover/popover';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent implements OnInit {

  groups: Array<Group>;

  members: Array<User>;

  searchMemberText: string;

  searchGroupName: string;

  currentGroup: Group = new Group();


  langKeys = [
    'workflow.group.confirmDeleteGroup',
    'workflow.deleteSuccess'
  ];

  langMap: Map<string, any> = new Map<string, any>();


  constructor(private service: WorkflowGroupUserService, private modal: NgbModal, private translate: TranslateService) {
    this.getTranslateMessage();
  }

  @ViewChild(MemberListComponent) memberListChild: MemberListComponent;
  @ViewChild('p') public popover: NgbPopover;
  @ViewChild(AddMemberPopoverContentComponent) addMemberChild: AddMemberPopoverContentComponent

  ngOnInit() {
    this.getGroups();
  }

  getTranslateMessage(): void {
    this.translate.get(this.langKeys).subscribe(res => {
      for (let key of this.langKeys) {
        this.langMap.set(key, res[key]);
      }
    });
  }


  getGroups(): void {
    this.service.getGroups().subscribe((data) => {
      this.groups = JSON.parse(data._body).data;
      this.selectGroup(this.groups[0]);
    }, (error) => {
    });
  }

  selectGroup(group: Group): void {
    this.currentGroup = group;
    this.memberListChild.load(group);
  }

  delete(): void {
    const activeModal = this.modal.open(DelModalComponent, { size: 'sm' });
    activeModal.componentInstance.content = this.langMap.get('workflow.group.confirmDeleteGroup') + this.currentGroup.name;
    activeModal.result.then((v) => {
      if (v == 'ok') {
        this.service.deleteGroup(this.currentGroup.id).subscribe((data) => {
          this.getGroups();
          this.service.showToast('success', this.langMap.get('workflow.deleteSuccess'), '');
        }, (error) => {
        });
      }
    });
  }

  update(): void {
    this.service.setcurrentGroup(this.currentGroup);
    this.openModal(EventMode.edit, GroupDetailComponent);
  }

  add(): void {
    this.openModal(EventMode.add, GroupDetailComponent);
  }


  searchMember(): void {
    this.memberListChild.search(this.searchMemberText);
  }


  openModal(eventMode: EventMode, component): void {
    const activeModal = this.modal.open(component, { size: 'sm' });
    activeModal.componentInstance.mode = eventMode;
    activeModal.result.then((v) => {
      if (v == 'ok' && eventMode == EventMode.add) {
        setTimeout(() => {
          this.getGroups();
        }, 3000);
      }
    });
  }


  refreshMembers(event) {
    let state = event;
    if (state = 'ok') {
      this.memberListChild.load(this.currentGroup);
    }
    this.popoverClose();
  }


  popoverShow(): void {
    this.service.setcurrentGroup(this.currentGroup);
    this.popover.toggle();
  }

  popoverClose():void{
    let isOpen=this.popover.isOpen;
    if(isOpen){
      this.popover.close();
    }
  }




}
