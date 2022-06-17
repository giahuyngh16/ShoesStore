import {
  AbstractControl,
  ValidatorFn,
  FormControl,
  FormGroup,
  FormArray,
  ValidationErrors
} from '@angular/forms';

export class CustomValidators {
  constructor() {}

  static onlyChar(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == '') return null;

      let re = new RegExp('^[a-zA-Z ]*$');
      if (re.test(control.value)) {
        return null;
      } else {
        return { onlyChar: true };
      }
    };
  }
  static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }
}

export default class ValidationHelper {
  private static REGEX_VALID_DATE = /^(1[0-9]|2[0-9]|3[0-1]|0?[1-9])[\/\-\.\s](1[0-2]|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|0?[1-9])[\/\-\.\s](\d{4}$)/i;
  private static REGEX_VALID_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private static REGEX_VALID_PHONE = /[0-9]{8,12}/;
  static validForm(formGroup: FormGroup) {
    const errFields = {};
    const validCheck = (formObj: FormGroup, errObj: Object) => {
      Object.keys(formObj.controls).forEach(field => {
        const control = formObj.get(field);
        if (control instanceof FormControl) {
          errObj[`${field}`] = control.errors;
        } else if (control instanceof FormGroup) {
          errObj[`${field}`] = {};
          return validCheck(control, errObj[`${field}`]);
        } else if (control instanceof FormArray) {
          errObj[`${field}`] = control.errors;
          Array.from(Array(control.controls.length).keys()).forEach(index => {
            errObj[`${field}${index}`] = {};
            return validCheck(control.at(index) as FormGroup, errObj[`${field}${index}`]);
          });
        }
      });
    };
    validCheck(formGroup, errFields);
    return errFields;
  }

  static validEmail(control: AbstractControl): ValidationErrors | null {
    return !control.value ? null : (ValidationHelper.REGEX_VALID_EMAIL.test(control.value) ? null : { email: true });
  }
  static emptyBlankSpace(control: AbstractControl): ValidationErrors | null {
    return (String(control.value).trim().length > 0) ? null : {blankSpace: true};
  }
  static validPhone(control: AbstractControl): ValidationErrors | null {
    const phoneNoLength = String(control.value).trim();
    return (phoneNoLength.length >= 9 && phoneNoLength.length <= 12 && ValidationHelper.REGEX_VALID_PHONE.test(phoneNoLength)) ? null : {invalidPhone: true};
  }
}
