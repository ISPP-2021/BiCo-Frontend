import { Reserva } from './reserva.interface';

export interface Consumer {
	id?: Number;
	name?: String;
	lastname?: String;
	dni?: String;
	email?: String;
	user?: {
		username?: String;
		password?: String;
		enabled?: boolean;
		authorities?: {
			id?: Number;
			authority?: String;
			new?: boolean;
		};
	};
	bookings?: Array<Reserva>;
	new?: boolean;
	_links?: {
		self?: {
			href?: String;
		};
		consumers?: {
			href?: String;
		};
	};
}
