import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Consumer } from 'src/app/model/consumer.interface';
import { ConsumerService } from 'src/app/services/consumer-service/consumer.service';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-consumer-edit-profile',
  templateUrl: './consumer-edit-profile.component.html',
  styleUrls: ['./consumer-edit-profile.component.css']
})
export class ConsumerEditProfileComponent implements OnInit {

  consumerId = parseInt(this.route.snapshot.paramMap.get('id'));
  consumer$: Observable<Consumer> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const consumerId: number = parseInt(params['id']);

      return this.consumerService
        .findOne()
        .pipe(map((consumer: Consumer) => consumer));
    })
  );

  form: FormGroup;

  profilePic : any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private consumerService: ConsumerService,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private sanitizer:DomSanitizer) { }

  ngOnInit(): void{
    this.getImageFromService();
    this.consumerService.findOne().subscribe(consumer => {
      this.form = this.formBuilder.group({
        name : [consumer.name, Validators.required],
        lastname : [consumer.lastname, Validators.required],
        dni : [consumer.dni, [Validators.required, Validators.pattern(/^\d{8}[a-zA-Z]$/)]],
        email : [consumer.email, [Validators.required, Validators.email, Validators.minLength(6)]]
      })
    })
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

  save(){
    if(this.form.valid){
      this.consumerService.update(this.consumerId, this.form.value).subscribe(()=>{
        window.location.replace('/userProfile')
      })
    }
  }

}
