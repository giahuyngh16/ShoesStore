import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { NotifierService } from "src/app/core/services/notifier.service";
import { UserService } from "../user.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

    constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _notifierService: NotifierService,
  ) {
  }

  ngOnInit() {
    this.forgotPasswordForm =this._buildForm();
  }

  onSubmit() {
    this.submitted = true;
    if(this.forgotPasswordForm.invalid) {
      return;
    }
    this.loading = true;
    this._userService.resetPassword(this.forgotPasswordForm.value).subscribe (
      () => {
        this._notifierService.showToastrSuccessMessage('Success','Reset Password Successfully! Please check your email');
        setTimeout( () => {this._router.navigate(['login'])}, 1000);
      },
      error => {
        this.error = error.message;
        this.loading = false;
      },
    )
  }

  get f() { return this.forgotPasswordForm.controls; }

  private _buildForm(): FormGroup {
    return this._formBuilder.group({
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

}
