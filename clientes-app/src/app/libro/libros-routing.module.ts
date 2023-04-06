import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LibroComponent } from './libro.component';
import { FormComponent } from './form.component';
import { FormsModule } from '@angular/forms';
import { ModalsComponent } from './modals.component';


const routes : Routes =[
  {path: '', component:LibroComponent}
];


@NgModule({
  declarations: [LibroComponent,FormComponent,ModalsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class LibrosRoutingModule { }
