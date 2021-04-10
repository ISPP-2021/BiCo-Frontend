import { Booking } from 'src/app/model/booking.interface';

export interface Servise {
  id?: Number;
  name?: String;
  description?: String;
  price?: Number;
  duration?: Number;
  capacity?: Number;
  deposit?: Number;
  tax?: Number;
  business?: String;
  bookings?: Booking;
  new?: boolean;
}
