import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpParams,
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Config } from '../../config';

@Injectable()
export class API {
  private config = Config;
  constructor(private http: HttpClient, public router: Router) {}

  //GET token
  getToken() {
    let accessToken = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : sessionStorage.getItem('token') || '';
    if (accessToken) {
      return `Bearer ${accessToken}`;
    } else return '';
  }
  //Make request options
  getRequestOptions() {
    var token = this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };
    return httpOptions;
  }
  //Hanlde error
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
    // 'Something bad happened; please try again later.');
  }

  //GET Method
  get(url) {
    return this.http
      .get(this.config.API_URL + url, this.getRequestOptions())
      .pipe(catchError(this.handleError));
  }

  //POST method
  post(url, data) {
    data = JSON.stringify(data);
    return this.http
      .post(this.config.API_URL + url, data, this.getRequestOptions())
      .pipe(catchError(this.handleError));
  }

  //PUT method
  put(url, data) {
    data = JSON.stringify(data);
    return this.http
      .post(this.config.API_URL + url, data, this.getRequestOptions())
      .pipe(catchError(this.handleError));
  }

  //PATCH method
  patch(url, data) {
    data = JSON.stringify(data);
    return this.http
      .post(this.config.API_URL + url, data, this.getRequestOptions())
      .pipe(catchError(this.handleError));
  }

  //DELETE method
  delete(url, param = '') {
    var token = this.getToken();

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
      body: JSON.stringify(param),
    };

    return this.http
      .delete(this.config.API_URL + url, options)
      .pipe(catchError(this.handleError));
  }
}
