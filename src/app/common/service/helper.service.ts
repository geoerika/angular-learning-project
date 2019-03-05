import { Injectable } from '@angular/core';
import { Booking } from '../../booking/shared/booking.model';
import * as moment from 'moment';

@Injectable()

export class HelperService {
  private getRangeOfDates(startAt, endAt, dateFormat) {
    const tempDates = [];
    const mEndAt = moment(endAt); //used moment to trasform string in a date type
    let mStartAt = moment(startAt);

    while(mStartAt < mEndAt) {
      tempDates.push(mStartAt.format(dateFormat));
      mStartAt = mStartAt.add(1, 'day');
    }
    tempDates.push(moment(startAt).format(dateFormat));
    tempDates.push(mEndAt.format(dateFormat));

    return tempDates;
  }

  public getBookingRangeOfDates(startAt, endAt) {
    return this.getRangeOfDates(startAt, endAt, Booking.DATE_FORMAT);
  }
}
