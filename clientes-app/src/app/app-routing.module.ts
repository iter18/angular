import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login.component';

//Definicipon de rutas de manera perezosa, es decir sólo se cargarán cuando se necesiten y no cuando cargue toda la app
const routes: Routes =[
    {path : '',redirectTo : '/login',pathMatch : 'full'},
    {path : 'login',component : LoginComponent},
    {path : 'clientes',loadChildren:()=> import('./clientes/clientes-routing.module').then(c=>c.ClientesRoutingModule)},
    {path : 'autores',loadChildren:()=> import('./autores/autores-routing.module').then(a=>a.AutoresRoutingModule)},
    {path : 'libros', loadChildren:()=> import('./libro/libros-routing.module').then(l=>l.LibrosRoutingModule)},
    {path : 'alta-Producto', loadChildren:()=> import('./inventario/alta-productos/alta-productos-routing.module').then(aP=>aP.AltaProductosRoutingModule)}
]; 


@NgModule({
    providers:[],
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {
}
