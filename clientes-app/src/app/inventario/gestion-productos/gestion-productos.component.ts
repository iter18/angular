import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/app.service';
import { FormulariosComponent } from 'src/app/formularios/formularios.component';
import swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls : ['./gestion-productos-component.css']
})
export class GestionProductosComponent implements OnInit {

  @ViewChild(FormulariosComponent) formulariosComponen!: FormulariosComponent;

  webToken : any;
  pnBuscar : boolean = true;
  formulario : string = "";
  isbn : string = "";
  isbnB : string = "";
  titulo : string = "";
  tituloB : string = "";
  listaInventario : any[] = [];
  menuItems : MenuItem[] = [];
  opciones : MenuItem[] =[];
  idx : number = 0;
  reg : any;
  selectedRow : any;
  modalTemplate : string = "";
  inputsModal : any[] = [];
  src : string = "";
  srcNuevo : string = "";
  idInventario : number = 0;
  typeForm : string = "";
  pnAlta : boolean = false;
  idLibro : number = 0;
  comboLibros : any[] = [];
  autor : string = "";
  editorial : string = "";
  precioCompra : number = 0.0;
  precioVenta : number = 0.0;
  stock : number = 0;
  minimo : number = 0;
  precioCompraM : number = 0.0;
  precioVentaM : number = 0.0;
  stockM : number = 0;
  minimoM : number = 0;
  panelAltaProducto : boolean = false;
  tituloModal : string = "";
  tempAlta : boolean = false;
  cantidadReorden : number = 0;
  isModificar : boolean = false;

  constructor(private router : Router, private authService : AuthService){}




  ngOnInit(): void {
    this.webToken = sessionStorage.getItem("tokenB");
    if(this.webToken === ""|| this.webToken === null){
      this.router.navigate(['login'])
    }

    this.formulario = "formBuscarRegistroInventario";
    $("#panelNuevoP").hide();
    this.llenaComboLibros();
    this.opciones = [

      {
        label : 'Editar',
        icon : 'fa fa-pencil',
        command : () =>{
          this.showModal('editar');
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
          this.showModal('reorden');
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
    this.isbnB = this.formulariosComponen.isbnB;
    this.tituloB = this.formulariosComponen.tituloB;
    this.listaInventario = [];

    let p = new HttpParams();

    if(this.isbnB != ""){
      p = p.append('isbnLibro',this.isbnB.trim());
    }
    if(this.tituloB != ""){
      p = p.append('tituloLibro',this.tituloB.trim());
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

  //Función para llenar combo libros
  llenaComboLibros() : void {
    this.authService.procesaOperacionGet('/api/libros/combo',this.webToken,'').subscribe({
      next : (data : any) => {
        if(data.status == 200){
          this.comboLibros = data.body;
        } 
      },
      error : (error : HttpErrorResponse) => {
        swal.fire('Error:',this.authService.msgDecripcion,'error');
      }
    });
  }
  //función para registrar nuevo producto en inventario
  onGuardar() : void {
    
    this.stock = this.formulariosComponen.stock;
    this.minimo = this.formulariosComponen.minimo;
    this.precioCompra = this.formulariosComponen.precioCompra;
    this.precioVenta = this.formulariosComponen.precioVenta;
    this.idLibro = this.formulariosComponen.id;
    
    if(this.stock == null || this.stock<=0 ||
      this.minimo == null || this.minimo<=0 ||
      this.precioCompra == null || this.precioCompra<=0 ||
      this.precioVenta == null || this.precioVenta<=0){
        swal.fire('Campos obligatorios:','Sotck,minimo y precios compra/venta','error');
        return;
    }
    this.pnAlta = true;
    const body : {
      idMovimiento : number,
      stock : number,
      minimo : number,
      precioCompra : number,
      precioVenta : number,
      libro : {id:number}
    } = {
      idMovimiento : 1,
      stock : this.stock,
      minimo : this.minimo,
      precioCompra : this.precioCompra,
      precioVenta : this.precioVenta,
      libro : {id : this.idLibro}
    }


    this.authService.procesaOperacionPost('/api/inventarios/altaProducto',this.webToken,body).subscribe({
      next : (reg : any) =>{
        if(reg.status == 201){
            this.pnAlta = false;
            swal.fire('Registro éxitoso!','El producto fue dado de alta en el inventario','success');
            this.listaInventario.push(reg.body);
        }
      },
      error : (error : HttpErrorResponse) => {
        this.pnAlta = false;
        swal.fire('Error:', this.authService.msgDecripcion,'error');
      }
    });
  }

  //función para modificar registro
  onModificar(formData: any ) : void{

    this.stockM = formData.stock;
    this.minimoM = formData.minimo;
    this.precioCompraM = formData.precioCompra;
    this.precioVentaM = formData.precioVenta;
    this.idInventario = formData.idInventario;
    this.idLibro = formData.idLibro;
    
    if(this.stockM == null || this.stockM<=0 ||
      this.minimoM == null || this.minimoM<=0 ||
      this.precioCompraM == null || this.precioCompraM<=0 ||
      this.precioVentaM == null || this.precioVentaM<=0){
        swal.fire('Campos obligatorios:','Sotck,minimo y precios de venta/compra','error');
        return;
    }

    const confirm = swal.mixin({
      customClass : {
        confirmButton : 'btn btn-success',
        cancelButton : 'btn btn-danger'
      },
      buttonsStyling : false
    }); 
    confirm.fire({
      title: 'Confirmación',
      text: `Esta seguro de modificar este registro?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, modificar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
        if(result.isConfirmed){
          
            const body : {
                idInventario : number,
                idMovimiento : number,
                stock : number,
                minimo : number,
                precioCompra : number,
                precioVenta : number,
                libro : {id : number}
            } = {
                idInventario : this.idInventario,
                idMovimiento : 5,
                stock : this.stockM,
                minimo : this.minimoM,
                precioCompra : this.precioCompraM,
                precioVenta : this.precioVentaM,
                libro : {id : this.idLibro}
            }

            
            this.authService.procesaOperacionPut('/api/inventarios/modificarProducto',this.webToken,JSON.stringify(body)).subscribe({
              next : (reg : any) => {
                if(reg.status == 201){
                  this.listaInventario[this.idx] = reg.body;
                  confirm.fire(
                    'Modificado!',
                    'El registro seleccionado ha sido guardado',
                    'success'
                  )
                  $('#myModal').modal('hide');
                }
              },
              error : (error : HttpErrorResponse) => {
                swal.fire('Error:',this.authService.msgDecripcion,'error');
              }
            });
        }
    }); 
  }

    //funcion para punto de reorden
    onReorden(formData:any) : void {
      this.precioCompraM = formData.precioCompra;
      this.idInventario = formData.idInventario;
      this.idLibro = formData.idLibro;
      this.cantidadReorden = formData.cantidadReorden;

      if(this.precioCompraM == null || this.precioCompraM<=0 ||
        this.cantidadReorden == null || this.cantidadReorden<=0){
          swal.fire('Campos obligatorios:','Precio de compra y cantidad de reorden','error');
          return;
      }
      const arreglo = Object.values(formData);
      console.log("form"+ arreglo)
      

    }

    //funcion para obtener un registro unico por ID
    onDetalleLibro(id : any ) : void{
      this.authService.procesaOperacionGet('/api/libros/'+id,this.webToken,'').subscribe({
        next : (reg : any) => {
          if(reg.status == 200){
           // this.resetVaribles();
            this.idLibro = reg.body.libro.id;
            this.isbn = reg.body.libro.isbn;
            this.autor = reg.body.autor.nombre+" "+reg.body.autor.apellido;
            this.editorial = reg.body.libro.editorial;
            this.srcNuevo ="./assets/uplodas/"+reg.body.libro.rutaFoto;
          }
        },
        error : (error : HttpErrorResponse) => {
          swal.fire('Error:',this.authService.msgDecripcion,'error');
        }
      });
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

    //funcion para mostrar panel de alta
    onPanelNuevo() : void {
      //this.resetVaribles();
      
      $("#buscar").fadeOut(()=>{
        this.formulario = "formAltaInventario";
        this.pnBuscar = false;
        this.tempAlta = true;
        $("#panelNuevoP").fadeIn(()=>{
          this.pnAlta = false;
        });
        
      });
    }
 
  //función para llamar modalBox
  showModal(type:string) : void {
    let reg = this.reg;

   // this.resetVaribles();
    setTimeout(() => {
            $('#myModal').modal('show');
          }, 300); 
    if(type == "editar"){
        this.src = './assets/uplodas/'+this.reg.libro.rutaFoto;
        this.idInventario = this.reg.id;
        this.typeForm = "formGestionInventario";
        this.modalTemplate = 'inputs';
        this.tituloModal = "Modificar Producto";
        this.idLibro = this.reg.libro.id;
        this.isModificar = true;
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
              id : 'precioCompra',
              label : 'PRECIO COMPRA',
              value : reg.precioCompra,
              type : 'text'
            },
            {
              id : 'precioVenta',
              label : 'PRECIO VENTA',
              value : reg.precioVenta,
              type : 'text'
            }
          ];
    }
    if(type == "reorden"){
      this.src = './assets/uplodas/'+reg.libro.rutaFoto;
      this.idInventario = reg.id;
      this.typeForm = "formReorden";
      this.modalTemplate = 'inputs';
      this.tituloModal = "Reorden Producto";
      this.idLibro = this.reg.libro.id;
      this.isModificar = false;
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
            type : 'text',
            disable : true
          },
          {
            id : 'reorden',
            label : 'CANTIDAD REORDEN',
            value : 0,
            type : 'text'
          },
          {
            id : 'minimo',
            label : 'MINIMO',
            value : reg.minimo,
            type : 'text',
            disable : true
          },
          {
            id : 'precioCompra',
            label : 'PRECIO COMPRA',
            value : reg.precioCompra,
            type : 'text',
          },
          {
            id : 'precioVenta',
            label : 'PRECIO VENTA',
            value : reg.precioVenta,
            type : 'text',
            disable : true
          }
        ];
    }
  }




    //Función para resetear panels a origen
    onReset(panel:string) : void{
      
      $("#"+panel).fadeOut(()=>{
        this.pnAlta = false;
        this.pnBuscar = true; 
        this.tempAlta = false;
        this.formulario = "formBuscarRegistroInventario";
      });
    }

}
