import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { routing } from './home.routing';
import { LayoutModule } from '../../layout/layout.module';
import { AppTranslationModule } from '../../app.translation.module';
import { AlarmPostionStatComponent } from './components/alarm-postion-stat/alarm-postion-stat.component';
import { AlarmLevelStatComponent } from './components/alarm-level-stat/alarm-level-stat.component';
import { DeviceStatusStatComponent } from './components/device-status-stat/device-status-stat.component';
import { AlarmTrendChartComponent } from './components/alarm-trend-chart/alarm-trend-chart.component';
import { AlarmRealListComponent } from './components/alarm-real-list/alarm-real-list.component';
import { AlarmPostionStatService } from './components/alarm-postion-stat/alarm-postion-stat.service';
import { AlarmLevelStatService } from './components/alarm-level-stat/alarm-level-stat.service';
import { DeviceStatusStatService } from './components/device-status-stat/device-status-stat.service';
import { AlarmTrendChartService } from './components/alarm-trend-chart/alarm-trend-chart.service';
import { AlarmRealListService } from './components/alarm-real-list/alarm-real-list.service';
import { AngularEchartsModule } from 'ngx-echarts';
import { D3Service } from 'd3-ng2-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    routing,
    AngularEchartsModule,
    AppTranslationModule
  ],
  declarations: [
    HomeComponent,
    AlarmPostionStatComponent,
    AlarmLevelStatComponent,
    DeviceStatusStatComponent,
    AlarmTrendChartComponent,
    AlarmRealListComponent
  ],
  providers: [
    AlarmPostionStatService,
    AlarmLevelStatService,
    DeviceStatusStatService,
    AlarmTrendChartService,
    AlarmRealListService,
    D3Service
  ]
})
export class HomeModule {}
