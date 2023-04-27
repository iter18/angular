import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html'
})
export class FormulariosComponent {

  @Input() formulario : string = "";
}
