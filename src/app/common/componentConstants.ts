import { HeaderComponent } from '../components/layout/header.component';
import { HomePage } from '../../pages/home/home.page';
import { ProfilePage } from '../../pages/profile/profile.page';
import { Welcome } from '../../pages/welcome/welcome.page';
import { SettingsPage } from '../../pages/settings/settings.page';
import { NotificationPage } from '../../pages/notification/notification.page';
import { CatalogPage } from '../../pages/catalog/catalog.page';
import { ProductPage } from '../../pages/product/product.page';
import { MyPostingsPage } from '../../pages/myPostings/myPostings.page';
import { PostNewAdPage } from '../../pages/postnewad/postnewad.page';
import { SearchPage } from '../../pages/search/search.page';
import { FiltersPage } from '../../pages/filters/filters.page';
import { FeedbackPage } from '../../pages/feedback/feedback.page';
import { HelpPage } from '../../pages/help/help.page';
import { Rating } from '../components/rating';
import { CategoryComponent } from '../components/category';

export const myComponents = [
   HeaderComponent,
   HomePage,
   ProfilePage,
   Welcome,
   SettingsPage,
   NotificationPage,
   CatalogPage,
   ProductPage,
   MyPostingsPage,
   PostNewAdPage,
   SearchPage,
   FiltersPage,
   FeedbackPage, 
   HelpPage, 
   Rating, 
   CategoryComponent
];

export const featuredComponents = [
   FiltersPage, 
   FeedbackPage, 
   HelpPage, 
   CategoryComponent

]