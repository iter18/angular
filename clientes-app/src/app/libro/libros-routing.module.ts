import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LibroComponent } from './libro.component';
import { FormComponent } from './form.component';
import { FormsModule } from '@angular/forms';

const routes : Routes =[
  {path: '', component:LibroComponent}
];


@NgModule({
  declarations: [LibroComponent,FormComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class LibrosRoutingModule { }
