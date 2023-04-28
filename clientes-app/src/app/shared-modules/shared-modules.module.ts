import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulariosComponent } from '../formularios/formularios.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [FormulariosComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[FormulariosComponent]
})
export class SharedModulesModule { }
