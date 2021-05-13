import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { Router } from '@angular/router';
import { PaymentIntentDto } from 'src/app/model/payment-intent-dto';
import { Reserva } from 'src/app/model/reserva.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  elements: Elements;
  card: StripeElement;

  elementsOptions: ElementsOptions = {
    locale: 'es'
  };

  @Input() precio;
  @Input() descripcion;
  @Input() nombre;
  @Input() servicio;
  @Input() bookDate;
  @Input() emisionDate;
  @Input() status;
  @Input() openTime;
  @Input() closeTime;
  @Input() invalidDate;


  error: any;

  constructor(
    private stripeService: StripeService,
    private modalService: NgbModal,
    private paymentService: PaymentService,
    private router: Router
  ) { }

  public stripeForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.checkTime()
    console.log(this.invalidDate)
    this.stripeService.elements(this.elementsOptions).subscribe(
      elements => {
        this.elements = elements;
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: 'normal',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#909090'
                }

              }
            }
          });
          this.card.mount('#card-element');
        }
      }
    );
  }

  // checkTime():Boolean{
  //   let res : Boolean = true;
  //   let openD = new Date("December 17, 1995 " + this.openTime)
  //   let closeD = new Date("December 17, 1995 " + this.closeTime)
  //   let bookD = new Date(this.bookDate)

  //   console.log(openD)
  //   console.log(bookD)
  //   console.log(closeD)

  //   if(bookD.getHours() > closeD.getHours() || bookD.getHours() < openD.getHours() ){
  //     res = false;
  //     console.log("holita wey")
  //   }
  //   return res;
  // }

  checkTime(): Boolean{
    let res: Boolean = true;
    if(this.invalidDate==true){
      console.log("hey ehey ehy you")
      res = false;
    }
    return res;
  }

  buy() {
    const name = this.stripeForm.get('name').value;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          const paymentIntentDto: PaymentIntentDto = {
            token: result.token.id,
            amount: Number(this.precio)*100,
            currency: 'eur',
            description: this.descripcion
          };
          this.paymentService.pagar(paymentIntentDto).subscribe(
            data => {
              this.abrirModal(data[`id`], this.nombre, data[`description`], data[`amount`]);
            }
          );
          this.error = undefined;
        } else if (result.error) {
          this.error = result.error.message;
        }
      });
  }

  abrirModal(id: string, nombre: string, descripcion: string, precio: number) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.nombre = nombre;
    modalRef.componentInstance.descripcion = descripcion;
    modalRef.componentInstance.precio = precio;
    modalRef.componentInstance.bookDate = this.bookDate;
    modalRef.componentInstance.emisionDate = this.emisionDate;
    modalRef.componentInstance.status = this.status;
    modalRef.componentInstance.servicio = this.servicio;
  }
}
