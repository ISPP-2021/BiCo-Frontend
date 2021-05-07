import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.css']
})
export class SubirImagenComponent implements OnInit {

   @Input() negocio_id: string;

  constructor(private sanitizer: DomSanitizer, private imageService: ImageService) { }
  imagenPrevia: any = [];
  files: any = []
  loading: boolean;
  buss = false

  ngOnInit(): void {
    if(this.negocio_id){
      this.buss = true;
      this.imageService.getBusinessPic(this.negocio_id).subscribe(imagenes=>{
      imagenes.forEach(x => {
       /* const blob = b64toBlob(x.name, x.type);
        let unsafeImageUrl = URL.createObjectURL(blob);
        let img = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
        this.imagenPrevia.push(img)*/
        this.imageService.getImage(x.name).subscribe(data => {
          let unsafeImageUrl = URL.createObjectURL(data);
          let img = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
          this.imagenPrevia.push(img)
        })
      })
    })
    }
  }

public onFileSelected(event: any) {

    const imagen = event.target.files[0];
    console.log(imagen);
    if (['image/jpeg'].includes(imagen.type)) {
      console.log('Si es una imagen');
      this.files.push(imagen)
      this.blobFile(imagen).then((res: any) => {
        this.imagenPrevia.push(res.base);
      })
    } else {
      console.log('No es imagen');

    }
  }

  removeFoto(i){
    this.imagenPrevia.splice(i, 1);
  }

  /**
   *
   * Esta funciones se encarga de enviar archivos al servidor
   */

  loadProfileImage = () => {
    try {
      const formData = new FormData();
      this.files.forEach((item) => {
        formData.append('image', item)
      });
      this.loading = true;
      let username = localStorage.getItem('username')
      console.log(username)
      this.imageService.upload(formData).subscribe(res => {
          this.loading = false;
          console.log('Carga exitosa');
        }, e =>{
          this.loading = false;
          console.log('ERROR', e);
        });
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);

    }
  }

    loadBusinessImage = () => {
    try {
      const formData = new FormData();
      this.files.forEach((item) => {
        formData.append('files', item)
      });
      this.loading = true;
      this.imageService.uploadBusiness(formData, this.negocio_id).subscribe(res => {
          this.loading = false;
          console.log('Carga exitosa');
        }, e =>{
          this.loading = false;
          console.log('ERROR', e);
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

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}
