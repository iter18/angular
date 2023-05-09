import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../app.service';
import swal from 'sweetalert2';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormulariosComponent } from '../formularios/formularios.component';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html'
})
export class LibroComponent implements OnInit{
  @ViewChild(FormulariosComponent) formulariosComponent!: FormulariosComponent;
  

  pnAlta : boolean=false;
  pnModificar : boolean=false;
  pnBuscar: boolean = true;
  waitResponse:boolean=false;
  webToken : any; 
  spinnerLoad : boolean = false;
  listaLibros : any[] = [];
  modalTemplate: string = "";
  idx :number =0;
  reg : any;
  comboAutores:any[] = [];
  formulario : string ="";

  /**Variables para alta de libro */
  isbnA:string="";
  tituloA:string="";
  categoriaA:string="";
  editorialA:string="";
  imagenA: File = new File([], '');
  src : string = "";
  autorA:Number = 0;
  /**Variables para modificar registro de libro */
  id : number = 0;
  isbnM:string="";
  tituloM:string="";
  categoriaM:string="";
  editorialM:string="";
  imagenM: File = new File([], '');
  srcM : string = "";
  autorM:Number = 0;
  /**Variables para ver detalle del libro*/
  isbnCo:string="";
  tituloCo:string="";
  categoriaCo:string="";
  editorialCo:string="";
  autorName: string = "";
  /** Variables para consulta de libros con filtros */
  isbnB : string = "";
  tituloB : string = "";
  autorB : Number =0;




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
    this.formulario = "formBuscarLibro"; 
    this.llenaComboAutores();
    
  }
  ngAfterViewInit(){
    this.onBuscar();
  }
 
  

  //Función para buscar
  onBuscar() : any {
    this.tituloB = this.formulariosComponent.tituloB;
    this.autorB = this.formulariosComponent.autorB;
    this.isbnB = this.formulariosComponent.isbnB; 
    this.listaLibros = [];
    let p = new HttpParams();
    //validaciones para que se tome en cuenta en caso de que que sean diferentes de null o empty
    if(this.tituloB!=""){
      p = p.append('tituloLibro',this.tituloB.trim());
    }
    if(this.autorB!=0){
      p = p.append('autorLibro',this.autorB.toString());
    }
    if(this.isbnB!=""){
      p = p.append('isbnLibro',this.isbnB);
    }

    
    this.authService.procesaOperacionGet('/api/libros/',this.webToken,p).subscribe({
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
      
      $("#buscar").fadeOut(()=>{
        this.pnBuscar=false;
        this.pnAlta = true
        this.formulario = "formGestionLibros";
      });
    }

    //funcion para llenar combos
    llenaComboAutores() : void{
      this.authService.procesaOperacionGet('/api/autores/combo',this.webToken,'').subscribe({
        next: (data:any)=>{
          if(data.status==200){
            this.comboAutores = data.body;
          }
        },
        error:(err:HttpErrorResponse)=>{
          swal.fire('Error:', this.authService.msgDecripcion,'error');
        }
      });
    }

  //Funcion para llamar form/panel modificar
  onEditar(reg:any,indice:number) : void {
  this.id = reg.libro.id;
  this.isbnM =reg.libro.isbn;
  this.tituloM = reg.libro.titulo;
  this.categoriaM =reg.libro.categoria;
  this.editorialM =reg.libro.editorial;
  this.autorM = reg.autor.id;
  this.reg = reg;
  this.idx=indice;
    $("#buscar").fadeOut(()=>{
      this.pnAlta=false;
      this.pnBuscar=false;
      this.pnModificar = true;
      this.formulario = "formGestionLibros";
    });
  }


    //Funcion para guardar un registro
  onGuardar():void{
    //this.formComponent.nombre
    this.isbnA=this.formulariosComponent.isbn;
    this.tituloA=this.formulariosComponent.titulo;
    this.categoriaA=this.formulariosComponent.categoria;
    this.editorialA=this.formulariosComponent.editorial;
    this.imagenA = this.formulariosComponent.imagen;
    this.autorA = this.formulariosComponent.autorSelected;
    if(this.isbnA == "" || this.tituloA == "" || this.categoriaA == ""){
      swal.fire('Campos obligatorios:','Isbn,Titulo y Categoria','error');
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
     formData.append('autor',this.autorA.toString());
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

    //Funcion para modificar registro Libro
    onModificar():void{
      this.id = this.formulariosComponent.id;
      this.isbnM=this.formulariosComponent.isbn;
      this.tituloM=this.formulariosComponent.titulo;
      this.categoriaM=this.formulariosComponent.categoria;
      this.editorialM=this.formulariosComponent.editorial;
      this.imagenM = this.formulariosComponent.imagen;
      this.autorM = this.formulariosComponent.autorSelected;
      if(this.isbnM == "" || this.tituloM == "" || this.categoriaM == ""){
        swal.fire('Campos obligatorios:','Isbn,Titulo y Categoria','error');
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
          //Creamos formulario para procesar datos adjuntos con form
          const formData = new FormData();
          formData.append('idLibro',this.id.toString());
          formData.append('isbn',this.isbnM);
          formData.append('titulo',this.tituloM);
          formData.append('categoria',this.categoriaM);
          formData.append('editorial',this.editorialM);
          formData.append('autor',this.autorM.toString());
          formData.append('imagen',this.imagenM);
          this.authService.procesaOperacionMultipartPut('/api/libros/'+this.reg.id,this.webToken,'',formData).subscribe({
              next:(response : any) =>{
                if(response.status == 201){
                  this.listaLibros[this.idx] = response.body;
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
      text: `Seguro que desea eliminar el registro`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.authService.procesaOperacionDelete('/api/libros/'+reg.id,this.webToken,'').subscribe({
            next:(response : any) =>{
              if(response.status == 204){
                this.listaLibros.splice(id,1);
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
        this.formulario = "formBuscarLibro";
      })
    }

    

    showImageModal(reg:any) {
  
      setTimeout(() => {
        $('#myModal').modal('show');
      }, 300);
      
      this.isbnCo = reg.libro.isbn;
      this.tituloCo = reg.libro.titulo;
      this.categoriaCo = reg.libro.categoria;
      this.editorialCo = reg.libro.editorial;
      this.src = "./assets/uplodas/"+reg.libro.rutaFoto;
      this.autorName = reg.autor.nombre+" "+reg.autor.apellido;
      this.modalTemplate = 'image';
    }
   

}
