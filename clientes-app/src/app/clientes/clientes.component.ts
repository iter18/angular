import { Component,OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { formatDate,DatePipe } from '@angular/common';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit{

  clientes : Cliente[]=[];
    constructor(private clientesService : ClienteService){

    }

    ngOnInit(){

  
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
      );
    }

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
    }
}
