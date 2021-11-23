import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../utils/services/aas-network/auth/auth.service';
import { User } from '../../utils/models/user/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User = null;
  role: string = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getMe();
  }
  getMe(): void {
    if (localStorage.getItem('token')) {
      this.authService.getMe().subscribe((res: any) => {
        this.user = null;
        this.role = '';
        if (res && res instanceof Object) {
          this.user = res;
          this.role = res.role;
        }
      });
    }
  }
}
