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
//Funcion
  onGuardar():void{
    //this.formComponent.nombre
    console.log("NOMBRE:{}",this.formComponent.nombre)
    this.waitResponse=true;
    $("#txtCrear").fadeOut(()=>{
      $(".spinnerB").fadeIn()
    })
   
    let body : {nombreAutor:string,apellidoAutor:string} = {nombreAutor:'',apellidoAutor:''}
    body.nombreAutor = this.formComponent.nombre.trim();
    body.apellidoAutor = this.formComponent.apellido.trim();
    this.authService.procesaOperacionPost('/api/autores',this.webToken,JSON.stringify(body)).subscribe({
      next:(res:any)=>{

      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }

  onReset(panel:String):void{
    $("#"+panel).fadeOut(()=>{
      this.pnAlta= false;
      this.pnBuscar = true;
    })
  }




}
