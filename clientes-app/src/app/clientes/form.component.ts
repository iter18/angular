import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  titulo : string = "Alta de clientes";
  aNombre : string = "";
  aApellido : string = "";
  aEmail : string = "";

  cliente : Cliente = new Cliente();


  constructor(private clienteServie : ClienteService,
    private router : Router
    ){ }

  ngOnInit() {
    
  }

  public guardar() : void{

    console.log("Método Llamado");
    this.clienteServie.crear(this.cliente).subscribe(
      response => this.router.navigate(['/clientes'])
    )
  }


}
