import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GestionProductosComponent } from './gestion-productos.component';
import { SharedModulesModule } from 'src/app/shared-modules/shared-modules.module';
import { PanelModule } from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {ContextMenuModule} from 'primeng/contextmenu';
import {MenuModule} from 'primeng/menu';



const routes : Routes = [
  {path : '' , component : GestionProductosComponent}
]

@NgModule({
  declarations: [GestionProductosComponent],
  imports: [
    SharedModulesModule,
    CommonModule,
    PanelModule,
    TableModule,
    ContextMenuModule,
    MenuModule,
    RouterModule.forChild(routes)
  ]
})
export class GestionProductosRoutingModule { }
