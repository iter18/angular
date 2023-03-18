import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AutoresComponent } from './autores.component';
import { FormsModule } from '@angular/forms';


const routes : Routes = [
  {path: '',component:AutoresComponent}
];

@NgModule({
  declarations: [AutoresComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AutoresRoutingModule { }
      