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
  set hasPermissionRole(value: any) {
    this._hasPermissionRole = value;
    this.updateView();
  }
  private _hasPermissionRole: string;
  get hasPermissionRole() {
    return this._hasPermissionRole;
  }
  ngOnInit(): void {}
  private updateView() {
    if (this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }
  private checkPermission() {
    let hasPermission = false;
    if (this.hasPermission && this.hasPermissionRole) {
      if (
        this.hasPermission.toUpperCase() ==
        this.hasPermissionRole.toUpperCase()
      ) {
        hasPermission = true;
      }
    }
    return hasPermission;
  }
}
