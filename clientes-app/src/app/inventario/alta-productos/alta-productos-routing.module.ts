import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule, Routes } from '@angular/router';
import { AltaProductosComponent } from './alta-productos.component';
import { FormulariosComponent } from 'src/app/formularios/formularios.component';


const routes : Routes = [
  {path : '', component : AltaProductosComponent}
]

@NgModule({
  declarations: [AltaProductosComponent,FormulariosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AltaProductosRoutingModule { }
