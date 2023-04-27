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
  
  }

  //Función para dar de alta los productos en inventario
  onNuevo() : void{
      this.formulario = "formAltaInventario";
      $("#buscar").fadeOut(()=>{
        this.pnBuscar = false;
        this.pnAlta = true;
      });
  }

  //Función para resetear panels a origen
  onReset(panel:string) : void{
    $("#"+panel).fadeOut(()=>{
      this.pnAlta = false;
      this.pnBuscar = true;
    });
  }

}
