import { Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  /** @Input() se usa para recibir información del componente padre al componente hijo
   * @Ouput() se usa para enviar del componente hijo información o eventos al padre
   */

  @Input() isbn:string="";
  @Input() titulo:string="";
  @Input() categoria:string="";
  @Input() editorial:string="";
  @Input() imagen: File = new File([], '');
  @Input() nombre :string = "";
  @Input() comboAutores: any[] = [];


  @Output() imagenSeleccionada: EventEmitter<File> = new EventEmitter<File>();
  @Output() autorSelected : Number = 0;

  @ViewChild('libroForm', { static: true }) libroFormTemplate : any;
  @ViewChild('buscarForm') buscarFormTemplate: any;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.imagenSeleccionada.emit(file);
  }

}
