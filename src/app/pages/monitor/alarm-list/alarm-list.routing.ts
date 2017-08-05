import { Routes, RouterModule }  from '@angular/router';

import { AlarmListComponent } from './alarm-list.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: AlarmListComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
