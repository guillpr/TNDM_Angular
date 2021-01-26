import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class WinAuthInterceptor implements HttpInterceptor{

    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('Dans winAuth');
        req = req.clone({ withCredentials: true });
        return next.handle(req);
    }
}
