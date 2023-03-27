import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../app.service';
import { FormComponent } from './form.component';
import swal from 'sweetalert2';



@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html'
})
export class AutoresComponent implements OnInit{

  /**Para poder ocupaar los componentes de otro es necesario  */
  @ViewChild(FormComponent) formComponent!: FormComponent;

  nombreB: string = "";
  nombreA :string="";
  apellidoA:string="";
  nombreM :string= "";
  apellidoM : string = "";
  pnAlta : boolean=false;
  pnModificar : boolean=false;
  pnBuscar: boolean = true;
  waitResponse:boolean=false;
  webToken : any; 
  spinnerLoad : boolean = false;
  listaAutores : any[] = [];
  reg : any = null;
  idx :number =0;

  constructor(
    private authService : AuthService,
    private router : Router,
    private activateRoute : ActivatedRoute,
    ){ }


  ngOnInit(): void {
    this.webToken = sessionStorage.getItem("tokenB");
    if(this.webToken === ""|| this.webToken === null){
      this.router.navigate(['login'])
    }
    this.onBuscar();
    
  }

  //funcion para obtener una lista de autores
  onBuscar() : void{
    this.listaAutores = [];
    let p = new HttpParams();
    p = p.append('nombreAutor',this.nombreB.trim());
    this.authService.procesaOperacionGet('/api/autores',this.webToken,p).subscribe({
      next:(data:any)=>{
        if(data.status==200){
          this.listaAutores = data.body;
          console.log(this.listaAutores)
        }

      },
      error:(err:HttpErrorResponse)=>{

      }
    });
  }


  //Función para llamar form de crear
  onNuevo():void{
    this.nombreA="";
    this.apellidoA="";
    $("#buscar").fadeOut(()=>{
      this.pnBuscar=false;
      this.pnAlta = true
    });
  }
  //Funcion para llamar form/panel modificar
  onEditar(reg:any,indice:number) : void {
    this.nombreM=reg.nombre;
    this.apellidoM=reg.apellido;
    this.reg = reg;
    this.idx=indice;
    $("#buscar").fadeOut(()=>{
      this.pnBuscar=false;
      this.pnModificar = true;
    });
  }
//Funcion para guardar un registro autor
  onGuardar():void{
    //this.formComponent.nombre
    this.nombreA = this.formComponent.nombre.trim();
    this.apellidoA = this.formComponent.apellido.trim();
    if(this.nombreA == "" || this.apellidoA == ""){
      swal.fire('Campos obligatorios:','Nombre y Apellido','error');
    }else{
      this.waitResponse=true;
      $("#txtCrear").fadeOut(()=>{
        this.spinnerLoad = true
        $(".spinnerB").fadeIn();
      })
     
      let body : {nombre:string,apellido:string} = {nombre:'',apellido:''}
      body.nombre =this.nombreA.trim();
      body.apellido = this.apellidoA.trim();
      this.authService.procesaOperacionPost('/api/autores',this.webToken,JSON.stringify(body)).subscribe({
        next:(res:any)=>{
          if(res.status == 201){
            swal.fire('Nuevo registro', `Autor creado con éxito ${res.body.nombre}`,'success')
            setTimeout(() => {
              this.waitResponse=false;
              $(".spinnerB").fadeOut(()=>{
                $("#txtCrear").fadeIn()
                this.spinnerLoad = false
              
              })
              this.listaAutores.push(res.body)
            }, 1000);
          }
        },
        error:(err:HttpErrorResponse)=>{
          setTimeout(() => {
            this.waitResponse=false;
            $(".spinnerB").fadeOut(()=>{
              $("#txtCrear").fadeIn()
              this.spinnerLoad = false
            })
          }, 1000);
          swal.fire('Error:', this.authService.msgDecripcion,'error');
        }
      })
    }
  }
  //Funcion para modificar registro Autor
  onModificar():void{
    this.nombreM = this.formComponent.nombre;
    this.apellidoM = this.formComponent.apellido;
    if(this.nombreM == "" || this.apellidoM == ""){
      swal.fire('Campos obligatorios:','Nombre y Apellido','error');
      return;
    }

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Confirmación',
      text: `Esta seguro de modificar este registro?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, modificar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        let body : {nombre:string,apellido:string} = {nombre:'',apellido:''}
        body.nombre =this.nombreM.trim();
        body.apellido = this.apellidoM.trim();
        this.authService.procesaOperacionPut('/api/autores/'+this.reg.id,this.webToken,JSON.stringify(body)).subscribe({
            next:(response : any) =>{
              if(response.status == 201){
                this.listaAutores[this.idx] = response.body;
                swalWithBootstrapButtons.fire(
                  'Modificado!',
                  'El registro seleccionado ha sido guardado',
                  'success'
                )
               this.onReset("modificar"); 
              }
            },
            error:(err:HttpErrorResponse)=>{
              swal.fire('Error en la operación: ',this.authService.msgDecripcion,'error');
            }
          }
        )
      } 
    })
    
  }
  //Función para eliminar registros de la tabla
  onEliminar(reg:any, id:number) : void{

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `Seguro que desea eliminar el autor`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.authService.procesaOperacionDelete('/api/autores/'+reg.id,this.webToken,'').subscribe({
            next:(response : any) =>{
              if(response.status == 204){
                this.listaAutores.splice(id,1);
                swalWithBootstrapButtons.fire(
                  'Eliminado!',
                  'El registro seleccionado ha sido borrado',
                  'success'
                )
              }
            },
            error:(err:HttpErrorResponse)=>{
              swal.fire('Error en la operación: ',this.authService.msgDecripcion,'error');
            }
          }
        )
      } 
    })
  }
  //Función para reset los panel a origen
  onReset(panel:String):void{
    $("#"+panel).fadeOut(()=>{
      this.pnAlta= false;
      this.pnModificar= false;
      this.pnBuscar = true;
    })
  }




}
