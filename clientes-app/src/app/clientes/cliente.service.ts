/**
 * Clase service para trabajar con datos para logica del negocio con peticiones rest, etc.
 */
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';

//Apartir de la versión 7 en adelante ya lo inyecta en el app.module.ts por debajo y por eso tiene el providedIn
@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  constructor() { }

  getClientes() : Cliente[]{
    return CLIENTES;
  }
}
