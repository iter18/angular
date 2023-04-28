import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AutoresComponent } from './autores.component';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';

const routes : Routes = [
  {path: '',component:AutoresComponent}
];

@NgModule({
  declarations: [AutoresComponent],
  imports: [
    CommonModule,
    SharedModulesModule,
    RouterModule.forChild(routes)
  ]
})
export class AutoresRoutingModule { }
      