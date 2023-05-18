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

  constructor(private router : Router, private authService : AuthService){}




  ngOnInit(): void {
    this.webToken = sessionStorage.getItem("tokenB");
    if(this.webToken === ""|| this.webToken === null){
      this.router.navigate(['login'])
    }


    this.formulario = "formBuscarRegistroInventario";

    this.menuItems = [
      {
        label : 'Opcion 1',
        command:() => null
      },
      {
        label : 'Opcion 2',
        command : () => null
      }
    ];

    this.opciones = [
      {
        label : 'Nuevo',
        icon : 'fa fa-plus',
        command : () =>{
          console.log("first");
        }
      },
      {
        label : 'Editar',
        icon : 'fa fa-pencil',
        command : () =>{
          console.log("second");
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

  showContextMenu(event: MouseEvent) {
    event.preventDefault();
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

  toogleMenu(menu : any ,event : any,rowData : any ,idx : number) : void {
    this.idx = idx;
    this.reg = rowData;
    menu.toggle(event);
  }

}
