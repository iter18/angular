/**
 * Clase service para trabajar con datos para logica del negocio con peticiones rest, etc.
 */
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import {of, Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


//Apartir de la versión 7 en adelante ya lo inyecta en el app.module.ts por debajo y por eso tiene el providedIn
@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private urlEndPoint : string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http:HttpClient) { }

   //Forma sincrona es decir esepra a que sea llamado el evento

   /*
    getClientes() : Cliente[]{
      return CLIENTES;
    } 
   */

  /**
   * EL patron Observable consiste en convertir una tarea o proceso en un estado de espera, es decir, genera una subscripción par que los que llamen al método 
   * sean notificados o mejor dicho reciban respuesta si hay algún cambio en el y en tiempo real estas cambien su estado, por eso es reactiva
  */

  getClientes() : Observable<Cliente[]>{
    //Convertimos nuestro flujo a observable (Stream)
    // Se documenta ya que esta es una peticón de un archivo local return of (CLIENTES);

    return this.http.get<Cliente[]>(this.urlEndPoint).pipe(
      map((response) => {
        return response as Cliente[]
      })
    );
  
  }

  crear(cliente : Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint,cliente,{headers : this.httpHeaders})
  }

  getCliente(id: any) : Observable<Cliente>{

      return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
  }

  update(cliente : Cliente) : Observable<Cliente>{

    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers : this.httpHeaders})
  }

  delete(id : any) : Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers : this.httpHeaders})
  }
}
