/**
 * Created by DELL on 8/5/2017.
 */
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { SessionComponent } from './session.component';

export const routes: Routes = [
  {
    path: '',
    component: SessionComponent,
    children: [{
      path: '',
      component: LoginComponent
    }, {
      path: '404',
      component: NotFoundComponent
    }]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
