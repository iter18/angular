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
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RouterModule,Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';

/**
 * Se declaran las rutas para navegar en este archivo y algunos elementos que lo componen son los sigueintes:
 * 
 * path:"Nombre con el que se accedera por url en el navegador"
 * component: "Nombre del componente al que hará referencia "
 * redirectTo: "A donde queremos que redirija cuando ingresen a cierta url"
 * pathMatch : "full" <-el pathMatch en conbinación con el full indica que se cargara el contenido de manera compleata 
 */

const routes : Routes = [
  //Esta primera ruta es para indicar que cuando no se coloque nada en la url el home sera /clientes
  {
    path : '',
    redirectTo : '/clientes',
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
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    //Libreria para permitir peticiones Http
    HttpClientModule,
    //Libreria para trabajar con formularios
    FormsModule,
    //registramos las rutas
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
