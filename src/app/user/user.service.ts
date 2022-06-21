import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "../core/services/base.service";
import { USER_API_PATH } from "./user-api-const";

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {

  registerAccount(data: any): Observable<any>{
    const value = data && {
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      confirmPassword: data.confirmPassword,
    }
    return this.requestWithLoading().post(`${USER_API_PATH.REGISTER_ACCOUNT}`, value);
  }

  resetPassword(data: any): Observable<any>{
    const value = data && {
      email: data.email,
      phoneNumber: data.phoneNumber,
    }
    return this.requestWithLoading().post(`${USER_API_PATH.RESET_PASSWORD}`, value);
  }

}
