import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule, Routes } from '@angular/router';
import { AltaProductosComponent } from './alta-productos.component';
import { FormsModule } from '@angular/forms';
import { SharedModulesModule } from 'src/app/shared-modules/shared-modules.module';


const routes : Routes = [
  {path : '', component : AltaProductosComponent}
]

@NgModule({
  declarations: [AltaProductosComponent],
  imports: [
    CommonModule,
    SharedModulesModule,
    RouterModule.forChild(routes)
  ]
})
export class AltaProductosRoutingModule { }
