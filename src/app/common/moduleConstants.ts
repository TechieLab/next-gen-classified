import { AccountModule } from '../../pages/account/account.module';
import {PostModule} from '../../pages/post/post.module';
import {ProfileModule} from '../../pages/profile/profile.module';
import {SearchModule} from '../../pages/search/search.module';
import {CatalogModule} from '../../pages/catalog/catalog.module';
import {ChatModule} from '../../pages/chat/chat.module';

export const AppModules = [
   AccountModule,
   SearchModule,
   PostModule,
   ProfileModule,
   CatalogModule,
   ChatModule
];