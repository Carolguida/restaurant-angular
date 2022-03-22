import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'app/shared/services/restaurant.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',  
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>
  // uso observable aqui como any pois nao sei o que retorna
  // uso pipe async no html como subscribe (faz esse papel)

  constructor(private service: RestaurantService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.service.restaurantReviews(this.router.parent.snapshot.params['id'])
  }

}
