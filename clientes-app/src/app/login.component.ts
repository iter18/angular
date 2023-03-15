import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './app.service';
import { HttpResponse,HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{

  username : string= "";
  password : string = "";
  token : any;
  authorities :String[] = [];
  constructor(private router : Router,
    private authService:AuthService){}
  
  
  ngOnInit(){
    
  }

  onLogin():void{
    this.authService.login(this.username.replace("'",""),this.password.replace("'",""),{}).subscribe((data:HttpResponse<any>) => {
       
      if(data.status == 200){
        this.token = data.headers.get("Authorization");
        this.authorities = data.body.user.authorities.map((role:any)=> role.authority);
;
          sessionStorage.setItem('roles',JSON.stringify(this.authorities));
          sessionStorage.setItem('tokenB',this.token);
          console.log("token de Session: "+sessionStorage.getItem('tokenB'));
          this.router.navigate(['clientes'])
        }
    });
  }

}
