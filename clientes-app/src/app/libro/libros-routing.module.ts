import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LibroComponent } from './libro.component';
import { FormsModule } from '@angular/forms';
import { ModalsComponent } from './modals.component';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';


const routes : Routes =[
  {path: '', component:LibroComponent}
];


@NgModule({
  declarations: [LibroComponent,ModalsComponent],
  imports: [
    CommonModule,
    SharedModulesModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class LibrosRoutingModule { }
