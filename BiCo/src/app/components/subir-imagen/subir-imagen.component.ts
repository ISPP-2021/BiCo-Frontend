import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.css'],
})
export class SubirImagenComponent implements OnInit {
  @Input() negocio_id: string;

  constructor(
    private sanitizer: DomSanitizer,
    private imageService: ImageService
  ) {}
  profilePrevia: any = null;
  profileFile: any;
  imagenPrevia: any = [];
  files: any = [];
  loading: boolean;
  buss = false;
  error: any;

  ngOnInit(): void {
    if (this.negocio_id) {
      this.buss = true;
      this.imageService
        .getBusinessPic(this.negocio_id)
        .subscribe((imagenes) => {
          imagenes.forEach((x) => {
            /* const blob = b64toBlob(x.name, x.type);
        let unsafeImageUrl = URL.createObjectURL(blob);
        let img = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
        this.imagenPrevia.push(blob)*/
            this.imageService.getImage(x.name).subscribe((data) => {
              let unsafeImageUrl = URL.createObjectURL(data);
              let img = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
              this.imagenPrevia.push(img);
              this.files.push(data)
            });
          });
        });
    }
  }

  public onFileSelected(event: any) {
    this.error = ''
    const imagen = event.target.files[0];
    if (['image/jpeg'].includes(imagen.type)) {
      this.files.push(imagen);
      this.profileFile = imagen
      this.blobFile(imagen).then((res: any) => {
        this.imagenPrevia.push(res.base);
        this.profilePrevia = res.base;
      });
    }else{
      this.error = "La foto debe tener extensión JPG"
    }
  }

  removeFoto(i) {
    this.imagenPrevia.splice(i, 1);
    this.profilePrevia === null
    this.files.splice(i, 1);
  }

  /**
   *
   * Esta funciones se encarga de enviar archivos al servidor
   */

  loadProfileImage = () => {

    try {
      const formData = new FormData();
      formData.append('image', this.profileFile);
      this.loading = true;
      this.imageService.upload(formData).subscribe(
        (res) => {
          this.loading = false;
          window.location.reload()
        },
        (e) => {
          this.loading = false;
          this.error = e.error.title
        }
      );
    } catch (e) {
      this.loading = false;
      this.error = e
    }
  };

  loadBusinessImage = () => {

    try {
      this.imageService.deleteBusinessPic(this.negocio_id).subscribe(()=>{
          const formData = new FormData();
          this.files.forEach((item) => {
          formData.append('files', item);
        });
          this.loading = true;
          this.imageService.uploadBusiness(formData, this.negocio_id).subscribe(
        (res) => {
          this.loading = false;
          window.location.reload();
        },
        (e) => {
          this.loading = false;
          this.error = e.error.title
        }
         );
      })

    } catch (e) {
      this.loading = false;
      this.error = e
    }
  };

  blobFile = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            blob: $event,
            image,
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            blob: $event,
            image,
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
    });
}

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
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

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
