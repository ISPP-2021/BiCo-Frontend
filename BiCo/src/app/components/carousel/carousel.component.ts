import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() negocio_id;
  
  businessPics : any=[];
  profilePic : any = null

  customOptions: OwlOptions = {
    loop: true,
    margin:20,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: true
  }
  
  constructor(private sanitizer: DomSanitizer,
    private imageService: ImageService) { }

  ngOnInit(): void {
    this.loadBusinessImages()
  }

  loadBusinessImages(){
    this.imageService.getBusinessPic(this.negocio_id).subscribe(imagenes=>{
      try{
        this.imageService.getImage(imagenes[0].name).subscribe(data => {
          let unsafeImageUrl = URL.createObjectURL(data);
          this.profilePic = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
        })} catch(err){
          // console.log(err);
          this.profilePic = './favicon.ico'
        }

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
