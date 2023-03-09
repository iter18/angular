import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint : string = 'http://localhost:8080/api/';

  constructor(public http:HttpClient,
              private router:Router) { }


              /** Servicio para login */
              login(username:string,password:string,params:any):Observable<HttpResponse<Object>>{

                var headersForSession = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
                                                          'Authorization' : 'Basic '+btoa(username.replace("'","'") + ":" +password.replace("'","'")),
                                                          'Cache-Control': 'no-cache',
                                                          'Access-Control-Allow-Headers' : 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding',
                                                          'Accept' : 'application/json'});

                                                          return this.http.post<HttpResponse<Object>>(this.urlEndPoint+'login','',{headers : headersForSession, observe:'response',params : params, responseType:'json'})
              }
}
