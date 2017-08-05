import { CanActivate } from '@angular/router';
import { PermissionGuard } from '@authorization/permission.guard';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: 'session',
    loadChildren: 'app/session/session.module#SessionModule'
  },
  {
    path: 'about',
    canActivate: [PermissionGuard],
    loadChildren: 'app/pages/about/about.module#AboutModule'
  },
  {
    path: 'pages',
    canActivateChild: [PermissionGuard],
    component: Pages,
    children: [
      // { path: 'seed', loadChildren: './seed/seed.module#SeedModule' },
      { path: 'monitor/alarm', loadChildren: './monitor/alarm-list/alarm-list.module#AlarmListModule' },
      { path: 'monitor', loadChildren: './monitor/monitor.module#MonitorModule' },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'workflow', loadChildren: './workflow/workflow.module#WorkflowModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
