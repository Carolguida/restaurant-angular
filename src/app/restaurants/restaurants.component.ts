import { Component, OnInit } from "@angular/core";
import { RestaurantService } from "../shared/services/restaurant.service";
import { Restaurant } from "./restaurant/restaurant.model";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { from, Observable } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: "mt-restaurants",
  templateUrl: "./restaurants.component.html",
  animations: [
    trigger("toggleSearch", [
      state(
        "hidden",
        style({
          opacity: 0,
          "max-height": "0px",
        })
      ),
      state(
        "visible",
        style({
          opacity: 1,
          "max-height": "70px",
          "margin-top": "20px",
        })
      ),
      transition("* => *", animate("250ms 0s ease-in-out")),
    ]),
  ],
})
export class RestaurantsComponent implements OnInit {
  searchBarState = "hidden";
  restaurants: Restaurant[];
  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getRestaurants();
    this.initForm();
    this.getValueChanged();
  }

  getValueChanged() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchTerm) =>
          this.restaurantService
            .restaurants(searchTerm)
            .pipe(catchError((error) => from([])))            
        )
      )
      .subscribe((restaurants) => (this.restaurants = restaurants));
  }

  private initForm() {
    this.searchControl = this.fb.control("");

    this.searchForm = this.fb.group({
      searchControl: this.searchControl,
    });
  }

  toggleSearch() {
    this.searchBarState =
      this.searchBarState === "hidden" ? "visible" : "hidden";
  }

  private getRestaurants() {
    this.restaurantService
      .restaurants()
      .subscribe((restaurants) => (this.restaurants = restaurants));
  }

  // valueChanges -> Observable = posso me inscrever, toda vez que o valor
  // do campo mudar, gera-se um evento, e quem estiver inscrito no valueChanges
  // vai receber uma notificação.
}
