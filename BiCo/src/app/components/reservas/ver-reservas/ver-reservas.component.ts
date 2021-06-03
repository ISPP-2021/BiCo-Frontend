import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Consumer } from 'src/app/model/consumer.interface';
import { ConsumerService } from 'src/app/services/consumer-service/consumer.service';
import { ReservaService } from 'src/app/services/reserva-service/reserva.service';
import { Reserva } from 'src/app/model/reserva.interface';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { Servicio } from 'src/app/model/service.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ver-reservas',
  templateUrl: './ver-reservas.component.html',
  styleUrls: ['./ver-reservas.component.css'],
})
export class VerReservasComponent implements OnInit {
  async setData(consumer: Consumer) {
    consumer.bookings.forEach((booking) => {
      this.negocioService
        .findService(new Number(booking.servise))
        .subscribe((service) => {
          booking.service = service;
          this.negocioService
            .findOne(new Number(booking.service.business))
            .subscribe((negocio) => {
              booking.negocio = negocio;
              let book = {
                index: booking.index,
                bussiness: booking.negocio,
                service: booking.service,
                day: booking.bookDate,
                price: booking.service.price,
                status: booking.status,
              };
              this.data.push(book);
            });
        });
    });
  }
  consumer$: Observable<Consumer> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const consumerId: number = parseInt(params['id']);

      return this.consumerService.findOne().pipe(
        map((consumer: Consumer) => {
          consumer.bookings.sort(this.bookingComparator);
          this.setData(consumer);
          consumer.bookings.forEach((booking) => {
            this.bookings.push(booking);
          });
          this.dataSource.data = this.data;
          return consumer;
        })
      );
    })
  );
  services: Servicio[] = [];
  bookings: Reserva[] = [];
  show: boolean = false;
  showBookings: any = [];
  calendar: boolean = true;
  data: any = [];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'bussiness',
    'service',
    'day',
    'price',
    'status',
    'actions',
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private consumerService: ConsumerService,
    private bookingService: ReservaService,
    private negocioService: NegocioService
  ) {
    this.dataSource.data = this.data;
  }
  ngOnInit(): void {}
  public isMeeting(date: Date) {
    let res = '';

    this.bookings.forEach((booking) => {
      let book = new Date(booking.bookDate.toString());
      book.setHours(book.getHours()-2)
      if (
        book.getDate() == date.getDate() &&
        book.getMonth() == date.getMonth() &&
        book.getFullYear() == date.getFullYear()
      ) {
        res = 'meeting';
      }
    });
    return res;
  }

  public isYearMeeting(date: Date) {
    let res = '';

    this.bookings.forEach((booking) => {
      let book = new Date(booking.bookDate.toString());
      book.setHours(book.getHours()-2)
      if (
        book.getMonth() == date.getMonth() &&
        book.getFullYear() == date.getFullYear()
      ) {
        res = 'meeting';
      }
    });
    return res;
  }

  public isDecadeMeeting(date: Date) {
    let res = '';

    this.bookings.forEach((booking) => {
      let book = new Date(booking.bookDate.toString());
      book.setHours(book.getHours()-2)
      if (book.getFullYear() == date.getFullYear()) {
        res = 'meeting';
      }
    });
    return res;
  }
  public isCenturyMeeting(date: Date) {
    let res = '';

    this.bookings.forEach((booking) => {
      let book = new Date(booking.bookDate.toString());
      book.setHours(book.getHours()-2)
      if (book.getFullYear() == date.getFullYear()) {
        res = 'meeting';
      }
    });
  }
  public onChange(date: Date): void {
    this.showBookings = [];
    this.show = true;
    let bookDate: Date = new Date();
    for (let index = 0; index < this.bookings.length; index++) {
      const booking = this.bookings[index];
      const book = new Date(booking.bookDate.toString());
      book.setHours(book.getHours()-2)
      if (
        book.getDate() == date.getDate() &&
        book.getMonth() == date.getMonth() &&
        book.getFullYear() == date.getFullYear()
      ) {
        this.showBookings.push(this.bookings[index]);
      }
    }
  }
  bookingComparator(a: Reserva, b: Reserva) {
    if (a.bookDate > b.bookDate) return 1;
    // B va primero que A
    else if (a.bookDate < b.bookDate) return -1;
    // A y B son iguales
    else return 0;
  }

  cancelBooking(id: number) {
    let res = window.confirm('¿Seguro que desea cancelar la reserva?');
    if (res) {
      this.bookingService.cancelBooking(id).subscribe(() => {
        window.location.reload();
      });
    }
  }
  changeView() {
    if (this.calendar) {
      this.calendar = false;
    } else {
      this.calendar = true;
    }
  }
}
