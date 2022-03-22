import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "app/shared/services/login.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService);
    
    if (loginService.isLoggedIn()) {
      const authRequest = req.clone({        
        setHeaders: {
          Authorization: `Bearer ${loginService.user.accessToken}`,
        },
      });
      
      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }
}
