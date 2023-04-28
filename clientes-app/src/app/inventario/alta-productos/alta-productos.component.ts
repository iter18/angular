import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.component.html'
})
export class AltaProductosComponent implements OnInit {

  pnBuscar:boolean = true;
  formulario: string = "";
  pnAlta : boolean = false;


  ngOnInit(): void {
    this.formulario = "formBuscarRegistroInventario";
  
  }

  //Función para dar de alta los productos en inventario
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

}
