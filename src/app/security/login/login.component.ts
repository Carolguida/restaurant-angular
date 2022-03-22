import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "app/shared/services/notification.service";
import { LoginService } from "app/shared/services/login.service";
import { User } from "./user.model";

@Component({
  selector: "mt-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  navigateTo: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private notifications: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", Validators.required),
    });

    this.navigateTo = this.activatedRoute.snapshot.params["to"] || btoa("/");
    console.log(this.navigateTo)
  }

  login() {
    const { email, password } = this.loginForm.controls;

    const loginValue = email.value;
    const passwordValue = password.value;

    this.loginService.login(loginValue, passwordValue).subscribe(
      (user: User) => this.notifications.notify(`Bem-vindo, ${user.name}`),

      (response) => 
        this.notifications.notify(response.error.message),

      // callback quando o observable terminar
      () => {
        // LOGIN deu certo! então vamos navegar para a rota desejada.
        this.router.navigate([atob(this.navigateTo)])
      }
    );
  }
}
