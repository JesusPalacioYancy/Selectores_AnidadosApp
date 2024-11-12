import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

import { SelectorRoutingModule } from './countries-routing.module';


@NgModule({
  declarations: [
    SelectorPageComponent
  ],
  imports: [
    CommonModule,
    SelectorRoutingModule,
    ReactiveFormsModule
  ]
})
export class CountriesModule { }
