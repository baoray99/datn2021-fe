import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/utils/models/role/role.model';
import { RoleManagerService } from 'src/app/utils/services/aas-network/role/role-manager.service';
import { AuthService } from '../../utils/services/aas-network/auth/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  isLogin: boolean = true;
  loginForm!: FormGroup;
  roleList: Role[] = [];
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleManagerService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.roleService.getAllRole().subscribe((res: any) => {
      this.roleList = [];
      if (res && res instanceof Array) {
        res.forEach((item) => {
          this.roleList.push(new Role(item));
        });
      }
    });
  }
  changeStatus(): void {
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.loginForm = this.fb.group({
        email: [null, [Validators.required]],
        password: [null, [Validators.required]],
      });
    } else {
      this.loginForm = this.fb.group({
        name: [null, [Validators.required]],
        email: [null, [Validators.required]],
        password: [null, [Validators.required]],
        role: [null, [Validators.required]],
      });
    }
  }
  loginOrRegister(): void {
    if (this.loginForm.valid) {
      console.log('submit', this.loginForm.value);
      if (this.isLogin) {
        this.authService
          .userLogin(this.loginForm.value)
          .subscribe((res: any) => {
            if (res) {
              localStorage.setItem('token', JSON.stringify(res?.token));
              localStorage.setItem('isLogined', JSON.stringify(true));
            }
            this.router.navigate(['/home']);
          });
      }
      if (!this.isLogin) {
        this.authService
          .userRegister(this.loginForm.value)
          .subscribe((res: any) => {
            if (res) {
              console.log('register success');
              this.changeStatus();
            }
          });
      }
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
