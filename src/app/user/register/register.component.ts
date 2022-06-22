import { NotifierService } from './../../core/services/notifier.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MESSAGE } from "src/app/core/constants/common.const";
import { IRequestError } from "src/app/core/interfaces/request-error.interface";
import ValidationHelper, { CustomValidators } from "../custom-validators";
import { UserService } from "../user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  MESSAGE = MESSAGE;
  registerForm: FormGroup;
  formErr: any;
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
    this.registerForm = this._buildForm();
  }


  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this._userService.registerAccount(this.registerForm.value).subscribe (
      () => {
        this._notifierService.showToastrSuccessMessage('Register Successfully');
        this._router.navigate(['login']);
      },
      error => {
        this.error = error.message;
        this.loading = false;
      },
    )
  }

  private _buildForm(): FormGroup {
    return this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
    } ,{
      validator: CustomValidators.ConfirmedValidator('password', 'confirmPassword')
    })
  }
}
