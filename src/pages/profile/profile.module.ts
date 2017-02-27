import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import {ProfilePage} from './profile.page';
import {EditProfilePage} from './editProfile.page';
import { ProfileService, IProfileService } from './profile.service';

@NgModule({
    declarations:[ProfilePage,EditProfilePage],    
    exports:[ProfilePage, EditProfilePage],
    entryComponents:[ProfilePage, EditProfilePage],
    imports:[IonicModule, FormsModule],
    providers:[ProfileService]
})

export class ProfileModule{}