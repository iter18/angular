/**
 *  REGLAS PARA CREAR UN COMPONENTE:
 * 
 *      -La palabra export es un modificar de clase y se coloca para que se pueda registrar como componente en angular y pueda ser usado en otro componente 
 *      -Como nomenclatura siempre deben ser mayusculas las clases y cuando son palabras compuestas Mayucula las iniciales y acompañada al final 
 *          del termino Component: EJ-> HeaderComponent
 *      -Las clases component siempre deben tener la anotación al incio de  @Component y dentro de ella los atributos; Algunos atributos que se puede colocar son los siguientes:
 *          --selector:nombre con el que queramos que sea identificado en otros componentes
 *          --template:`` con comillas inversas y dentro de ella se puede colocar html simple a lo máximo 5 lineas, es una recomendación.
 *          --templateUrl:'' dentro de las comillas simple va el nombre del archivo html que queremos usar, nombre completo con ext y siempre con ./
 *          --styleUrls:[''] dentro de las comillas o corchetes colocamos el o los nombres completos con ext. de los archivos css que se usaran, separado por comas  y siempre con ./
 *              
 * */
import { Component } from "@angular/core";



@Component({
    selector:'app-header',
    /* Esta es una forma de agregar html 
    template:`
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">{{title}}</a>
                <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Dropdown
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link disabled">Disabled</a>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
        </nav>
        `*/
        templateUrl: './header.component.html'
})
export class HeaderComponent{

   title: string = `App Angular`; 

}