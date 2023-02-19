/**
 * Clase service para trabajar con datos para logica del negocio con peticiones rest, etc.
 */
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import {of, Observable, map,catchError,throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


//Apartir de la versión 7 en adelante ya lo inyecta en el app.module.ts por debajo y por eso tiene el providedIn
@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private urlEndPoint : string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http:HttpClient, private router : Router) { }

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
    return this.http.post<Cliente>(this.urlEndPoint,cliente,{headers : this.httpHeaders}).pipe(
      catchError(e => {
        swal.fire('Error al crear el cliente',e.error.mensaje,'error');
        return throwError(() => e);
      })
    )
  }

  getCliente(id: any) : Observable<Cliente>{
      
      return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e =>{
          this.router.navigate(['/clientes']); 
          swal.fire('Error al buscar el registro', e.error.mensaje,'error');
          return throwError(() => e);
        })
      )
  }
  //Se declara any para que la respuesta del observable sea más generico y en el método de envio web putd no se necesita especificar el tipo de objeto
  update(cliente : Cliente) : Observable<any>{

    return this.http.put(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers : this.httpHeaders}).pipe(
      catchError(e => {
        swal.fire('Error al modificar',e.error.mensaje,'error');
        return throwError(() => e);
      })
    )
  }

  delete(id : any) : Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers : this.httpHeaders}).pipe(
      catchError(e => {
        swal.fire('Error al eliminar',e.error.mensaje,'error');
        return throwError(() => e);
      })
    )
  }
}
