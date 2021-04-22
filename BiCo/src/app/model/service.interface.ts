import { Reserva } from './reserva.interface';

export interface Servicio {
	id?: Number;
	name?: String;
	description?: String;
	price?: Number;
	duration?: Number;
	capacity?: Number;
	deposit?: Number;
	tax?: Number;
	business?: String;
	bookings?: Array<Reserva>
}
