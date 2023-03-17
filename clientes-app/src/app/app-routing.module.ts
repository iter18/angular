import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login.component';

//Definicipon de rutas de manera perezosa, es decir sólo se cargarán cuando se necesiten y no cuando cargue toda la app
const routes: Routes =[
    {path : '',redirectTo : '/login',pathMatch : 'full'},
    {path : 'login',component : LoginComponent},
    {path : 'clientes',loadChildren:()=> import('./clientes/clientes-routing.module').then(c=>c.ClientesRoutingModule)}

];


@NgModule({
    providers:[],
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {
}
