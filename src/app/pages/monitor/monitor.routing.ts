import { Routes, RouterModule } from '@angular/router';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [{
  path: '',  
  children: [      
    { path: 'device', component: DeviceDetailComponent },
    // { path: 'device', component: FindDeviceComponent }
  ]
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
