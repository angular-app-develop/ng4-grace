import { CanActivate } from '@angular/router';
import { PermissionGuard } from '@authorization/permission.guard';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowComponent } from './workflow.component';
import { ModuleWithProviders } from '@angular/core';
import { WorkflowDesktopComponent } from './workflow-desktop/workflow-desktop.component';
import { WorkflowTasksComponent } from './components/workflow-tasks/workflow-tasks.component';
import { WorkflowLeaveDocumentComponent } from './processes/leave/workflow-leave-document/workflow-leave-document.component';
import { WorkflowStartLeaveComponent } from './processes/leave/workflow-start-leave/workflow-start-leave.component';
import { WorkflowSearchComponent } from '@workflow/components/workflow-search/workflow-search.component';
import { WokrflowGroupsUsersMain } from './workflow-groups-users/workflow-groups-users.main';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [PermissionGuard],
    component: WorkflowComponent,
    children: [
      { path: 'workflowdesktop', component: WorkflowDesktopComponent },
      { path: 'workflowtasks', component: WorkflowTasksComponent },
      { path: 'workflowleavedocument', component: WorkflowLeaveDocumentComponent },
      { path: 'workflowstartleave', component: WorkflowStartLeaveComponent },
      { path: 'workflowsearch', component: WorkflowSearchComponent },
      { path: 'workflowusermanagement', component: WokrflowGroupsUsersMain },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
