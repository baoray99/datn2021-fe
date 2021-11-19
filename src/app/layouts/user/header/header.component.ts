import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input('isLogined') set isLogined(value: any) {
    this._isLogined = value;
  }
  private _isLogined: boolean;
  get isLogined() {
    return this._isLogined;
  }
  constructor() {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    const notifyContent = document.querySelector<HTMLElement>(
      '.navbar__notify-list'
    );
    const notifyIcon = document.querySelector<HTMLElement>(
      '.navbar__notify-icon '
    );
    const userContent = document.querySelector<HTMLElement>(
      '.navbar__user-content'
    );
    const userAvt = document.querySelector<HTMLElement>('.navbar__avatar-img');
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
