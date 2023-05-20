import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/app.service';
import { FormulariosComponent } from 'src/app/formularios/formularios.component';
import swal from 'sweetalert2';


@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.component.html'
})
export class AltaProductosComponent implements OnInit {
  @ViewChild(FormulariosComponent) formulariosComponent!: FormulariosComponent;

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
  waitResponse : boolean = false;
  listaInventario : any[] = [];
  idLibro : number = 0;
  titulo : string = "";
  isbnB : string = "";
  tituloB : string = "";

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

  ngAfterViewInit(){
    this.onBuscar();
  }



  //Función para mostrar panel de alta los productos en inventario
  onNuevo() : void{
     
      $("#buscar").fadeOut(()=>{
        this.pnBuscar = false;
        this.pnAlta = true;
        this.formulario = "formAltaInventario";
      });
  }

  //funcion para buscar en inventarios
  onBuscar(){
      this.isbnB = this.formulariosComponent.isbnB;
      this.tituloB = this.formulariosComponent.tituloB;
      this.listaInventario = [];
      let p = new HttpParams();
      if(this.isbn != ""){
        p = p.append('isbnLibro',this.isbn.trim());
      }
      if(this.titulo != ""){
        p = p.append('tituloLibro',this.titulo.trim());
      }

      this.authService.procesaOperacionGet('/api/inventarios/buscarProductos',this.webToken,p).subscribe({
        next : (data : any) =>{
          if(data.status == 200){
              this.listaInventario = data.body;
          }
        },
        error : (error : HttpErrorResponse) =>{
          swal.fire('Error:',this.authService.msgDecripcion,'error');
        }
      });
  }

  //funcion para registrar producto en inventario
  onGuardar() : void {
    this.stock = this.formulariosComponent.stock;
    this.minimo = this.formulariosComponent.minimo;
    this.precio = this.formulariosComponent.precio;
    this.idLibro = this.formulariosComponent.id;
    if(this.stock == null || this.stock<=0 ||
      this.minimo == null || this.minimo<=0 ||
      this.precio == null || this.precio<=0){
        swal.fire('Campos obligatorios:','Sotck,minimo y precio','error');
        return;
    }

    this.waitResponse = true;
    $("#txtBtn").fadeOut(()=>{
      this.spinnerLoad=true;
      $('.spinner').fadeIn();
    });

    let body :{
                idLibro : number, 
                idMovimiento : number,
                stock:number, 
                minimo:number, 
                precio: number} = {
                  idLibro : 0,
                  idMovimiento : 0,
                  stock : 0,
                  minimo : 0,
                  precio : 0.0}
    body.idLibro = this.idLibro;
    body.idMovimiento = 1;
    body.stock = this.stock;
    body.minimo = this.minimo;
    body.precio = this.precio;

    this.authService.procesaOperacionPost('/api/inventarios/altaProducto',this.webToken,body).subscribe({
      next : (response : any) => {
        if(response.status == 201){
          swal.fire('Registro éxitoso!','El producto fue dado de alta en el inventario','success');
          setTimeout(()=>{
            $('.spinner').fadeOut(() => {
              $('#txtBtn').fadeIn();
              this.spinnerLoad = false;
              this.waitResponse = false;
            });
            this.listaInventario.push(response.body);
          },1000);
        }
      },
      error : (error : HttpErrorResponse) => {
        setTimeout(() => {
          this.waitResponse=false;
          $(".spinner").fadeOut(()=>{
            $("#txtBtn").fadeIn();
            this.spinnerLoad = false;
            this.waitResponse = false;
          });
        }, 1000);
        swal.fire('Error:', this.authService.msgDecripcion,'error');
      }
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
        this.idLibro = reg.body.libro.id;
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
