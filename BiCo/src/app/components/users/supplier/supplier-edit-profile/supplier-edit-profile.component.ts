import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Supplier } from 'src/app/model/supplier.interface';
import { SupplierService } from 'src/app/services/supplier-service/supplier.service';

@Component({
  selector: 'app-supplier-edit-profile',
  templateUrl: './supplier-edit-profile.component.html',
  styleUrls: ['./supplier-edit-profile.component.css']
})
export class SupplierEditProfileComponent implements OnInit {

  supplierÏd = parseInt(this.route.snapshot.paramMap.get('id'));
  supplier$: Observable<Supplier> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const supplierId: number = parseInt(params['id']);

      return this.supplierService
        .findOne()
        .pipe(map((supplier: Supplier) => supplier));
    })
  );

  form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private supplierService: SupplierService,
    private route: ActivatedRoute) { }

  ngOnInit(): void{
    this.supplierService.findOne().subscribe(supplier => {
      this.form = this.formBuilder.group({
        name : [supplier.name, Validators.required],
        lastname : [supplier.lastname, Validators.required],
        dni : [supplier.dni, [Validators.required, Validators.pattern(/^\d{8}[a-zA-Z]$/)]],
        email : [supplier.email, [Validators.required, Validators.email, Validators.minLength(6)]]
      })
    })
  }

  save(){
    if(this.form.valid){
      this.supplierService.update(this.supplierÏd, this.form.value).subscribe(()=>{
        window.location.replace('/ownerProfile')
      })
    }
  }

}
