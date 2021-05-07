import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Consumer } from 'src/app/model/consumer.interface';
import { ConsumerService } from 'src/app/services/consumer-service/consumer.service';
import { MatDialog } from '@angular/material/dialog';
import { OblivionComponent } from 'src/app/components/oblivion/oblivion.component';
import { PorterComponent } from 'src/app/components/porter/porter.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-consumer-profile',
  templateUrl: './consumer-profile.component.html',
  styleUrls: ['./consumer-profile.component.css'],
})
export class ConsumerProfileComponent implements OnInit {
  profilePic:any;

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
    private dialog: MatDialog,
    private imageService: ImageService,
    private sanitizer:DomSanitizer

  ) {}

  ngOnInit(): void {
    this.getImageFromService()
  }

  getImageFromService() {
    this.imageService.getProfilePic().subscribe(data => {
        let unsafeImageUrl = URL.createObjectURL(data);
        this.profilePic = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
    }, error => {
        console.log(error);
        this.profilePic = "./favicon.ico"
    });
  }
  openOblivion(){
    const dialogRef = this.dialog.open(OblivionComponent);
  }

  openPorter(){
    const dialogRef = this.dialog.open(PorterComponent);
  }
}
