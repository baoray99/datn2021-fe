import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { API } from '../../api';
import { ServicePath } from '../../../common/constant-service-api';

const CALL_CHATBOT = ServicePath.CHAT_SERVICE;
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private url = 'http://localhost:3000';
  constructor(private api: API) {
    this.socket = io(this.url, {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
  }
  joinRoom(data): void {
    this.socket.emit('join', data);
  }
  leaveRoom(data) {
    this.socket.emit('leave', data);
  }
  sendMessage(data): void {
    this.socket.emit('message', data);
  }
  callChatbot(data) {
    const url = CALL_CHATBOT;
    return this.api.post(url, data);
  }
  getMessage(): Observable<any> {
    return new Observable<{ user: string; message: string }>((observer) => {
      this.socket.on('new_message', (data) => {
        observer.next(data);
      });

      // return () => {
      //   this.socket.disconnect();
      // };
    });
  }

  getStorage() {
    const storage: string = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data) {
    localStorage.setItem('chats', JSON.stringify(data));
  }
}
