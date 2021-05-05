import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.css']
})
export class SubirImagenComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer, private imageService: ImageService) { }
  imagenPrevia: any;
  files: any = []
  loading: boolean;

  ngOnInit(): void {
  }

public onFileSelected(event: any) {

    const imagen = event.target.files[0];
    console.log(imagen);
    if (['image/jpeg'].includes(imagen.type)) {
      console.log('Si es una imagen');
      this.files.push(imagen)
      this.blobFile(imagen).then((res: any) => {
        this.imagenPrevia = res.base;
      })
    } else {
      console.log('No es imagen');

    }
  }

  /**
   *
   * Esta funciones se encarga de enviar archivos al servidor
   */

  loadImages = () => {
    try {
      const formData = new FormData();
      this.files.forEach((item) => {
        formData.append('image', item)
      });
      this.loading = true;
      this.imageService.upload(formData).subscribe(res => {
          this.loading = false;
          console.log('Carga exitosa');
        });
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);

    }
  }


  blobFile = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })
}
