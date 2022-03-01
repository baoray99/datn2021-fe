import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../utils/services/aas-network/auth/auth.service';
import { User } from '../../utils/models/user/user.model';
import { ChatService } from 'src/app/utils/services/aas-network/chatservice/chatservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
  user: User = null;
  msgForm!: FormGroup;
  isOpen: boolean = false;
  isCourse: boolean = false;
  public roomId: string = 'room-';
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
          this.roomId += Math.floor(Math.random() * 100);
        }
      });
    }
  }
  IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  toggleBoxChat(name: string) {
    this.isOpen = !this.isOpen;
    const boxChat = document.querySelector<HTMLElement>('.app_chat-box');
    boxChat.classList.toggle('active');
    if (this.isOpen) {
      this.join(name, this.roomId);
      this.chatService.callChatbot({ roomId: this.roomId }).subscribe();
      this.chatService
        .getMessage()
        .subscribe((data: { user: string; message: string }) => {
          this.insertMsg(data);
        });
    } else {
      this.chatService.sendMessage({
        user: this.user.name,
        room: this.roomId,
        message: 'Bye',
      });
      this.leave(name, this.roomId);
    }
  }
  join(username: string, roomId: string): void {
    this.chatService.joinRoom({ user: username, room: roomId });
  }
  leave(username: string, roomId: string) {
    this.chatService.leaveRoom({ user: username, room: roomId });
  }
  sendMessage(): void {
    const msgInput = document.querySelector<HTMLInputElement>(
      '.app_chat-box-input'
    );
    if (this.msgForm.valid) {
      this.chatService.sendMessage({
        user: this.user.name,
        room: this.roomId,
        message: this.msgForm.value.text,
      });
      msgInput.value = '';
      this.msgForm.setErrors({ invalid: true });
    } else {
      Object.values(this.msgForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  insertMsg(data) {
    if (this.roomId) {
      const listMsg = document.querySelector<HTMLElement>(
        '.app_chat-box-messages'
      );
      const item = document.createElement('li');
      item.classList.add('app_chat-box-message');
      if (this.IsJsonString(data.message)) {
        item.innerHTML = `
        <img
        src="https://www.silcube.com/hubfs/avatars/non-avatar.webp"
        alt=""
        class="app_chat-box-avt-chatbot"
      />`;
        JSON.parse(data.message).forEach((course) => {
          const textCourse = document.createElement('a');
          textCourse.setAttribute('href', `/courses/${course.slug}`);
          textCourse.classList.add('app_chat-box-text');
          textCourse.textContent = course.name;
          item.appendChild(textCourse);
        });
      } else if (data.user === this.user.name) {
        item.classList.add('same_user');
        item.innerHTML = `<p class="app_chat-box-text">${data.message}</p>`;
      } else {
        item.innerHTML = `
        <img
        src="https://www.silcube.com/hubfs/avatars/non-avatar.webp"
        alt=""
        class="app_chat-box-avt-chatbot"
      />
      <p class="app_chat-box-text">${data.message}</p>`;
      }
      listMsg.appendChild(item);
      listMsg.scrollTo(0, listMsg.scrollHeight);
    }
  }
}
