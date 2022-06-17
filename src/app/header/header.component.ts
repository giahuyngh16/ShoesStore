import { NotifierService } from './../core/services/notifier.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { IUser } from '../user/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userCurrentProfile: IUser| null;

  constructor(private _authService: AuthService ,
    private _notifierService: NotifierService) {
    this._authService.currentUser.subscribe((user: IUser| null) => {
      this.userCurrentProfile = user
    });
  }

  ngOnInit(): void {
  }

  onLogout(){
    this._notifierService.showToastrSuccessMessage('Logout Successfully');
    setTimeout(() => {this._authService.logout()}, 1000);
  }
}
