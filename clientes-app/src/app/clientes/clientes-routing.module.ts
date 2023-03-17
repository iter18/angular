import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form.component';


const routes : Routes = [
  {path: '',component:ClientesComponent},
  {path:'form', component:FormComponent},
  {path : 'form/:id',component : FormComponent}
];


@NgModule({
  declarations: [ClientesComponent,FormComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientesRoutingModule { }
