import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../app.service';
import { FormComponent } from './form.component';



@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html'
})
export class AutoresComponent implements OnInit{

  /**Para poder ocupaar los componentes de otro es necesario  */
  @ViewChild(FormComponent) formComponent!: FormComponent;

  nombreA :string="";
  apellidoA:string="";
  nombreM :string= "";
  pnAlta : boolean=false;
  pnBuscar: boolean = true;
  waitResponse:boolean=false;
  webToken : any; 
  spinnerLoad : boolean = false;
  listaAutores : any[] = [];

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
    this.authService.procesaOperacionGet('/api/autores',this.webToken,'').subscribe({
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
//Funcion para guardar un registro autor
  onGuardar():void{
    //this.formComponent.nombre
    console.log("NOMBRE:{}",this.formComponent.nombre)
    this.waitResponse=true;
    $("#txtCrear").fadeOut(()=>{
      this.spinnerLoad = true
      $(".spinnerB").fadeIn()
    })
   
    let body : {nombre:string,apellido:string} = {nombre:'',apellido:''}
    body.nombre = this.formComponent.nombre.trim();
    body.apellido = this.formComponent.apellido.trim();
    this.authService.procesaOperacionPost('/api/autores',this.webToken,JSON.stringify(body)).subscribe({
      next:(res:any)=>{
        if(res.status == 201){
          setTimeout(() => {
            this.waitResponse=false;
            $(".spinnerB").fadeOut(()=>{
              $("#txtCrear").fadeIn()
              this.spinnerLoad = false
            })
          }, 1000);
        }
        this.listaAutores.push(res.body)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }
  //Función para reset los panel a origen
  onReset(panel:String):void{
    $("#"+panel).fadeOut(()=>{
      this.pnAlta= false;
      this.pnBuscar = true;
    })
  }




}
