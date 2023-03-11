import { Component,OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { formatDate,DatePipe } from '@angular/common';
import { ClienteService } from './cliente.service';
import { AuthService } from '../app.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit{

 webToken : any;

  clientes : any[]=[];
    constructor(private clientesService : ClienteService,
      private router : Router,
      private authService : AuthService){

    }

    ngOnInit(){
      this.webToken = sessionStorage.getItem("tokenB");

      if(this.webToken === ""|| this.webToken === null){
        this.router.navigate(['login'])
      }
  
      /*Manera de hacerlo con servicio por componente, es decir se crea un service por componente
      this.clientesService.getClientes().subscribe(
        (res : any) => {
          this.clientes = res.data;
          this.clientes.map(cliente => {
            cliente.nombre = cliente.nombre.toUpperCase();
           //Forma de hacerlo con formDate 
          // cliente.createAt = formatDate(cliente.createAt,'dd-MM-yyyy','en-US')
           //let datePipe = new DatePipe('en-US');
           //cliente.createAt = datePipe.transform(cliente.createAt,'dd/MM/yyyy');
            return cliente;
          })
        }
      );*/

      this.authService.procesaOperacionGet('/api/clientes',this.webToken,'').subscribe((res:any) => {
        console.log("res data:"+res.body.data);
        if(res.status==200){
          this.clientes = res.body.data;
          console.log("res data:"+res.data);
        }
      });
    }

    /*Forma de hacerlo con servicio propio y con clase cliente
    eliminar(cliente : Cliente) : void{

      const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Está seguro?',
        text: `Seguro que desea eliminar el cliente ${cliente.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.clientesService.delete(cliente.id).subscribe(
            response => {
              this.clientes = this.clientes.filter(cli => cli !== cliente)
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                'El registro seleccionado ha sido borrado',
                'success'
              )
            }
          )
        } 
      })
    }*/

    eliminar(reg : any) : void{

      const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Está seguro?',
        text: `Seguro que desea eliminar el cliente ${reg.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          /* Para agregar parametros a la peticion
          var params = new HttpParams();
          params = params.append("id",reg.id);*/
          this.authService.procesaOperacionDelete('/api/clientes/'+reg.id,this.webToken,'').subscribe(
            (response : any) => {
              if(response.status == 204){
                this.clientes = this.clientes.filter(cli => cli !== reg)
                swalWithBootstrapButtons.fire(
                  'Eliminado!',
                  'El registro seleccionado ha sido borrado',
                  'success'
                )
              }
            }
          )
        } 
      })
    }
}
