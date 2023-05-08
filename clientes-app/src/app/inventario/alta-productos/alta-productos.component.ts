import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/app.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.component.html'
})
export class AltaProductosComponent implements OnInit {

  pnBuscar:boolean = true;
  formulario: string = "";
  pnAlta : boolean = false;
  spinnerLoad : boolean = false;
  webToken : any;
  comboLibros : any[] = [];
  isbn : string ="";
  editorial : string = "";
  stock : number = 0;
  precio : number = 0.0;
  autor : string = "";
  minimo : number = 0;
  src :string = "";

  constructor(private authService:AuthService,
              private router : Router){}


  ngOnInit(): void {
    this.webToken = sessionStorage.getItem("tokenB");
    if(this.webToken === "" || this.webToken === null){
        this.router.navigate(['login']);
    }

    this.formulario = "formBuscarRegistroInventario";
    this.llenaComboLibros();
  
  }



  //Función para mostrar panel de alta los productos en inventario
  onNuevo() : void{
     
      $("#buscar").fadeOut(()=>{
        this.pnBuscar = false;
        this.pnAlta = true;
        this.formulario = "formAltaInventario";
      });
  }

  //Función para resetear panels a origen
  onReset(panel:string) : void{
   
    $("#"+panel).fadeOut(()=>{
      this.pnAlta = false;
      this.pnBuscar = true; 
      this.formulario = "formBuscarRegistroInventario";
    });
  }

  //función para llenar comboLibros
  llenaComboLibros() : void{

    this.authService.procesaOperacionGet('/api/libros/combo',this.webToken,'').subscribe({
      next: (data : any) =>{
        this.comboLibros = data.body;
      },
      error : (error : HttpErrorResponse) => {
        swal.fire('Error:',this.authService.msgDecripcion,'error');
      }
    })
    
  }
  //función para ver información del producto seleccionado
  onDetalleLibro(id:any) : void{
    
    this.authService.procesaOperacionGet('/api/libros/'+id,this.webToken,'').subscribe({
      next : (reg : any) => {
        this.isbn = reg.body.libro.isbn;
        this.autor = reg.body.autor.nombre+" "+reg.body.autor.apellido;
        this.editorial =reg.body.libro.editorial;
        this.src ="./assets/uplodas/"+reg.body.libro.rutaFoto;
      },
      error : (error : HttpErrorResponse) => {
        swal.fire('Error:',this.authService.msgDecripcion,'error');
      }
    });
  }

}
