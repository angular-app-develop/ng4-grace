import { Routes, RouterModule }  from '@angular/router';

import { SeedComponent } from './seed.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: SeedComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
