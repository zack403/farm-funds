import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UtilityService } from 'src/app/services/utility.service';

declare var PaystackPop: any;


const inputOptions = {
  'card': 'card',
  'other' : 'other'
};

const formatter = new Intl.NumberFormat('en-NI', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2
})

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('editForm')  editForm: NgForm;
  userData: User;
  dashboardData: any;
  purchases: any;
  pck: boolean = false;
  pl: boolean = false;
  emoji = '&#128591;&#127999';
  isBusy: boolean = false;
  sub: boolean = false;
  myWallet: number = 0;
  message: string;
  interest: number;

  constructor(private authSvc: AuthService, private router: Router, 
    private profileSvc: ProfileService,
    private toastr: ToasterService,
    private utilSvc: UtilityService,
    private angularZone : NgZone,
    private route: ActivatedRoute) { }


  ngOnInit() {
    const result = this.route.snapshot.data.user;
    this.userData = result[0].data;
    this.dashboardData = result[1].investments;
    this.purchases = result[1].purchases;
  }


  openModal(type) {
    document.getElementById('util').classList.add('modal-lg');
    if(type === 'newfarm'){
      document.getElementById(type).click();
      this.pl = false;
      this.pck = true;
      this.sub = false;
    }
    else if (type === 'subscribe') {
      document.getElementById(type).click();
      this.pl = false;
      this.pck = false
      this.sub = true;
    }
    else if(type === 'purchase') {
      document.getElementById(type).click();
      this.pck = false;
      this.pl = true;
      this.sub = false;
    }
    else {
      this.pl = false;
      this.pck = false;
      this.sub = false;
      document.getElementById('util').classList.remove('modal-lg');
      document.getElementById('util').classList.add('modal-sm');
      document.getElementById(type).click();
    }
  }


  updateProfile() {
    this.isBusy = true;
    this.profileSvc.updateMe(this.userData).subscribe((res: any) => {
      this.toastr.Success(res.data);
      this.isBusy = false;
    }, err => {
      this.isBusy = false;
      console.log(err);
    })
  }

  deposit(amt) {
    amt *= 100000;
    this.interest = (amt * 5) / 100;
     const that = this;
     const {email, firstName, lastName} = this.authSvc.getCurrentUserData();
       try {
           var handler = PaystackPop.setup({
             key: 'pk_test_801d715bb68f121b21aac949a0f65b3a93dfb3d0',
             email: email,
             amount: amt*100,
             currency: "NGN",
             firstname: firstName,
             lastname: lastName,
 
             callback: function(response){
               if(response.reference) {
                 Swal.fire({
                   title: 'Success',
                   html: `<p>Your payment is successful, your transaction reference is ${response.reference}. Click proceed to select items worth your interest.</p>`,
                   confirmButtonColor: 'green',
                   icon: 'success',
                   confirmButtonText: "Proceed"
                 }).then(res => {
                   if(res) {
                     that.angularZone.run(() => {
                      that.router.navigateByUrl("app/farmify-shopping", { state: { interest: that.interest} });
                     })
                   }
                 })
               }
             },
             onClose: function(){
             }
           });
           handler.openIframe(); 
       } catch (error) {
         that.toastr.Error(error);
         console.log("PayStackError",error);
       }
   }
 

  

  openswal() {
    Swal.fire({
      html: '<p class="text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, magni fugiat saepe, totam quae id cum ipsam, aspernatur perferendis iure cupiditate molestiae tempore blanditiis vero culpa? Iure quo repellat non' +
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi provident consequatur molestias similique quaerat quos adipisci error ipsa ea nemo exercitationem hic, ut consectetur maiores tenetur! Ducimus minima quam tempora.' +
      'By clicking on buy, you are saying you want us to keep supplying you the food for said the duration.</p>',
      imageUrl: 'assets/images/farmify-slide.jpeg',
      width: 800,
      imageHeight: 300,
      imageWidth: 700,
      input: 'number',
      inputPlaceholder: 'Unit',
      confirmButtonColor: 'green',
      confirmButtonText: "Subscribe",
      inputValidator: (value) => {
        if (!value) {
          return 'Please input unit!'
        }
      }
    }).then( async res => {
      if(res.value) {
        const { value: answer } = await Swal.fire({
          title: 'Choose payment method',
          input: 'radio',
          confirmButtonColor: 'green',
          inputOptions: inputOptions,
          inputValidator: (value) => {
            if (!value) {
              return 'Please select one of the options above.'
            }
          }
        });

        if(answer === 'card') {
          this.deposit(parseInt(res.value));
        }
        else if (answer === 'other') {
          res.value = res.value * 100000;
          this.interest = (res.value * 5) / 100;
          const { value: file } = await Swal.fire({
            title: `Partnership fee ${formatter.format(res.value)}`,
            text: 'Please upload your proof of payment.',
            input: 'file',
            confirmButtonColor: 'green',
            showLoaderOnConfirm: true,
            inputValidator: (value) => {
              if (!value) {
                return 'Please choose proof of payment'
              }
            },
            preConfirm: (event) => {
              const formData = new FormData();
              formData.append("proofofpayment", event);
              this.utilSvc.uploadProofOfPayment(formData).subscribe((r:any) => {
                console.log(r);
              })
            },
            inputAttributes: {
              'accept': 'image/*',
              'aria-label': 'Upload your proof of payment'
            }
          });
        }
      }
    })
  }

}
