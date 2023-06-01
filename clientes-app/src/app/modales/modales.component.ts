import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modales',
  templateUrl: './modales.component.html'
})
export class ModalesComponent {

  @Input() template: string = "";
  @Input() image: string = "";
  @Input() text: string="";
  @Input() isbn: string="";
  @Input() titulo: string="";
  @Input() categoria: string="";
  @Input() editorial: string="";
  @Input() autor: string="";
  @Input() inputs: any;
  safeImageUrl: SafeUrl ="";
  @Input() idInventario : number = 0;
  @Input() typeForm : string = "";
  @Input() tituloModal : string = "";
  @Input() idLibro : number = 0;

  //variable para obtener los valores del formulario
  formData :any = {};

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges() {
    if ((this.template === 'image' && this.image) || this.template === 'inputs' ) {
      this.safeImageUrl = this.sanitizer.bypassSecurityTrustUrl(this.image);
    }

  }

  closeModal() {
    $('#myModal').modal('hide');
  }

  //evento que va emitir al componente padre una función del componenteHijo
  @Output() eventEmitter = new EventEmitter<any>();

  //funcion para enviar datos de los campos de texto
  onSubmit(){
    //se especifica que se enviara al componente padre la funcionalidad de evento del
    //componente hijo
    if(this.typeForm === "formGestionInventario"){
        this.formData = {
          idLibro : this.idLibro,
          idInventario: this.idInventario,
          stock: $("#stock").val(),
          minimo : $("#minimo").val(),
          precioCompra : $("#precioCompra").val(),
          precioVenta : $("#precioVenta").val()
        }
    }

    this.eventEmitter.emit(this.formData);
  }

}
