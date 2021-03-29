import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-crear-negocio',
  templateUrl: './crear-negocio.component.html',
  styleUrls: ['./crear-negocio.component.css']
})
export class CrearNegocioComponent implements OnInit {

  form: FormGroup;
  constructor( private formBuilder: FormBuilder) { }

  ngOnInit(){
     this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', Validators.required],
      businessType: ['', [Validators.required]],
      automatedAccept: ['', [Validators.required]],
      limitAutomated: ['', [Validators.required]],
      defaultDeposit: ['', [Validators.required]],
      depositTimeLimit: ['', [Validators.required]],
      });
  }
  save() {
    if(this.form.valid){
    console.log(this.form.value)
    }

}

disable(){
  if(this.form.get('automatedAccept').value==true){
    this.form.get('limitAutomated').enable()
  }else{
    this.form.get('limitAutomated').disable()
  }

}
}
