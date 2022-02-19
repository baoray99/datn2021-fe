import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../utils/services/aas-network/auth/auth.service';
import { User } from '../../utils/models/user/user.model';
import { ChatService } from 'src/app/utils/services/aas-network/chatservice/chatservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User = null;
  msg = 'First Protocol';
  msgForm!: FormGroup;
  isOpen: boolean = false;
  public roomId: string;
  public messageText: string;
  public messageArray: { user: string; message: string }[] = [];
  public currentUser;
  public selectedUser;

  public userList = [
    {
      id: 1,
      name: 'Student 1',
      roomId: {
        2: 'room-1',
      },
    },
    {
      id: 2,
      name: 'Teacher 1',
      roomId: {
        1: 'room-1',
      },
    },
  ];
  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMe();
    this.msgForm = this.fb.group({
      text: [null, [Validators.required]],
    });
  }
  getMe(): void {
    if (localStorage.getItem('token')) {
      this.authService.getMe().subscribe((res: any) => {
        this.user = null;
        if (res && res instanceof Object) {
          this.user = res;
        }
        this.login(this.user.name);
      });
    }
  }
  toggleBoxChat(name: string) {
    this.isOpen = !this.isOpen;
    const boxChat = document.querySelector<HTMLElement>('.app_chat-box');
    boxChat.classList.toggle('active');
    if (this.isOpen) {
      this.selectedUser = this.userList.find((user) => user.name === name);
      this.roomId = this.selectedUser.roomId[this.currentUser.id];
      this.join(this.currentUser.name, this.roomId);
      this.chatService.callChatbot().subscribe((res: any) => {
        console.log(res);
      });
      this.chatService
        .getMessage()
        .subscribe((data: { user: string; message: string }) => {
          console.log(data);
          this.messageArray.push(data);
          if (this.roomId) {
            const msgInput = document.querySelector<HTMLInputElement>(
              '.app_chat-box-input'
            );
            const listMsg = document.querySelector<HTMLElement>(
              '.app_chat-box-messages'
            );
            listMsg.scrollTo(0, listMsg.scrollHeight);
            msgInput.value = '';
            this.msgForm.setErrors({ invalid: true });
          }
        });
    } else {
      this.leave(this.currentUser.name, this.roomId);
    }
  }
  join(username: string, roomId: string): void {
    this.chatService.joinRoom({ user: username, room: roomId });
  }
  leave(username: string, roomId: string) {
    this.chatService.leaveRoom({ user: username, room: roomId });
  }
  sendMessage(): void {
    if (this.msgForm.valid) {
      this.chatService.sendMessage({
        user: this.currentUser.name,
        room: this.roomId,
        message: this.msgForm.value.text,
      });
    } else {
      Object.values(this.msgForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  login(name: string): void {
    this.currentUser = this.userList.find((user) => user.name === name);
    this.userList = this.userList.filter((user) => user.name !== name);
    console.log(this.currentUser);
  }
}
