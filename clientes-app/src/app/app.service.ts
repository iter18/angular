import { HttpClient, HttpHeaders, HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,catchError,throwError, switchMap, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint : string = 'http://localhost:8080';
  msgDecripcion : string = "";

  constructor(public http:HttpClient,
              private router:Router) { }


              /** Servicio para login */
              login(username:string,password:string,params:any):Observable<HttpResponse<Object>>{

                var headersForSession = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
                                                          'Authorization' : 'Basic '+btoa(username.replace("'","'") + ":" +password.replace("'","'")),
                                                          'Cache-Control': 'no-cache',
                                                          'Access-Control-Allow-Headers' : 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding',
                                                          'Accept' : 'application/json'});

                return this.http.post<HttpResponse<Object>>(this.urlEndPoint+'/api/login','',{headers : headersForSession, observe:'response',params : params, responseType:'json'
              }).pipe(catchError((error:HttpErrorResponse)=>{
                if(error.status == 500){
                  if(error.error.exception == "io.jsonwebtoken.ExpiredJwtException" || error.error.exception == "io.jsonwebtoken.SignatureException"){
                      this.router.navigate(['login']);
                  }
                }
                if(error.status == 409){
                    this.msgDecripcion = error.error.mensaje;
                }
                return throwError(()=> error);
              }));
              }
              /**Servicio para operaciones GET */
              procesaOperacionGet(uri : string, token : string, params : any) : Observable<HttpResponse<Object>>{
                var headersApi = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
                                                          'Accept' : 'application/json',
                                                          'Cache-Control': 'no-cache',
                                                          'Authorization' : token
                                    });
                let options = ({headers : headersApi, params : params});
                
                return this.http.get<Object>(this.urlEndPoint+uri,
                  {headers: headersApi,observe: 'response', params : params, 
                  reportProgress: true, responseType:'json', withCredentials : true
                }).pipe(catchError((error:HttpErrorResponse)=>{
                  if(error.status == 500){
                    if(error.error.exception == "io.jsonwebtoken.ExpiredJwtException" || error.error.exception == "io.jsonwebtoken.SignatureException"){
                        this.router.navigate(['login']);
                    }
                  }
                  if(error.status == 409){
                      this.msgDecripcion = error.error.mensaje;
                  }
                  return throwError(()=> error);
                }));
              }
              /** Servicio para Operaciones Delete */
              procesaOperacionDelete(uri : string, token : string, params : any) : Observable<HttpResponse<any>>{
                var headersApi = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
                                                          'Accept' : 'application/json',
                                                          'Cache-Control': 'no-cache',
                                                          'Authorization' : token});
                return this.http.delete<any>(this.urlEndPoint+uri,
                                            {headers: headersApi,observe: 'response', params : params, 
                                            reportProgress: true, responseType:'json', withCredentials : true
                }).pipe(catchError((error:HttpErrorResponse)=>{
                  if(error.status == 500){
                    if(error.error.exception == "io.jsonwebtoken.ExpiredJwtException" || error.error.exception == "io.jsonwebtoken.SignatureException"){
                        this.router.navigate(['login']);
                    }
                  }
                  if(error.status == 409){
                      this.msgDecripcion = error.error.mensaje;
                  }
                  return throwError(()=> error);
                }));
              } 
              /** Servicio para operaciones PUT */
              /** NOTA: Content-Type':'application/json -> se especifica cuando se va a trabajar con objetos json y se envian peticiones 
               *                      mediante el body,
               *        Content-Type' : application/x-www-form-urlencoded -> se usa cuando se va trabajar con URL y se envian peticiones mediante la url
                */
              procesaOperacionPut(uri : string, token : string, body : any) : Observable<HttpResponse<any>>{
                          var headersApi = new HttpHeaders({'Content-Type':'application/json',
                          'Accept' : 'application/json',
                          'Cache-Control': 'no-cache',
                          'Authorization' : token});
                   return this.http.put<any>(this.urlEndPoint+uri,
                                            body,
                                            {headers: headersApi,observe: 'response', 
                                            reportProgress: true, responseType:'json', withCredentials : true
                  }).pipe(catchError((error:HttpErrorResponse)=>{
                    if(error.status == 500){
                      if(error.error.exception == "io.jsonwebtoken.ExpiredJwtException" || error.error.exception == "io.jsonwebtoken.SignatureException"){
                          this.router.navigate(['login']);
                      }
                    }
                    if(error.status == 409){
                        this.msgDecripcion = error.error.mensaje;
                    }
                    return throwError(()=> error);
                  }));     
              }

              /** Servicio para Operaciones POST */
              procesaOperacionPost(uri : string, token : string, body : any) : Observable<HttpResponse<any>>{
                var headersApi = new HttpHeaders({'Content-Type':'application/json',
                          'Accept' : 'application/json',
                          'Cache-Control': 'no-cache',
                          'Authorization' : token});
                          return this.http.post<any>(this.urlEndPoint+uri,
                            body,{headers:headersApi,observe:'response',
                            reportProgress:true,responseType:'json',withCredentials:true
                          }).pipe(catchError((error:HttpErrorResponse)=>{
                            if(error.status == 500){
                              if(error.error.exception == "io.jsonwebtoken.ExpiredJwtException" || error.error.exception == "io.jsonwebtoken.SignatureException"){
                                  this.router.navigate(['login']);
                              }
                            }
                            if(error.status == 409){
                                this.msgDecripcion = error.error.mensaje;
                            }
                            return throwError(()=> error);
                          }));

              }
} 
