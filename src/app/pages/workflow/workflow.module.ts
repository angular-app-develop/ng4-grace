import { PermissionGuard } from '@authorization/permission.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';
import { WorkflowComponent } from './workflow.component';
import { WorkflowDesktopComponent } from './workflow-desktop/workflow-desktop.component';
import { routing } from './workflow.routing';
import { WorkflowTasksComponent } from './components/workflow-tasks/workflow-tasks.component';
import { WorkflowLeaveDocumentComponent } from './processes/leave/workflow-leave-document/workflow-leave-document.component';
import { WokrflowGroupsUsersMain } from './workflow-groups-users/workflow-groups-users.main';
import { WorkflowService } from '@services/workflow/workflow.service';
import { WorkflowGroupUserService } from './workflow-groups-users/workflow-group-user.service';
import { UserTableComponent } from './workflow-groups-users/users/user-list/user-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkflowStartLeaveComponent } from './processes/leave/workflow-start-leave/workflow-start-leave.component';
import { WorkflowOperationComponent } from './components/workflow-operation/workflow-operation.component';
import { WorkflowBasicInfoComponent } from './components/workflow-basic-info/workflow-basic-info.component';
import { TodoTaskService} from '@services/workflow/todoTaskService';
import { WorkflowApprovalComponent } from './components/workflow-approval/workflow-approval.component';
import { GroupComponent } from './workflow-groups-users/groups/group.component';
import { MemberListComponent } from './workflow-groups-users/groups/member-list/member-list.component';
import { WorkflowLeaveRequestComponent } from './processes/leave/workflow-leave-request/workflow-leave-request.component';
import { AppTranslationModule } from '../../app.translation.module';
import { WorkflowApprovedRecordComponent } from './components/workflow-approved-record/workflow-approved-record.component';
import { FilterPipe } from './components/filter/filter.pipe';
import { AddMemberPopoverContentComponent } from './workflow-groups-users/groups/add-member-popover-content/add-member-popover-content.component';
import { WorkflowSearchComponent } from '@workflow/components/workflow-search/workflow-search.component';
import { ApprovedButtonComponent } from './components/workflow-approved-button/workflow-approved-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    routing,
    Ng2SmartTableModule,
    NgbModule,
    AppTranslationModule
  ],
  declarations: [
    WorkflowComponent,
    WorkflowDesktopComponent,
    WorkflowApprovedRecordComponent,
    WorkflowTasksComponent,
    WorkflowLeaveDocumentComponent,
    WokrflowGroupsUsersMain,
    WorkflowStartLeaveComponent,
    UserTableComponent,
    WorkflowOperationComponent,
    WorkflowBasicInfoComponent,
    WorkflowApprovalComponent,
    WorkflowLeaveRequestComponent,
    GroupComponent,
    MemberListComponent,
    FilterPipe,
    AddMemberPopoverContentComponent,
    WorkflowSearchComponent,
    ApprovedButtonComponent
  ],
  providers: [
    WorkflowService,
    WorkflowGroupUserService,
    TodoTaskService,
    PermissionGuard
  ],
  entryComponents: [
    ApprovedButtonComponent
  ]
})
export class WorkflowModule { }
