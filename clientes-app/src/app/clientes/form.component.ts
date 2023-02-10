import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  titulo : string = "Alta de clientes";
  aNombre : string = "";
  aApellido : string = "";
  aEmail : string = "";


  constructor(){ }

  ngOnInit() {
    
  }

  public guardar() : void{

    console.log("Método Llamado");
  }


}
