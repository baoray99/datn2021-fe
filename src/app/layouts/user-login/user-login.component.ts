import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../utils/services/aas-network/auth/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  isLogin: boolean = true;
  loginForm!: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
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
          });
      }
      if (!this.isLogin) {
        this.authService
          .userRegister(this.loginForm.value)
          .subscribe((res: any) => {
            if (res) {
              console.log('register success');
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
