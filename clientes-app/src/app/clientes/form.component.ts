import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  titulo : string = "Alta de clientes";
  aNombre : string = "";
  aApellido : string = "";
  aEmail : string = "";

  cliente : Cliente = new Cliente();


  constructor(private clienteServie : ClienteService,
    private router : Router,
    private activateRoute : ActivatedRoute
    ){ }

  ngOnInit() {
    this.cargarCliente()
  }

  cargarCliente() : void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteServie.getCliente(id).subscribe((res : any ) => {
              
            this.cliente = res.reg;
          })
      }
    })
  }

  public guardar() : void{

    console.log("Método Llamado");
    this.clienteServie.crear(this.cliente).subscribe(
      cliente => {
       
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente',`Cliente ${cliente.nombre} creado correctamente`,'success' )
      }
    )
  }

  modificar() : void{
    this.clienteServie.update(this.cliente).subscribe(cliente => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Acutalizado', `Cliente ${cliente.nombre} actualizado con éxito!`, 'success')
    })
  }




}
