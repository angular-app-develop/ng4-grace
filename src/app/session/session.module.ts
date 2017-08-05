import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '@app/app.translation.module';
import { SessionComponent } from '@session/session.component';
import { LoginComponent } from '@session/login/login.component';
import { NotFoundComponent } from '@session/not-found/not-found.component';
import { routing } from './session.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppTranslationModule,
    routing
  ],
  declarations: [SessionComponent, LoginComponent, NotFoundComponent]
})
export class SessionModule { }
