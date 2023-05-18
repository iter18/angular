/**
 * Cada que se crea un componente hay que registrarlos aquí, pasos:
 *  1.- Se importa el coponente creado 
 *  2.- Se registra el componente importado en declarations, despues de AppCoponent
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
//import { DirectivaComponent } from './directiva/directiva.component';
//import { ClientesComponent } from './clientes/clientes.component';
import { RouterModule,Routes } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
//import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ContextMenuModule} from 'primeng/contextmenu'
import { MenuModule } from 'primeng/menu';
//import { LibroComponent } from './libro/libro.component';
//import { AutoresComponent } from './autores/autores.component';
//import { JwtInterceptor } from './jwt-interceptor';


/**
 * Se declaran las rutas para navegar en este archivo y algunos elementos que lo componen son los sigueintes:
 * 
 * path:"Nombre con el que se accedera por url en el navegador"
 * component: "Nombre del componente al que hará referencia "
 * redirectTo: "A donde queremos que redirija cuando ingresen a cierta url"
 * pathMatch : "full" <-el pathMatch en conbinación con el full indica que se cargara el contenido de manera compleata 
 * 
 * SE COMENTA POR QUE SE USA APP-ROUTING.MODULE PARA QUE SEA DE MANERA PERESOSA Y CARGUE LA RUTA CUANDO SEA LLAMADA Y NO DESDE INICIO
 */

/*const routes : Routes = [
  //Esta primera ruta es para indicar que cuando no se coloque nada en la url el home sera /clientes
  {
    path : '',
    redirectTo : '/login',
    pathMatch : 'full'
  },
 {
    path : 'directivas',
    component : DirectivaComponent
  },
  {
    path : 'clientes',
    component : ClientesComponent
  },
  {
    path : 'clientes/form',
    component : FormComponent
  },
  {
    path : 'clientes/form/:id',
    component : FormComponent
  },
  {
    path : 'login',
    component : LoginComponent
  }
];*/


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    //DirectivaComponent,
    //ClientesComponent,
    //FormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //Libreria para permitir peticiones Http
    HttpClientModule,
    ContextMenuModule,
    MenuModule,
    //Libreria para trabajar con formularios
    FormsModule,
    //registramos las rutas
    //Rutas dinamicas
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
