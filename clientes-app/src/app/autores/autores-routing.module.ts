import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AutoresComponent } from './autores.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form.component';


const routes : Routes = [
  {path: '',component:AutoresComponent}
];

@NgModule({
  declarations: [AutoresComponent,FormComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AutoresRoutingModule { }
      