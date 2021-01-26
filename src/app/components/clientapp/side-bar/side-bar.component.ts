import { ToasterService } from 'src/app/services/toaster.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilityService } from 'src/app/services/utility.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  user: any;
  photo: string;
  feedbackData: any =  {
    feedbackType: '',
    description: ''
  };
  submitted: boolean = false;

  constructor(private authSvc: AuthService, private utilSvc: UtilityService, private router: Router, private toastr: ToasterService) { }

  ngOnInit() {
    this.user = this.authSvc.getCurrentUserData();
  }

  newFoodSubs() {
    let dc = document.getElementById('findme');
    if(dc){
      document.getElementById('findme').click();
    } else {
      this.router.navigateByUrl('app/foodbank-dashboard');
      setTimeout(() => {
        document.getElementById('findme').click();
      }, 3000);
    }
  }

  submitFeedback() {
    this.submitted = true;
    this.utilSvc.sendFeedback(this.feedbackData).subscribe((res: any) => {
      this.submitted = false;
      this.toastr.Success(res.message);
    }, (error) => {
        this.submitted = false;
    })
  }


  onChangeFeedback(value) {
    this.feedbackData.feedbackType = value;
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'red',
      confirmButtonColor: 'green',
      closeOnConfirm: true,
      closeOnCancel: true
    }).then((result) => {
      if(result.value) {
        this.authSvc.logout();
      }
    })
   }

}
