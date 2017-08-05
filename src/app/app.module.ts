import { PermissionGuard } from '@authorization/permission.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { DefaultModal } from '@components/default-modal/default-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserModalComponent } from './pages/workflow/workflow-groups-users/users/user-detail/user-detail.component';
import { GroupDetailComponent } from './pages/workflow/workflow-groups-users/groups/group-detail/group-detail.component';
import { DelModalComponent } from '@components/delete-modal/delete-modal.component';
import { AlarmSeverityImgRenderComponent } from '@components/alarm-severity-img-render-componet';

/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';

// third party modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// lory modules
import { PagesModule } from '@pages/pages.module';
import { SessionModule } from '@session/session.module';
import { LayoutModule } from './layout/layout.module';

import { AppComponent } from './app.component';
import { GlobalState } from './global.state';
import { AuthenticationService } from './layout/services/authentication.service';
import { WorkflowService } from '@services/workflow/workflow.service';
import { ToastService } from '@services/common/toast.service';

// Application wide providers
const APP_PROVIDERS = [
  GlobalState,
  AuthenticationService,
  PermissionGuard,
  ToastService
];

// Function for setting the default restangular configuration
export function RestangularConfigFactory(RestangularProvider) {
  //RestangularProvider.setBaseUrl('http://127.0.0.1:8888');
  //RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
}


@NgModule({
  declarations: [
    AppComponent,
    DefaultModal,
    AlarmSeverityImgRenderComponent,
    UserModalComponent,
    GroupDetailComponent,
    DelModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule.forRoot(),
    LayoutModule.forRoot(),
    RestangularModule.forRoot(RestangularConfigFactory),
    PagesModule,
    SessionModule,
    routing
  ],
  providers: [
    APP_PROVIDERS
  ],
  entryComponents: [
    DefaultModal,
    AlarmSeverityImgRenderComponent,
    UserModalComponent,
    GroupDetailComponent,
    DelModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
