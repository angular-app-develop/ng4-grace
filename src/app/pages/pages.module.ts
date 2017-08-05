import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';
import { Pages } from './pages.component';
import { LayoutModule } from '@layout/layout.module';
import { AppTranslationModule } from '../app.translation.module';


@NgModule({
  imports: [
    CommonModule, LayoutModule, AppTranslationModule, routing
  ],
  declarations: [Pages]
})
export class PagesModule { }
