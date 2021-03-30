import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators} from '@angular/forms'

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
      option:this.formBuilder.group({
        automatedAccept: ['', [Validators.required]],
        limitAutomated: [{value:'', disabled:true}, [Validators.required]],
        defaultDeposit: ['', [Validators.required]],
        depositTimeLimit: ['', [Validators.required]]
        }),
       services: this.formBuilder.array([this.addServiceGroup()])
      });
  }

  get serviceArray(){
    return <FormArray>this.form.get('services');
  }

  addServiceGroup(){
    return this.formBuilder.group({
      nameService: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      duration: ['', [Validators.required]]
    });
  }

  addService(){
    this.serviceArray.push(this.addServiceGroup());
  }

  removeService(index){
    this.serviceArray.removeAt(index);
  }

  save() {
    if(this.form.valid){
    console.log(this.form.value)
    }

}

disable(){
  if(this.form.get('option.automatedAccept').value==true){
    this.form.get('option.limitAutomated').enable()
  }else{
    this.form.get('option.limitAutomated').disable()
  }

}
}
