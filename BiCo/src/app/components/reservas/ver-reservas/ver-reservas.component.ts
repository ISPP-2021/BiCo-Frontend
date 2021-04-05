import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Consumer } from 'src/app/model/consumer.interface';
import { ConsumerService } from 'src/app/services/consumer-service/consumer.service';
@Component({
  selector: 'app-ver-reservas',
  templateUrl: './ver-reservas.component.html',
  styleUrls: ['./ver-reservas.component.css']
})
export class VerReservasComponent implements OnInit {
  consumer$: Observable<Consumer> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const consumerId: number = parseInt(params['id']);

      return this.consumerService
        .findOne(consumerId)
        .pipe(map((consumer: Consumer) => consumer));
    })
  );
  constructor(
    private activatedRoute: ActivatedRoute,
    private consumerService: ConsumerService
  ) { }

  ngOnInit(): void { }

}
