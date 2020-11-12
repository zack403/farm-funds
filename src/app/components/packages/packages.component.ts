import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Package } from 'src/app/models/packages.model';
import { PackagesService } from 'src/app/services/packages.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Investment } from 'src/app/models/investment.model';
import { environment } from 'src/environments/environment';


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
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  packagesList: Array<Package>;
  @Input() shouldShow : boolean = true;
  isBusy: boolean;
  page: number = 1;
  size: number = 15;
  search: string = "";
  success: string;

  constructor(private pckSvc: PackagesService, 
    public authSvc: AuthService, 
    public router: Router, 
    private angularZone : NgZone,
    private toastr: ToasterService) {

     }

  ngOnInit() {
    this.getPackages();
  }


  onChange () {

  }

  getPackages(){
    this.pckSvc.getPackages(this.page, this.size, this.search).subscribe((res: any) => {
    this.packagesList = res.data;
    if(res.data.length === 0) return this.toastr.Info("No record found");  
    }, err => {
      console.log(err);
    })
}

  subscribeToAPackage(item) {
    if(this.authSvc.isLoggedIn()) {
      if(item.unit <= 0) return this.toastr.Error(`Sorry, all units for ${item.packageName} has been sold out.`);

      Swal.fire({
        title: 'Unit to subscribe to',
        input: 'number',
        inputAttributes: {
          'min' : 1
        },
        inputPlaceholder: 'Unit',
        confirmButtonColor: 'green',
        confirmButtonText: "Continue",
        inputValidator: (value) => {
          if (!value || value < 1) {
            return 'Your input is not valid!'
          }
        }
      }).then( async res => {
        if(res.value) {
          let request: any = {};
  
          const {firstName, middleName, lastName} = this.authSvc.getCurrentUserData();
  
          request.packageId = item.id;
          request.unit = parseInt(res.value);
          request.package = item.packageName;
          request.investor = middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`;
  
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
            request.paymentType = "Card";
            this.deposit(item.amountPerUnit * parseInt(res.value), request);
          }
          else if (answer === 'other') {  
            const { value: file } = await Swal.fire({
              title: `Investment fee ${formatter.format(item.amountPerUnit * parseInt(res.value))}`,
              html:'<hr><br><p class="text-left text-dark font-weight-bold">BANK NAME: &nbsp;&nbsp;&nbsp; Access Bank</p><br>' +
              '<p class="text-left text-dark font-weight-bold">ACCOUNT NAME: &nbsp;&nbsp; Farmify Agro Innovations Ltd.</p><br>' +
              '<p class="text-left text-dark font-weight-bold">ACCOUNT NUMBER: &nbsp;&nbsp;&nbsp; 1404450358</p><br><hr>' +
              '<strong>Please upload your proof of payment.</strong>',
              input: 'file',
              inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your proof of payment'
              },
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
                formData.append("packageId", item.id);
                formData.append("package", item.packageName);
                formData.append("paymentType", "Transfer");
                formData.append("unit", res.value);
                formData.append("investor", middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`);

                this.pckSvc.AddSubscription(formData).subscribe((res:any) => {
                  this.success = "Your file has been uploaded successfully, You will be notified when your investment has been confirmed and activated.. Thanks.";
                  //this.router.navigateByUrl('app/profile');
                })
              },
              allowOutsideClick: () => !Swal.isLoading()
            });
          }
  
       }
      })
    }
    else {
      this.router.navigateByUrl("login");
    }
  
  }

  deposit(amt, data: Investment) {
     const that = this;
     const {email, firstName, lastName} = this.authSvc.getCurrentUserData();
       try {
           var handler = PaystackPop.setup({
             key: environment.paystack_key,
             email: email,
             amount: amt*100,
             currency: "NGN",
             firstname: firstName,
             lastname: lastName,

             callback: function(response){
               if(response.reference) {
                 Swal.fire({
                   title: 'Success',
                   html: `<small>Your payment was successful, your transaction reference is <strong>${response.reference}</strong>. <br> <strong> Thank you for choosing Farm Funds Africa. </strong></small>`,
                   confirmButtonColor: 'green',
                   icon: 'success',
                   allowOutsideClick: false,
                   allowEscapeKey: false,
                   confirmButtonText: "Proceed"
                 }).then(res => {
                   if(res) {
                     that.angularZone.run(() => {
                      that.pckSvc.AddSubscription(data).subscribe((res:any) => {
                        that.toastr.Success(res.message)
                      })
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
         that.toastr.Error("Error while launching payment screen, please try again.");
         console.log("PayStackError",error);
       }
   }

}