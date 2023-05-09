import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html'
})
export class FormulariosComponent {
  //Varibles globlales del componente
  @Input() formulario : string = "";
  @Input() nombreB : string = "";

  //Variables para formularios catálogo de libros
  @Input() id:number = 0;
  @Input() isbn:string="";
  @Input() titulo:string="";
  @Input() categoria:string="";
  @Input() editorial:string="";
  @Input() imagen: File = new File([], '');
  @Input() nombre :string = "";
  @Input() comboAutores: any[] = [];
  @Input() autorSelected : Number = 0;
  @Input() tituloB : string = "";
  @Input() isbnB : string = "";
  @Input() autorB : Number = 0;
  //Fin de variables formularios catálogos libros

  //Variables para formulario autores
  @Input() apellido : string = "";
  //Fin varaibles autores 

  //variables para gestion de inventario
  @Input() comboLibros : any[] = [];
  @Input() libroSelected : Number = 0;

  //Variable para gestion de inventario
  @Input() autor : string = "";
  @Input() stock : number = 0;
  @Input() precio : number = 0.0;
  @Input() minimo : number = 0;

  //Variable para seleccionar una imagen para los forms
  @Output() imagenSeleccionada : EventEmitter<File> = new EventEmitter<File>();

  //función para seleccionar una archivo
  onFileSelected(event : any){
    const file : File = event.target.files[0];
    this.imagenSeleccionada.emit(file);
  }

  //variable para saber el id seleccionado de un combo para eventos change
  @Output() idSelect : EventEmitter<number> = new EventEmitter<number>();

  //función para enviar ids seleccionados al componente padre
  onIdSelected(event  : any){

    const id = event.target.value;
  
    //console.log(selectedOption);


    this.idSelect.emit(id);

  }
  

}
