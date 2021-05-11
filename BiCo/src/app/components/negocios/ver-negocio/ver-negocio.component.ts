import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Negocio } from 'src/app/model/negocio.interface';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-ver-negocio',
  templateUrl: './ver-negocio.component.html',
  styleUrls: ['./ver-negocio.component.css'],
})
export class VerNegocioComponent implements OnInit {
  businessPics : any=[];
  profilePic : any = null
  rol = localStorage.getItem('rol');
  negocioId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  negocio$: Observable<Negocio> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const negocioId: number = parseInt(params['id']);

      return this.negocioService
        .findOne(negocioId)
        .pipe(map((negocio: Negocio) => negocio));
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private negocioService: NegocioService,
    private sanitizer: DomSanitizer,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.loadBusinessImages()
  }

  loadBusinessImages(){
    this.imageService.getBusinessPic(this.negocioId).subscribe(imagenes=>{
      this.imageService.getImage(imagenes[0].name).subscribe(data => {
      let unsafeImageUrl = URL.createObjectURL(data);
      this.profilePic = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
    })
      imagenes.forEach(x => {
        this.imageService.getImage(x.name).subscribe(data => {
          let unsafeImageUrl = URL.createObjectURL(data);
          let img = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
          this.businessPics.push(img)
        })
      })
    })
  }

}
