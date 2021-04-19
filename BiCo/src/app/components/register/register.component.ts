import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

class CustomValidators {
  static passwordContainsNumber(control: AbstractControl): ValidationErrors {
    const regex= /\d/;

    if(regex.test(control.value) && control.value !== null) {
      return null;
    } else {
      return {passwordInvalid: true};
    }
  }

  static passwordsMatch (control: AbstractControl): ValidationErrors {
    const password = control.get('user.password').value;
    const confirmPassword = control.get('user.confirmPassword').value;

    if((password === confirmPassword) && (password !== null && confirmPassword !== null)) {
      return null;
    } else {
      return {passwordsNotMatching: true};
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  err: string;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      dni: [null, [Validators.required, Validators.pattern(/^\d{8}[a-zA-Z]$/)]],
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]],
      user: this.formBuilder.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required,Validators.minLength(3),CustomValidators.passwordContainsNumber]],
        confirmPassword: [null, [Validators.required]],
      }),
    },{
       validators: CustomValidators.passwordsMatch
    })
  }

  registerOwner(){
    if(this.registerForm.invalid) {
      return;
    }
    this.registerForm.get('user.confirmPassword').disable()
    this.authService.registerOwner(this.registerForm.value).pipe(
      map(user => this.router.navigate(['login']))
      ).subscribe(data=>{  

      }, error => {
        this.err= error.error.title
        this.registerForm.get('user.confirmPassword').enable()
      })
  }

  onSubmit(){
    if(this.registerForm.invalid) {
      return;
    }

    this.registerForm.get('user.confirmPassword').disable()
    let auth = this.authService.registerUser(this.registerForm.value).pipe(
      map(user => this.router.navigate(['login']))
      ).subscribe(data=>{  

      }, error => {
        this.err= error.error.title
        this.registerForm.get('user.confirmPassword').enable()
      })
  }

}
