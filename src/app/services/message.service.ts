import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<any>();

  sendMessage(message: string) {
      this.subject.next({ data: message });
  }

  clearMessage(message: string, deleted: boolean) {
    this.subject.next({data: message, deleted});
  }

  clearMessages() {
      this.subject.next({data: ''});
  }

  onMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}
