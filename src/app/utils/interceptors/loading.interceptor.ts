import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.requestStarted();
    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          this.loadingService.requestEnded();
        }
        return event;
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          this.loadingService.resetSpinner();
        }
        return throwError(error);
      })
    );
  }
}
