import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Consumer } from 'src/app/model/consumer.interface';
import { ConsumerService } from 'src/app/services/consumer-service/consumer.service';
import { MatDialog } from '@angular/material/dialog';
import { OblivionComponent } from 'src/app/components/oblivion/oblivion.component';
import { PorterComponent } from 'src/app/components/porter/porter.component';

@Component({
  selector: 'app-consumer-profile',
  templateUrl: './consumer-profile.component.html',
  styleUrls: ['./consumer-profile.component.css'],
})
export class ConsumerProfileComponent implements OnInit {
  consumer$: Observable<Consumer> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const consumerId: number = parseInt(params['id']);

      return this.consumerService
        .findOne()
        .pipe(map((consumer: Consumer) => consumer));
    })
  );
  constructor(
    private activatedRoute: ActivatedRoute,
    private consumerService: ConsumerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openOblivion(){
    const dialogRef = this.dialog.open(OblivionComponent);
  }

  openPorter(){
    const dialogRef = this.dialog.open(PorterComponent);
  }
}
