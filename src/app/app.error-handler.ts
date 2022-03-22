import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { NotificationService } from "./shared/services/notification.service";
import { LoginService } from "./shared/services/login.service";


@Injectable()
export class ApplicationErrorHandler extends ErrorHandler{

  constructor(private injector: Injector, 
    private ns: NotificationService,
    private zone: NgZone
    ){
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if(errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message;
      this.zone.run(() => {
        switch(errorResponse.status){
          case 401:
            this.injector.get(LoginService).handleLogin();
            break;
          case 403:
            this.ns.notify(message || 'Não autorizado.')
            break;
          case 404:
            this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais informações.')
            break;        
        }
      })      
    }
    super.handleError(errorResponse);
    
  }
}

// O operador instanceof testa se um objeto tem, em seu prototype, a função construtora.
/*A palavra reservada super é utilizada para fazer referencia a métodos ou atributos da super classe. 
Imagina que você tenha uma classe chamada de Gerente que herda da classe Funcionário e qua ambas as 
classes possuem um método chamado calcularGratificacao(). Estando na classe Gerente como fazer para chamar o método 
calculaGratificacao() da superclasse (Funcionario)?
super.calcularGratificacao();*/