import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../utils/services/aas-network/auth/auth.service';
import { User } from '../../utils/models/user/user.model';
import { ChatService } from 'src/app/utils/services/aas-network/chatservice/chatservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
class CourseMsg {
  name: string;
  image: string;
  slug: string;
  constructor(d = null) {
    d = d || null;
    this.name = d.name || '';
    this.image = d.image || '';
    this.slug = d.slug || '';
  }
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User = null;
  msgForm!: FormGroup;
  isOpen: boolean = false;
  isCourse: boolean = false;
  public roomId: string;
  public messageText: string;
  public messageArray = [];
  public currentUser;
  public selectedUser;
  public courseShow: CourseMsg[] = [];
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
      this.selectedUser = this.userList.find((user) => user.name === name);
      this.roomId = this.selectedUser.roomId[this.currentUser.id];
      this.join(this.currentUser.name, this.roomId);
      this.chatService.callChatbot().subscribe();
      this.chatService
        .getMessage()
        .subscribe((data: { user: string; message: string }) => {
          // if (data.user === 'chatbot' && this.IsJsonString(data.message)) {
          //   console.log('enter func');
          //   this.courseShow = [];
          //   this.insertMsg(data);
          //   JSON.parse(data.message).forEach((course) => {
          //     this.courseShow.push(new CourseMsg(course));
          //   });
          // } else {
          //   this.courseShow = [];
          this.insertMsg(data);
          // }
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
    const msgInput = document.querySelector<HTMLInputElement>(
      '.app_chat-box-input'
    );
    if (this.msgForm.valid) {
      this.chatService.sendMessage({
        user: this.currentUser.name,
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
  login(name: string): void {
    this.currentUser = this.userList.find((user) => user.name === name);
    this.userList = this.userList.filter((user) => user.name !== name);
    console.log(this.currentUser);
  }
  insertMsg(data) {
    this.messageArray.push(data);
    if (this.roomId) {
      const listMsg = document.querySelector<HTMLElement>(
        '.app_chat-box-messages'
      );
      listMsg.scrollTo(0, listMsg.scrollHeight);
    }
  }
}
