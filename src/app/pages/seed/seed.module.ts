import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SeedComponent } from './seed.component';
import { routing }       from './seed.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    SeedComponent
  ]
})
export class SeedModule {}
