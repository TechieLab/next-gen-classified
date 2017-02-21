

import { ILookupService, LookupService } from '../services/lookup.service';
import { IPostService, PostService } from '../services/post.service';
import { IProductService, ProductService } from '../services/product.service';
import { IUserService, UserService } from '../services/user.service';
import { AuthGuard } from '../services/guard.service';

export const AppProviders = [
    { provide: LookupService, useClass: LookupService },
    // { provide: AccountService, useClass: AccountService },
    { provide: PostService, useClass: PostService },
    { provide: ProductService, useClass: ProductService },
     { provide: UserService, useClass: UserService },
     {provide: AuthGuard , useClass: AuthGuard}
];