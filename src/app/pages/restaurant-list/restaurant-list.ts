import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant';

@Component({
  selector: 'app-restaurant-list',
  imports: [RouterLink],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.css',
})
export class RestaurantList implements OnInit {

  restaurants: Restaurant[] = [];

  isLoading = signal(true);
  errorMessage = '';

  constructor(
    private restaurantService: RestaurantService
  ) {
    console.log('RestaurantList CONSTRUCTOR');
  }

  ngOnInit(): void {
    console.log('RestaurantList ngOnInit');
    this.loadRestaurants();
  }

  loadRestaurants(): void {

    this.isLoading.set(true);
    this.errorMessage = '';

    this.restaurantService.getAllRestaurants().subscribe({

      next: (response: Restaurant[]) => {

        console.log('Restaurants received:', response);
        console.log('Restaurant count:', response.length);

        this.restaurants = response;

        this.isLoading.set(false);

        console.log(
          'DEBUG isLoading:',
          this.isLoading()
        );

        console.log(
          'DEBUG restaurants:',
          this.restaurants.length
        );
      },

      error: (error: any) => {

        console.error(
          'Failed to load restaurants:',
          error
        );

        this.errorMessage =
          'Failed to load restaurants.';

        this.isLoading.set(false);
      }

    });
  }

  // DELETE restaurant
  deleteRestaurant(id: string): void {

  const confirmed = confirm(
    'Are you sure you want to delete this restaurant?'
  );

  if (!confirmed) {
    return;
  }

  console.log('DELETE ID:', id);
  console.log(
    'TOKEN:',
    localStorage.getItem('token')
  );

  this.restaurantService
    .deleteRestaurant(id)
    .subscribe({

      next: () => {

        console.log(
          'Restaurant deleted successfully:',
          id
        );

        this.restaurants =
          this.restaurants.filter(
            restaurant => restaurant.id !== id
          );
      },

      error: (error: any) => {

        console.error(
          'Failed to delete restaurant:',
          error
        );

      }

    });
}
}