import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private count:number=0;
  private spinner$= new BehaviorSubject<string>('');
  constructor() { }
  getSpinnerObserver(){
    return this.spinner$.asObservable()
  }
  requestStarted(){
    if(++this.count===1){
      this.spinner$.next('start')
    }
  }
  requestEnded(){
    if(this.count===0 || --this.count===0){
      this.spinner$.next('stop')
    }
  }
  resetSpinner(){
    this.count=0;
    this.spinner$.next('stop')
  }
}
