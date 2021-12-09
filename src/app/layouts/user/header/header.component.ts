import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/utils/models/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input('user') set user(value: any) {
    this._user = value;
  }
  private _user: User;
  get user() {
    return this._user;
  }
  isLogined: boolean = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.isLogined = JSON.parse(localStorage.getItem('isLogined'));
  }

  ngAfterViewInit(): void {
    if (this.isLogined) {
      const notifyContent = document.querySelector<HTMLElement>(
        '.navbar__notify-list'
      );
      const notifyIcon = document.querySelector<HTMLElement>(
        '.navbar__notify-icon '
      );
      const userContent = document.querySelector<HTMLElement>(
        '.navbar__user-content'
      );
      const userAvt = document.querySelector<HTMLElement>(
        '.navbar__avatar-img'
      );
      window.addEventListener('mouseup', function (e) {
        if (
          e.target != notifyContent &&
          (<HTMLElement>e.target).parentNode != notifyContent &&
          e.target != notifyIcon
        ) {
          notifyContent.classList.remove('active');
        }
        if (
          e.target != userContent &&
          (<HTMLElement>e.target).parentNode != userContent &&
          e.target != userAvt
        ) {
          userContent.classList.remove('active');
        }
      });
    }
  }
  logOut() {
    window.localStorage.clear();
  }
  onFocusSearch(): void {
    document.querySelector<HTMLElement>(
      '.navbar__search-outline'
    ).style.borderColor = '#567df4';
  }
  onFocusOutSearch(): void {
    document.querySelector<HTMLElement>(
      '.navbar__search-outline'
    ).style.borderColor = '#dce0e3';
  }
  expandNotify(): void {
    document
      .querySelector<HTMLElement>('.navbar__notify-list')
      .classList.toggle('active');
  }
  expandUser(): void {
    document
      .querySelector<HTMLElement>('.navbar__user-content')
      .classList.toggle('active');
  }
}
