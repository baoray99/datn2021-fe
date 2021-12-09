import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @Input('user') set user(value: any) {
    this._user = value;
  }
  private _user: string;
  get user() {
    return this._user;
  }
  sidebarItems: any;
  isIconActive: boolean = false;
  constructor() {}
  ngOnInit(): void {}
  expandDropdown(): void {
    const icon = document.querySelector<HTMLElement>('.sidebar__add-act-icon');
    const dropdownContent = document.querySelector<HTMLElement>(
      '.sidebar__dropdown-content'
    );
    this.isIconActive = !this.isIconActive;
    dropdownContent.classList.toggle('active');
    if (this.isIconActive) {
      icon.style.transform = 'scale(1.25) rotate(45deg)';
    } else icon.style.transform = 'scale(1) rotate(0)';
  }
  ngAfterViewInit(): void {
    const dropdownContent = document.querySelector<HTMLElement>(
      '.sidebar__dropdown-content'
    );
    const icon = document.querySelector<HTMLElement>('.sidebar__add-act-icon');
    const btnAddAct = document.querySelector<HTMLElement>(
      '.sidebar__btn-add-act'
    );

    window.addEventListener('mouseup', function (event) {
      if (
        event.target != dropdownContent &&
        (<HTMLElement>event.target).parentNode != dropdownContent &&
        event.target != btnAddAct &&
        event.target != icon
      ) {
        dropdownContent.classList.remove('active');
        icon.style.transform = 'scale(1) rotate(0)';
      }
    });
  }
}
