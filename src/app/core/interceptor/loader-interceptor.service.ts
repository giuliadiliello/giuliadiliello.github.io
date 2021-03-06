import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoaderService } from "../service/loader.service";

@Injectable({
    providedIn: 'root'
  })
  export class LoaderInterceptorService implements HttpInterceptor {
  
    constructor(public spinnerHandler: LoaderService) {}
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.spinnerHandler.handleRequest(true);
      return next
        .handle(request)
        .pipe(
          finalize(this.finalize.bind(this))
        );
    }
  
    finalize = (): void => this.spinnerHandler.handleRequest(false);
  }
  