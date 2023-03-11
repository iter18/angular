import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../app.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  titulo : string = "Alta de clientes";
  webToken : any; 

  cliente : any = {};


  constructor(private clienteServie : ClienteService,
    private router : Router,
    private activateRoute : ActivatedRoute,
    private authService : AuthService
    ){ }

  ngOnInit() {
    this.webToken = sessionStorage.getItem("tokenB");
    if(this.webToken === ""|| this.webToken === null){
      this.router.navigate(['login'])
    }
    this.cargarCliente()
  }

  cargarCliente() : void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.authService.procesaOperacionGet("/api/clientes/"+id,this.webToken,'').subscribe((res : any ) => {
              
            this.cliente = res.body.reg;
          })
      }
    })
  }

  /* Forma de hacerlo con Service Cliente y con clase Cliente
  public guardar() : void{

    console.log("Método Llamado");
    this.clienteServie.crear(this.cliente).subscribe(
      (res : any) => {
       
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente',`${res.mensaje} ${res.reg.nombre}`,'success' )
      }
    )
  }*/

  guardar() : void {

    let body :any=[];
    body = this.cliente;
    this.authService.procesaOperacionPost('/api/clientes',this.webToken,JSON.stringify(body)).subscribe((res:any)=>{
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente', `${res.body.mensaje} ${res.body.nombre}`,'success')
    });
  } 

  modificar() : void{

    /** Forma 1 de hacerlo por destructuración de datos */
    /*let body : {
                nombre : string,
                apellido : string,
                email : string
              } = {
                nombre : '',
                apellido : '',
                email : ''
              }
              body.nombre = this.cliente.nombre.trim();
              body.apellido = this.cliente.apellido.trim();
              body.email = this.cliente.email.trim();*/
    /** Forma de hacerlo pasando un objeto completo, siempre cuidaando que los nombres de los atributos sean igual que la entidad o DTO */
    
    let body : any = [];
    body = this.cliente;
    this.authService.procesaOperacionPut("/api/clientes/"+this.cliente.id,this.webToken,JSON.stringify(body)).subscribe(res => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Acutalizado', `${res.body.mensaje}`, 'success')
    })
  }




}
