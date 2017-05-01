import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import {PostDetailsPage,AddEditPostPage} from '../index';
import { PostService, IPostService } from './post.service';

@NgModule({
    declarations:[PostDetailsPage,AddEditPostPage],    
    exports:[PostDetailsPage, AddEditPostPage],
    entryComponents:[AddEditPostPage, PostDetailsPage],
    imports:[IonicModule, FormsModule],
    providers:[PostService]
})

export class PostModule{}