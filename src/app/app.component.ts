import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { IUser } from './user/interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'project';
  currentUser: IUser | null;

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._authService.currentUser.subscribe(user => this.currentUser = user);
  }
}
