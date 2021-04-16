import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Supplier } from 'src/app/model/supplier.interface';
import { SupplierService } from 'src/app/services/supplier-service/supplier.service';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { ReservaService } from 'src/app/services/reserva-service/reserva.service';


@Component({
  selector: 'app-mis-negocios',
  templateUrl: './mis-negocios.component.html',
  styleUrls: ['./mis-negocios.component.css'],
})
export class MisNegociosComponent implements OnInit {
  negocioId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  supplier$: Observable<Supplier> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const supplierId: number = parseInt(params['id']);

      return this.supplierService
        .findOne(supplierId)
        .pipe(map((supplier: Supplier) => supplier));
    })
  );
  constructor(
    private activatedRoute: ActivatedRoute,
    private negocioService: NegocioService,
    private reservaService: ReservaService,
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  cancelBooking(id){
    this.reservaService.cancelBooking(id).subscribe(res=>{
      window.location.reload()
    })
  }

  acceptBooking(id){

  }

  deleteBusiness(id) {
    let res = window.confirm('¿Esta seguro de que desea borrar el negocio?');
    if (res) {
      this.negocioService.delete(id).subscribe((res) => {
        window.location.reload()
      });
    } else {
    }
  }
}
