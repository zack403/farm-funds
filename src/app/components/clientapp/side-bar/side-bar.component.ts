import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  user: any;
  photo: string;
  constructor(private authSvc: AuthService, private router: Router) { }

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
