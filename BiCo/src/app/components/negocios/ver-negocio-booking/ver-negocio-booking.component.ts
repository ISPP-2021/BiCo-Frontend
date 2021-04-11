import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Negocio } from 'src/app/model/negocio.interface';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';

@Component({
  selector: 'app-ver-negocio-booking',
  templateUrl: './ver-negocio-booking.component.html',
  styleUrls: ['./ver-negocio-booking.component.css'],
})
export class VerNegocioBookingComponent implements OnInit {
  negocio$: Observable<Negocio> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const bookingId: number = parseInt(params['id']);

      return this.negocioService
        .findOneByBooking(bookingId)
        .pipe(map((negocio: Negocio) => negocio));
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private negocioService: NegocioService
  ) {}

  ngOnInit(): void {}
}
