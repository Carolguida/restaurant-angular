import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "mt-not-found",
  templateUrl: "./not-found.component.html", 
})
export class NotFoundComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToRestaurants() {
    this.router.navigateByUrl("/restaurants");
  }
}
