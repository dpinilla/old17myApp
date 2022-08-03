import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

/* export interface Usuario {
  usrCorreo:string,
  usrTipo: string,
  usrContrasena: string,
}

export interface Usuario2{
  usrCorreo2:string,
  usrTipo2: string,
  usrContrasena2: string,
} */

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  private _refresh$ = new Subject<void>();

   
  get refresh$() {
    return this._refresh$;
  }

  constructor(public http: HttpClient) { }

  url = "http://127.0.0.1:80" //Dirección Backend

  getAllDatos():Observable<any>{
    return this.http
    .get(this.url+"/getAllDatos")
  }

  removeDatos(correo){
    return this.http
    .post(this.url+"/removeDatos", JSON.stringify(correo))
    .pipe(tap(() => {
      this._refresh$.next();
    }
    ))
  }

  updateDatos(data): Observable<any>{
    return this.http
    .post(this.url+"/updateDatos" ,JSON.stringify(data))
      .pipe(tap(() => {
        this._refresh$.next();
      })
    );
  }

  addDatos(data): Observable<any>{
    return this.http
    .post(this.url+"/addDatos", JSON.stringify(data))
      .pipe(tap(() => {
          this._refresh$.next();
        })
      )
      ;
  }


  /////////////////////////////////////////

  getAllUsr():Observable<any>{
    return this.http
    .get(this.url+"/getAllUsr")
  }

  removeUsr(correo){
    return this.http
    .post(this.url+"/removeUsr", JSON.stringify(correo))
    .pipe(tap(() => {
      this._refresh$.next();
    }
    ))
  }

  updateUsr(data): Observable<any>{
    return this.http
    .post(this.url+"/updateUsr" ,JSON.stringify(data))
      .pipe(tap(() => {
        this._refresh$.next();
      })
    );
  }

  addUser(data): Observable<any>{
    return this.http
    .post(this.url+"/addUsr", JSON.stringify(data))
      .pipe(tap(() => {
          this._refresh$.next();
        })
      )
      ;
  }





}
