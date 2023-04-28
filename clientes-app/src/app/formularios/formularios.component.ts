import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html'
})
export class FormulariosComponent {
  //Varibles para invocar el formulario
  @Input() formulario : string = "";

  //Variables para formularios catálogo de libros
  @Input() id:Number = 0;
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

  //Variable para seleccionar una imagen para los forms
  @Output() imagenSeleccionada : EventEmitter<File> = new EventEmitter<File>();

  //función para seleccionar una archivo
  onFileSelected(event : any){
    const file : File = event.target.files[0];
    this.imagenSeleccionada.emit(file);
  }

  

}
