import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  /**Con la anotiación @Input le decimos al compenente que podrá recibir el valor de un componente que lo mande 
   * a llamar y la comunicación es bidireccional
   */
  @Input() nombre:string="";
  @Input() apellido:string="";

}
