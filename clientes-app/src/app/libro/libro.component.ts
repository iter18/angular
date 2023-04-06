import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../app.service';
import { FormComponent } from './form.component';
import swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html'
})
export class LibroComponent implements OnInit{
  @ViewChild(FormComponent) formComponent!: FormComponent;

  pnAlta : boolean=false;
  pnModificar : boolean=false;
  pnBuscar: boolean = true;
  waitResponse:boolean=false;
  webToken : any; 
  spinnerLoad : boolean = false;
  listaLibros : any[] = [];
  nombreB : string = "";
  modalTemplate: string = "";

  /**Variables para alta de libro */
  isbnA:string="";
  tituloA:string="";
  categoriaA:string="";
  editorialA:string="";
  imagenA: File = new File([], '');
  src : string = "";
  comboAutores:any[] = [];
  autorA:Number=0;
  /**Variables para consulta de libro para detalle */
  isbnCo:string="";
  tituloCo:string="";
  categoriaCo:string="";
  editorialCo:string="";


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

  //Función para buscar
  onBuscar() : any {

    this.listaLibros = [];

    this.authService.procesaOperacionGet('/api/libros/',this.webToken,'').subscribe({
      next: (data:any)=>{
        if(data.status==200){
          this.listaLibros = data.body;
        }
      },
      error:(err:HttpErrorResponse)=>{
        swal.fire('Error:', this.authService.msgDecripcion,'error');
      }
    })

  }

    //Función para llamar form de crear
    onNuevo():void{
      this.isbnA="";
      this.tituloA="";
      this.categoriaA="";
      this.editorialA="";
      this.imagenA;
      this.comboAutores =[{code: 1, valor:"arturo"},{code: 2, valor:"roman"}]

      $("#buscar").fadeOut(()=>{
        this.pnBuscar=false;
        this.pnAlta = true
      });
    }




    //Funcion para guardar un registro
  onGuardar():void{
    //this.formComponent.nombre
    this.isbnA=this.formComponent.isbn;
    this.tituloA=this.formComponent.titulo;
    this.categoriaA=this.formComponent.categoria;
    this.editorialA=this.formComponent.editorial;
    this.imagenA = this.formComponent.imagen;
    this.autorA = this.formComponent.autorSelected;
    console.log("Autor Seleccionado: "+this.autorA)
    if(this.isbnA == "" || this.tituloA == ""){
      swal.fire('Campos obligatorios:','Nombre y Apellido','error');
      return;
    }
      this.waitResponse=true;
      $("#txtCrear").fadeOut(()=>{
        this.spinnerLoad = true
        $(".spinnerB").fadeIn();
      })
     //Creamos formulario para procesar datos adjuntos con form
     const formData = new FormData();
     formData.append('isbn',this.isbnA);
     formData.append('titulo',this.tituloA);
     formData.append('categoria',this.categoriaA);
     formData.append('editorial',this.editorialA);
     formData.append('imagen',this.imagenA);

      this.authService.procesaOperacionMultipart('/api/libros',this.webToken,'',formData).subscribe({
        next:(res:any)=>{
          if(res.status == 201){
            swal.fire('Nuevo registro', `registro exitoso`,'success')
            setTimeout(() => {
              this.waitResponse=false;
              $(".spinnerB").fadeOut(()=>{
                $("#txtCrear").fadeIn()
                this.spinnerLoad = false
              
              })
              this.listaLibros.push(res.body)
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


    //Función para reset los panel a origen
    onReset(panel:String):void{
      $("#"+panel).fadeOut(()=>{
        this.pnAlta= false;
        this.pnModificar= false;
        this.pnBuscar = true;
      })
    }

    

    showImageModal(reg:any) {
      this.isbnCo = reg.isbn;
      this.tituloCo = reg.titulo;
      this.categoriaCo = reg.categoria;
      this.editorialCo = reg.editorial;
      $('#myModal').modal('show');
      this.src = "./assets/uplodas/"+reg.rutaFoto;

      this.modalTemplate = 'image';
    }
   

}
