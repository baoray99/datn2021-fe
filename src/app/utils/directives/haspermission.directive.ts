import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { User } from '../models/user/user.model';

@Directive({
  selector: '[hasPermission]',
})
export class HaspermissionDirective implements OnInit {
  private isHidden: boolean = true;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
  @Input()
  set hasPermission(value: any) {
    this._hasPermission = value;
    this.updateView();
  }
  private _hasPermission: string;
  get hasPermission() {
    return this._hasPermission;
  }
  @Input()
  set hasPermissionUser(value: any) {
    this._hasPermissionUser = value;
    this.updateView();
  }
  private _hasPermissionUser: User;
  get hasPermissionUser() {
    return this._hasPermissionUser;
  }
  ngOnInit(): void {}
  private updateView() {
    if (this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        const sidebarItems =
          document.querySelectorAll<HTMLElement>('.sidebar__btn');
        sidebarItems.forEach((item) => {
          item.addEventListener('click', function () {
            document
              .querySelector('.sidebar__btn.active')
              .classList.remove('active');
            this.classList.add('active');
          });
        });
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }
  private checkPermission() {
    let hasPermission = false;
    if (this.hasPermission && this.hasPermissionUser) {
      if (
        this.hasPermission.toUpperCase() ==
        this.hasPermissionUser.role.name.toUpperCase()
      ) {
        hasPermission = true;
      }
    }
    return hasPermission;
  }
}
