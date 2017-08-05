import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppTranslationModule } from '../app.translation.module';

import {
  BaMsgCenter,
  BaPageTop,
  BaMenuItem,
  BaMenu,
  BaSidebar,
  BaBackTop,
  BaCard,
  BaContentTop
} from './components';

import {
  BaImageLoaderService,
  BaMenuService,
  BaThemePreloader,
  BaThemeSpinner,
  BaContentTopService,
} from './services';

import {
  EmailValidator,
  EqualPasswordsValidator
} from './validators';

import {
  BaScrollPosition,
  BaSlimScroll
} from './directives';

import {
  BaAppPicturePipe,
  BaProfilePicturePipe
} from './pipes';


const LY_COMPONENTS = [
  BaMsgCenter,
  BaPageTop,
  BaMenuItem,
  BaMenu,
  BaSidebar,
  BaBackTop,
  BaCard,
  BaContentTop
];

const LY_SERVICES = [
  BaImageLoaderService,
  BaMenuService,
  BaThemePreloader,
  BaThemeSpinner,
  BaContentTopService
];

const LY_VALIDATORS = [
  EmailValidator,
  EqualPasswordsValidator
];

const LY_DIRECTIVES = [
  BaScrollPosition,
  BaSlimScroll
];

const LY_PIPES = [
  BaAppPicturePipe,
  BaProfilePicturePipe
];

@NgModule({
  declarations: [
    ...LY_PIPES,
    ...LY_DIRECTIVES,
    ...LY_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule
  ],
  exports: [
    ...LY_PIPES,
    ...LY_DIRECTIVES,
    ...LY_COMPONENTS
  ]
})

export class LayoutModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: LayoutModule,
      providers: [
        ...LY_VALIDATORS,
        ...LY_SERVICES
      ],
    };
  }
}
