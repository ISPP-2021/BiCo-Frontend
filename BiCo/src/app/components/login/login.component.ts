import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
  err: string;

	constructor(
		private authService: AuthenticationService,
		private formBuilder: FormBuilder,
		private router: Router
	) { }

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			user: new FormControl(null, [Validators.required]),
			password: new FormControl(null, [Validators.required, Validators.minLength(3)])
		})
	}

	onSubmit() {
		if (this.loginForm.invalid) {
			return;
		}
		let auth = this.authService.login(this.loginForm.value).pipe(
			map(token => this.router.navigate(['home']))
		).subscribe(data=>{

    }, error => {
      this.err= error.error.detail
    })

		this.router.navigate(['home']);

	}

}
