import { AccountModule } from '../../pages/account/account.module';
import { AdminModule }   from '../../pages/admin/admin.module';
import {PostModule} from '../../pages/post/post.module';
import {ProfileModule} from '../../pages/profile/profile.module';
import {SearchModule} from '../../pages/search/search.module';

export const AppModules = [
   AccountModule,
   SearchModule,
   AdminModule,
   PostModule,
   ProfileModule
];