import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmListComponent } from './alarm-list.component';
import { AppTranslationModule } from '../../../app.translation.module';
import { LayoutModule } from '../../../layout/layout.module';
import { routing } from './alarm-list.routing';
import { AlarmListService } from './alarm-list.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    LayoutModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    AlarmListComponent,

  ],
  providers: [
    AlarmListService
  ]
})
export class AlarmListModule { }
