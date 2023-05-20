import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulariosComponent } from '../formularios/formularios.component';
import { FormsModule } from '@angular/forms';
import { ModalesComponent } from '../modales/modales.component';




@NgModule({
  declarations: [FormulariosComponent,ModalesComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[FormulariosComponent,ModalesComponent]
})
export class SharedModulesModule { }
