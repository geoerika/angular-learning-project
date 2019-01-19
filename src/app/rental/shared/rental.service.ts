import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RentalService {

  private rentals: any[] = [{
    id: 1,
    title: "Central Apartment 1",
    city: "New York",
    street: "Times Square",
    category: "apartment",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 3,
    description: "Very nice apartment",
    dailyRate: 34,
    shared: false,
    createdAt: "24/12/2017"
  },
  {
    id: 2,
    title: "Central Apartment 2",
    city: "San Francisco",
    street: "Main Street",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 12,
    description: "Very nice condo",
    dailyRate: 34,
    shared: false,
    createdAt: "24/12/2017"
  },
  {
    id: 3,
    title: "Central Apartment 3",
    city: "Bratislava",
    street: "Hlavna",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice condo",
    dailyRate: 334,
    shared: false,
    createdAt: "24/12/2017"
  },
  {
    id: 4,
    title: "Central Apartment 4",
    city: "Berlin",
    street: "Haupt Strasse",
    category: "house",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 9,
    description: "Very nice house",
    dailyRate: 33,
    shared: false,
    createdAt: "24/12/2017"
  }];

  public getRentals(): any {
    debugger;


    const rentalObservable = new Observable((observer) => {

      setTimeout(() => {
    debugger;

        observer.next(this.rentals);
      }, 1000);

      setTimeout(() => {
    debugger;

        observer.error('I AM ERROR');
      }, 2000);

      setTimeout(() => {
    debugger;

        observer.complete();
      }, 3000);


    });
    debugger;

    return rentalObservable;
  }

}
