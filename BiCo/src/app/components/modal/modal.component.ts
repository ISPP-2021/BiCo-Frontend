import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { ToastrService } from 'ngx-toastr';
import { ReservaService } from 'src/app/services/reserva-service/reserva.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() id;
  @Input() nombre;
  @Input() descripcion;
  @Input() precio;
  @Input() servicio;
  @Input() bookDate;
  @Input() emisionDate;
  @Input() status;

  constructor(
    public activeModal: NgbActiveModal,
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  confirmar(id: string): void {
    this.paymentService.confirmar(id).subscribe(
      (data) => {
        this.toastrService.success(
          'pago confirmado',
          'se ha confirmado el pago con id ' + data[`id`],
          { positionClass: 'toast-top-center', timeOut: 3000 }
        );
        this.activeModal.close();
      },
      (err) => {
        console.log(err);
        this.activeModal.close();
      }
    );
    let reserva = {
      bookDate: this.bookDate,
      emisionDate: this.emisionDate,
      status: this.status,
    };
    this.reservaService.create(this.servicio, reserva).subscribe();
    window.location.replace('/reservas');
    console.log(this.servicio);
    console.log(reserva);
  }

  cancelar(id: string): void {
    this.paymentService.cancelar(id).subscribe(
      (data) => {
        this.toastrService.success(
          'pago cancelado',
          'se ha cancelado el pago con id ' + data[`id`],
          { positionClass: 'toast-top-center', timeOut: 3000 }
        );
        this.activeModal.close();
      },
      (err) => {
        console.log(err);
        this.activeModal.close();
      }
    );
  }
}
