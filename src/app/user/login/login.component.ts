import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _notifierService: NotifierService,
  ) {
    if (this._authService.getUserInfo()) {
      this._router.navigate(['home']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this._authService.login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
        data => {
          this._notifierService.showToastrSuccessMessage('Register Successfully');
          setTimeout( () => {this._router.navigate(['home'])}, 1000);
        },
        error => {
          this.error = error.error.Message;
          this.loading = false;
        });
  }
}
