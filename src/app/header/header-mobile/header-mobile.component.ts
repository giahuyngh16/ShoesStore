import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/user/interfaces/user.interface';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent implements OnInit {

  public mMenu:boolean = false;
  public product:boolean = false;
  public services:boolean = false;

  userCurrentProfile: IUser;

  constructor(private _authService: AuthService) {
    this._authService.currentUser.subscribe((user: IUser) => {
      this.userCurrentProfile = user
    });
  }

  ngOnInit(): void {
  }

  showMobileMenu() {
    this.mMenu = !this.mMenu;
  }
  onShowItem() {
    this.product = !this.product;
  }
  onShowItem2() {
    this.services = !this.services;
  }
}
