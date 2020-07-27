import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toasterSvc: ToastrService) { }

  public Success(msg: string) {
    return this.toasterSvc.success(msg)
  }

  public Error(msg: string) {
    return this.toasterSvc.error(msg)
  }

  public Warning(msg: string) {
    return this.toasterSvc.warning(msg)
  }

  public Remove(id: number) {
    return this.toasterSvc.remove(id);
  }

  public Info(msg: string) {
    return this.toasterSvc.info(msg);
  }

}
