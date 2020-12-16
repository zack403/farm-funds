import { CanDeactivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { FoodbankDashboardComponent } from '../components/clientapp/foodbank-dashboard/foodbank-dashboard.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<FoodbankDashboardComponent> {

    canDeactivate(component : FoodbankDashboardComponent){
        // if(component.editForm.dirty){
        //     return confirm("Are you sure you want to continue? Any unsaved changes will be lost");
        // }
         return confirm("Leaving this page automatically logs you out, Are you sure you want to continue?");
    }
}