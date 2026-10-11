import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Restaurant as RestaurantModel } from '../models/restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {

  private readonly baseUrl = 'http://localhost:1012';

  constructor(private http: HttpClient) {}

  // GET all restaurants
  getAllRestaurants(): Observable<RestaurantModel[]> {
    return this.http.get<RestaurantModel[]>(
      `${this.baseUrl}/restoapi/viewall`
    );
  }

  // GET one restaurant by ID
  getRestaurantById(id: string): Observable<RestaurantModel> {
    return this.http.get<RestaurantModel>(
      `${this.baseUrl}/restoapi/${id}`
    );
  }

  // POST - add restaurant
  addRestaurant(
    restaurant: RestaurantModel
  ): Observable<RestaurantModel> {
    return this.http.post<RestaurantModel>(
      `${this.baseUrl}/restoapi/addresto`,
      restaurant
    );
  }

  // PUT - update restaurant
  updateRestaurant(
    id: string,
    restaurant: RestaurantModel
  ): Observable<RestaurantModel> {
    return this.http.put<RestaurantModel>(
      `${this.baseUrl}/restoapi/updateresto/${id}`,
      restaurant
    );
  }

  // DELETE - delete restaurant
  deleteRestaurant(id: string): Observable<void> {
  return this.http.delete<void>(
    `${this.baseUrl}/restoapi/deleteresto/${id}`
  );
}
}