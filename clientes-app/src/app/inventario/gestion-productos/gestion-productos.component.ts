import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/app.service';
import { FormulariosComponent } from 'src/app/formularios/formularios.component';
import swal from 'sweetalert2';
import { MenuItem,PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html'
})
export class GestionProductosComponent implements OnInit {

  @ViewChild(FormulariosComponent) formulariosComponent!: FormulariosComponent;

  webToken : any;
  pnBuscar : boolean = true;
  formulario : string = "";
  isbn : string = "";
  titulo : string = "";
  listaInventario : any[] = [];
  menuItems : MenuItem[] = [];
  opciones : MenuItem[] =[];
  idx : number = 0;
  reg : any;
  selectedRow : any;
  modalTemplate : string = "";
  inputsModal : any[] = [];
  src : string = "";
  idInventario : number = 0;
  typeForm : string = "";

  constructor(private router : Router, private authService : AuthService){}




  ngOnInit(): void {
    this.webToken = sessionStorage.getItem("tokenB");
    if(this.webToken === ""|| this.webToken === null){
      this.router.navigate(['login'])
    }


    this.formulario = "formBuscarRegistroInventario";

    this.menuItems = [
      {
        label : 'Opcion 1'
     
      },
      {
        label : 'Opcion 2'
     
      }
    ];

    this.opciones = [

      {
        label : 'Editar',
        icon : 'fa fa-pencil',
        command : () =>{
          this.onEditarModal();
        }
      },
      {
        label : 'Historico',
        icon : 'fa fa-list',
        command : () =>{
          console.log("second");
        }
      },
      {
        label : 'Reorden',
        icon : 'fa-solid fa-boxes-stacked',
        command : () =>{
          console.log("second");
        }
      },
      {
        label : 'Eliminar',
        icon : 'fa-regular fa-trash-can',
        command : () =>{
          console.log("second");
        }
      }
    ];
  }

  ngAfterViewInit(){
    this.onBuscar();
  }



  //funcion para buscar en inventarios
  onBuscar(): void {
    this.isbn = this.formulariosComponent.isbnB;
    this.titulo = this.formulariosComponent.tituloB;
    this.listaInventario = [];

    let p = new HttpParams();

    if(this.isbn != ""){
      p = p.append('isbnLibro',this.isbn.trim());
    }
    if(this.titulo != ""){
      p = p.append('tituloLibro',this.titulo.trim());
    }

    this.authService.procesaOperacionGet('/api/inventarios/buscarProductos',this.webToken,p).subscribe({
      next : (data : any) => {
        if(data.status == 200){
          this.listaInventario = data.body;
        }
      },
      error : (error : HttpErrorResponse) => {
        swal.fire('Error:', this.authService.msgDecripcion,'error');
      }
    });
  }

  onModificar(formData: any ) : void{
    console.log("respuesta: "+formData.idInventario);
    console.log("respuesta: "+formData.stock);
    console.log("respuesta: "+formData.minimo);
    console.log("respuesta: "+formData.precio);
    console.log("respuesta: "+formData.isbn);
  }



  //Función para invocar menu de opciones
  toogleMenu(menu : any ,event : any,rowData : any ,idx : number) : void {
    this.idx = idx;
    this.reg = rowData;
    menu.toggle(event);
  }
    //Función para mostrar menu al dar click derecho
    showContextMenu(event: any, rowData : any ,idx : number) {
      this.idx = idx;
      this.reg = rowData;
      event.preventDefault();
    }

    //función para mostrar modal de editar el registro del producto
  onEditarModal() : void{
    
    this.showModal(this.reg,'inputs');
  }

  //función para llamar modalBox
  showModal(reg:any, type:string) : void {

    setTimeout(() => {
            $('#myModal').modal('show');
          }, 300); 
    if(type == "inputs"){
        this.src = './assets/uplodas/'+reg.libro.rutaFoto;
        this.idInventario = reg.id;
        this.typeForm = "formGestionInventario";
        this.modalTemplate = 'inputs';
          this.inputsModal = [
            {
              id :'isbn', 
              label : 'ISBN',
              value : reg.libro.isbn, 
              type : 'text',
              disable : true
            },
            {
              id :'titulo',
              label : 'Titulo',
              value : reg.libro.titulo,
              type : 'text',
              disable : true
            },
            {
              id : 'editorial',
              label : 'EDITORIAL',
              value : reg.libro.editorial,
              type : 'text',
              disable : true
            },
            {
              id : 'stock',
              label : 'STOCK',
              value : reg.stock,
              type : 'text'
            },
            {
              id : 'minimo',
              label : 'MINIMO',
              value : reg.minimo,
              type : 'text'
            },
            {
              id : 'precio',
              label : 'PRECIO',
              value : reg.precio,
              type : 'text'
            }
          ];
    }
  }




}
