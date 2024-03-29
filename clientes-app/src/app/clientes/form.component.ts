import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../app.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  titulo : string = "Alta de clientes";
  webToken : any; 
  isAdmin : boolean = false;
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
    this.isAdmin = this.authService.hasRole("ROLE_ADMIN");
    this.cargarCliente()
  }

  cargarCliente() : void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.authService.procesaOperacionGet("/api/clientes/"+id,this.webToken,'').subscribe((res : any ) => {
             if(res.status == 200){
              this.cliente = res.body;
             } 
             
          },(err:HttpErrorResponse)=>{
            this.router.navigate(['/clientes']); 
            swal.fire('Error en la operación', this.authService.msgDecripcion,'error');
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
    this.authService.procesaOperacionPost('/api/clientes',this.webToken,JSON.stringify(body)).subscribe({
      next:(res:any)=>{
        if(res.status==201){
          this.router.navigate(['/clientes'])
         // swal.fire('Nuevo Cliente', `${res.body.mensaje} ${res.body.reg.nombre}`,'success')
         swal.fire('Nuevo Cliente', `Cliente creado con éxito ${res.body.nombre}`,'success')
        }
      },
      error:(err:HttpErrorResponse)=>{
        this.router.navigate(['/clientes']); 
        swal.fire('Error en la operación: ',this.authService.msgDecripcion,'error');
      }
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
    this.authService.procesaOperacionPut("/api/clientes/"+this.cliente.id,this.webToken,JSON.stringify(body)).subscribe({
      next:(res:any) =>{
        if(res.status == 201){
        
          this.router.navigate(['/clientes'])
          //swal.fire('Cliente Acutalizado', `${res.body.mensaje}`, 'success')
          swal.fire('Cliente Acutalizado', 'Registro modificado éxitosamente', 'success')
        }
      },
      error:(err:HttpErrorResponse)=>{
        this.router.navigate(['/clientes']); 
        swal.fire('Error en la operación: ',this.authService.msgDecripcion,'error');
    
      } 
    })
  }




}
