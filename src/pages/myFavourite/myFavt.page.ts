import { Component, OnInit, Inject, EventEmitter, Input, Output ,
    NavController, NavParams, ToastController, Events ,
     Http, Headers, Response, RequestOptions, URLSearchParams, Jsonp } from '../common/index';

import { Observable } from 'rxjs';
import { PostDetailsPage, AddEditPostPage ,HomePage,LoginPage } from '../index'
import { Post, Result} from '../../app/models/index';
import { IPostService, PostService } from '../post/post.service';
import { AuthGuard, IAuthGuard , StorageService } from '../../app/services/index';

@Component({
    selector: 'my-favts-page',
    templateUrl: 'my-favt.html'
})
export class MyFavtPostingPage implements OnInit {

    @Output() onPost = new EventEmitter<boolean>();

    selectedCategory: string;
    items: string[];
    subCategories: string[];
    isSubCategorySelected: boolean;
    params: URLSearchParams;
    private isUserAuthenticated: boolean = false;
    private myFavtsPostData: Array<Post> = [];
    private viewType: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        @Inject(AuthGuard) public authGuard: IAuthGuard,
        public toastCtrl: ToastController,
        public events: Events,
        @Inject(PostService) public postService: IPostService) {
        // If we navigated to this page, we will have an item available as a nav param

        //this.navCtrl.pop();
        this.viewType = 'list';
        this.params = new URLSearchParams();
    }

    ngOnInit() {
        this.isUserAuthenticated = this.authGuard.canActivate();
        if (!this.isUserAuthenticated) {
            this.navCtrl.setRoot(LoginPage);
        } else {
            this.getMyFavtPostData();

        }
    }

    getMyFavtPostData() {        
        this.postService.getFavorite().subscribe((result) => {
            this.myFavtsPostData = result;
        });
    }

    gotoAddPostingsPage() {
        this.navCtrl.push(AddEditPostPage);
    }

}
