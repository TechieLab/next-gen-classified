import { Component, OnInit, Inject, NavController, AlertController, NavParams } from '../common/index';
import { PostDetailsPage, AddEditPostPage, LoginPage } from '../index';
import { Post } from '../../app/models/post';
import { IPostService, PostService } from '../post/post.service';
import { AuthGuard, IAuthGuard } from '../../app/services/guard.service';

@Component({
    selector: 'my-postings-page',
    templateUrl: 'my-postings.html'
})
export class MyPostingsPage implements OnInit {
    selectedCategory: string;
    items: string[];
    subCategories: string[];
    isSubCategorySelected: boolean;
    myPostingsData: Array<Post>;
    private isUserAuthenticated: boolean = false;

    constructor(public navCtrl: NavController, public alertCtrl: AlertController,
        public navParams: NavParams,
        @Inject(AuthGuard) public authGuard: IAuthGuard,
        @Inject(PostService) public postService: IPostService) {
        // If we navigated to this page, we will have an item available as a nav param

        //this.navCtrl.pop();
    }

    ngOnInit() {
        this.isUserAuthenticated = this.authGuard.canActivate();
        if (!this.isUserAuthenticated) {
            this.navCtrl.setRoot(LoginPage);
        } else {
            this.getMyPostingsData();
        }
    }

    getMyPostingsData() {
        this.postService.get().subscribe((response) => {
            this.myPostingsData = response
        });
    }

    showProductDetails(itemId: string) {
        this.navCtrl.push(PostDetailsPage, { editPermission: true, _id: itemId });
    }

    gotoAddPostingsPage() {
        this.navCtrl.push(AddEditPostPage);
    }

    editPost(post: Post) {
        this.navCtrl.push(AddEditPostPage, { _id: post._id });
    }

    deletePost(post: Post) {
        this.postService.del(post._id).subscribe((res) => {
            if (res) {
                let alert = this.alertCtrl.create({
                    title: 'Post Removed Succesfully',
                    buttons: [{
                        text: 'Ok',
                        handler: () => {
                            this.getMyPostingsData();
                        }
                    }]
                });
                alert.present();
            }
        });
    }

    showDeleteConfirm(post: Post) {
        let confirm = this.alertCtrl.create({
            title: 'Delete Post',
            message: 'Are you sure you want to remove?',
            buttons: [
                {
                    text: 'Disagree',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Agree',
                    handler: () => {
                        this.deletePost(post);
                    }
                }
            ]
        });
        confirm.present();
    }
}
