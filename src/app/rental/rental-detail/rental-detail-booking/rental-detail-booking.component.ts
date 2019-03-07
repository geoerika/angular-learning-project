import { Component, OnInit, Input } from '@angular/core';
import { Booking } from '../../../booking/shared/booking.model';
import { Rental  } from '../../shared/rental.model'
import { HelperService } from '../../../common/service/helper.service';
import * as moment from 'moment';

@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental;

  daterange: any = {};
  bookedOutDates:any[] = [];

  newBooking: Booking;

  options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    isInvalidDate: this.checkForInvalidDates.bind(this) //bind(this) so we have the cntext of bookedOutdates for this function
  };

  constructor(private helper: HelperService) { }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }

  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0; //second is checking if date is before today so we disable those in the calendar as well
  };

  private getBookedOutDates() {

    const bookings: Booking[] = this.rental.bookings;

    if (bookings && bookings.length > 0 ) {
      bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange); //destructurizing dateRange to push dates not array of dates
      });
    }
  }

  reserveRental() {
    console.log(this.newBooking);
  }

  selectedDate(value: any, datepicker?: any) {

    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = value.end.diff(value.start, 'days');
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }

}
