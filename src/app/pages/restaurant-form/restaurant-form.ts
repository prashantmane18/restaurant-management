import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  ActivatedRoute
} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant';

@Component({
  selector: 'app-restaurant-form',
  imports: [RouterLink, FormsModule],
  templateUrl: './restaurant-form.html',
  styleUrl: './restaurant-form.css',
})
export class RestaurantForm implements OnInit {

  restaurantId: string | null = null;

  restaurant: Restaurant = {
    id: '',
    name: '',
    address: '',
    bestDish: '',
    rating: 0
  };

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.restaurantId =
      this.route.snapshot.paramMap.get('id');

    if (this.restaurantId) {
      this.loadRestaurant();
    }
  }

  get isEditMode(): boolean {
    return this.restaurantId !== null;
  }

  loadRestaurant(): void {

    if (!this.restaurantId) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.restaurantService
      .getRestaurantById(this.restaurantId)
      .subscribe({

        next: (response: Restaurant) => {

          console.log(
            'Restaurant loaded for edit:',
            response
          );

          this.restaurant = {
            id: response.id,
            name: response.name,
            address: response.address,
            bestDish: response.bestDish,
            rating: response.rating
          };

          this.isLoading = false;

          // Tell Angular to immediately update the form
          this.changeDetectorRef.detectChanges();
        },

        error: (error: any) => {

          console.error(
            'Failed to load restaurant:',
            error
          );

          this.errorMessage =
            'Failed to load restaurant.';

          this.isLoading = false;

          this.changeDetectorRef.detectChanges();
        }

      });
  }

  saveRestaurant(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (
      !this.restaurant.name ||
      !this.restaurant.address ||
      !this.restaurant.bestDish
    ) {

      this.errorMessage =
        'Please fill all fields.';

      return;
    }

    // UPDATE
    if (this.isEditMode && this.restaurantId) {

      this.restaurantService
        .updateRestaurant(
          this.restaurantId,
          this.restaurant
        )
        .subscribe({

          next: (response: Restaurant) => {

            console.log(
              'Restaurant updated:',
              response
            );

            this.successMessage =
              'Restaurant updated successfully!';

            this.router.navigate([
              '/restaurants'
            ]);
          },

          error: (error: any) => {

            console.error(
              'Failed to update restaurant:',
              error
            );

            this.errorMessage =
              error?.error?.message ||
              'Failed to update restaurant.';
          }

        });

      return;
    }

    // ADD
    this.restaurantService
      .addRestaurant(this.restaurant)
      .subscribe({

        next: (response: Restaurant) => {

          console.log(
            'Restaurant added:',
            response
          );

          this.successMessage =
            'Restaurant added successfully!';

          this.router.navigate([
            '/restaurants'
          ]);
        },

        error: (error: any) => {

          console.error(
            'Failed to add restaurant:',
            error
          );

          this.errorMessage =
            error?.error?.message ||
            'Failed to add restaurant.';
        }

      });
  }
}