import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Supplier } from 'src/app/model/supplier.interface';
import { SupplierService } from 'src/app/services/supplier-service/supplier.service';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { ReservaService } from 'src/app/services/reserva-service/reserva.service';
import { Negocio } from 'src/app/model/negocio.interface';
import { Servicio } from 'src/app/model/service.interface';

@Component({
  selector: 'app-mis-negocios',
  templateUrl: './mis-negocios.component.html',
  styleUrls: ['./mis-negocios.component.css'],
})
export class MisNegociosComponent implements OnInit {
  supplier$: Observable<Supplier> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const supplierId: number = parseInt(params['id']);

      return this.supplierService.findOne().pipe(
        map((supplier: Supplier) => {
          supplier.business.sort(this.businessComparator);
          supplier.business.forEach((a) =>
            a.services.sort(this.servicesComparator)
          );
          return supplier;
        })
      );
    })
  );
  constructor(
    private activatedRoute: ActivatedRoute,
    private negocioService: NegocioService,
    private reservaService: ReservaService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {}

  servicesComparator(a: Servicio, b: Servicio) {
    if (a.name > b.name) return 1;
    else if (a.name < b.name) return -1;
    else return 0;
  }

  businessComparator(a: Negocio, b: Negocio) {
    if (a.name > b.name) return 1;
    else if (a.name < b.name) return -1;
    else return 0;
  }

  cancelBooking(id) {
    let res = window.confirm('¿Seguro que desea cancelar la reserva?');
    if (res) {
      this.reservaService.cancelBooking(id).subscribe(() => {
        window.location.reload();
      });
    }
  }

  acceptBooking(id) {
    let res = window.confirm('¿Seguro que desea aceptar la reserva?');
    if (res) {
      this.reservaService.acceptBooking(id).subscribe(() => {
        window.location.reload();
      });
    }
  }

  deleteBusiness(id) {
    let res = window.confirm('¿Esta seguro de que desea borrar el negocio?');
    if (res) {
      this.negocioService.delete(id).subscribe(() => {
        window.location.reload();
      });
    }
  }
}
