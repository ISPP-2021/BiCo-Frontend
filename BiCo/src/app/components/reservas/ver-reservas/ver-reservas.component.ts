import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Consumer } from 'src/app/model/consumer.interface';
import { ConsumerService } from 'src/app/services/consumer-service/consumer.service';
import { ReservaService } from 'src/app/services/reserva-service/reserva.service';
import { Reserva } from 'src/app/model/reserva.interface';

@Component({
	selector: 'app-ver-reservas',
	templateUrl: './ver-reservas.component.html',
	styleUrls: ['./ver-reservas.component.css'],
})
export class VerReservasComponent implements OnInit {
	consumer$: Observable<Consumer> = this.activatedRoute.params.pipe(
		switchMap((params: Params) => {
			const consumerId: number = parseInt(params['id']);

			return this.consumerService
				.findOne()
				.pipe(map((consumer: Consumer) => {
					consumer.bookings.sort(this.bookingComparator);
					return consumer;
				}));
		})
	);

	constructor(
		private activatedRoute: ActivatedRoute,
		private consumerService: ConsumerService,
		private bookingService: ReservaService
	) { }

	ngOnInit(): void {

	}

	bookingComparator(a: Reserva, b: Reserva) {
		if (a.bookDate > b.bookDate)
			return 1;
		// B va primero que A
		else if (a.bookDate < b.bookDate)
			return -1;
		// A y B son iguales
		else
			return 0;
	}

	cancelBooking(id: number) {
		let res = window.confirm('¿Seguro que desea cancelar la reserva?');
		if (res) {
			this.bookingService.cancelBooking(id).subscribe(() => {
				window.location.reload();
			});

		}
	}
}
