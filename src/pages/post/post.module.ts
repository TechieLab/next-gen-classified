import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import {PostDetailsPage} from './postDetails.page';
import {PostNewAdPage} from './postnewad.page';
import { PostService, IPostService } from './post.service';

@NgModule({
    declarations:[PostDetailsPage,PostNewAdPage],    
    exports:[PostDetailsPage, PostNewAdPage],
    entryComponents:[PostNewAdPage, PostDetailsPage],
    imports:[IonicModule, FormsModule],
    providers:[PostService]
})

export class PostModule{}