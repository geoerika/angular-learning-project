import { Booking } from '../../booking/shared/booking.model';

export class Rental {

  // id: string;
  _id: string;
  title: string;
  city: string;
  street: string;
  category:string;
  image: string;
  bedrooms: number;
  description: string;
  dailyRate: number;
  shared: boolean;
  createdAt: string;
  bookings: Booking[];

  // getId() {
  //   return this.id;
  // }

}
