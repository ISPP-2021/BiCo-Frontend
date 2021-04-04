import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Negocio } from 'src/app/model/negocio.interface';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';

@Component({
  selector: 'app-ver-negocio',
  templateUrl: './ver-negocio.component.html',
  styleUrls: ['./ver-negocio.component.css']
})
export class VerNegocioComponent implements OnInit {

  negocio$: Observable<Negocio> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const negocioId: number = parseInt(params['id']);

      return this.negocioService.findOne(negocioId).pipe(
        map((negocio: Negocio) => negocio)
      )
    })
  )

  constructor(private activatedRoute: ActivatedRoute, private negocioService: NegocioService) { }

  ngOnInit(): void {
  }


}
