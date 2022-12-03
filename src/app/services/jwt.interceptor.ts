import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localStorage: LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=this.localStorage.getKey();
    const isAPIUrl = request.url.startsWith(environment.apiURL);
    
    console.log('Interceptor')
    if (isAPIUrl && token )
    {
      console.log("yes ")
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
        
    }
    return next.handle(request);
  }
}
