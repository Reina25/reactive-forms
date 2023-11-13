import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  _url= 'http://localhost:3000/enroll';

  constructor(private _http: HttpClient) { }

  register(userData: any){
    return this._http.post<any>(this._url, userData)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }


}
