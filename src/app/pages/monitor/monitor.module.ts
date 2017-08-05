import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
// import { FindDeviceComponent } from './find-device/find-device.component';
import { AppTranslationModule } from '../../app.translation.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LayoutModule } from '../../layout/layout.module';
import { DeviceDetailService } from './device-detail/device-detail.service';
import { PointStatusItemComponent } from './device-detail/point-custom-item/point-status-item-componet';
import { PointOperationItemComponent } from './device-detail/point-custom-item/point-operation-item-componet';
import { routing } from './monitor.routing';
import { DeviceSeachComponent } from './device-seach/device-seach.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    AppTranslationModule,
    LayoutModule,
    Ng2SmartTableModule
  ],
  providers: [
    DeviceDetailService
  ],
  declarations: [DeviceDetailComponent,  PointOperationItemComponent, PointStatusItemComponent, DeviceSeachComponent],
  entryComponents: [PointStatusItemComponent, PointOperationItemComponent]
})
export class MonitorModule {}
