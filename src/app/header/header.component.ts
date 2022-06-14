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

  constructor(private _authService: AuthService) {
    this._authService.currentUser.subscribe((user: IUser| null) => {
      this.userCurrentProfile = user
    });
  }

  ngOnInit(): void {
  }

  onLogout(){
    this._authService.logout();
  }
}
