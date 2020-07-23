import { CanDeactivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { UserProfileComponent } from '../components/user-profile/user-profile.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<UserProfileComponent> {

    canDeactivate(component : UserProfileComponent){
        if(component.editForm.dirty){
            return confirm("Are you sure you want to continue? Any unsaved changes will be lost");
        }
        return true;
    }
}