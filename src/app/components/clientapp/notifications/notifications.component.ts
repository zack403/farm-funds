import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Array<any> = [];
  notId: string;
  live: boolean = true;

  
  constructor(private utilSvc: UtilityService,
    private authSvc: AuthService) { }

  ngOnInit(): void {
    if(history.state.item){ 
      let req =  {
        message: history.state.item.message,
        createdAt: history.state.item.createdAt
      }
      
      this.notifications.push(req);
     
      req = {
        message: '',
        createdAt: ''
      };
    } else {
      this.getUserNotifications();

    }

  }

  getUserNotifications() {
    this.utilSvc.GetUserNotifications(this.authSvc.getCurrentUserData().id).subscribe((notifications: any) => {
      this.notifications = notifications.data;
    }) 
  }

}
