import { HeaderComponent } from '../components/layout/header.component';
import { HomePage } from '../../pages/home/home.page';
import { ProfilePage } from '../../pages/profile/profile.page';
import { Welcome } from '../../pages/welcome/welcome.page';
import { ConfirmationPage } from '../../pages/account/confirmation.page';
import { SettingsPage } from '../../pages/settings/settings.page';
import { NotificationPage } from '../../pages/notification/notification.page';
import { CatalogPage } from '../../pages/catalog/catalog.page';
import { ProductPage } from '../../pages/product/product.page';
import { AdminPage } from '../../pages/admin/admin.page';
import { MyPostingsPage } from '../../pages/myPostings/myPostings.page';
import { PostNewAdPage } from '../../pages/postnewad/postnewad.page';
import { SearchPage } from '../../pages/search/search.page';
import { FiltersPage } from '../../pages/filters/filters.page';
import { FeedbackPage } from '../../pages/feedback/feedback.page';
import { HelpPage } from '../../pages/help/help.page';
import { Rating } from '../components/rating';
import { CategoryComponent } from '../components/category';

export const AppComponents = [
    HeaderComponent,
    HomePage,
    ProfilePage,
    ConfirmationPage,
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
];

export const pages = [
    { title: 'Home', component: HomePage, name: "home" },
    { title: 'Admin', component: AdminPage, name: "person" },
    { title: 'My Postings', component: MyPostingsPage, name: "paper" },
    { title: 'Favourites', component: SettingsPage, name: "star" },
    { title: 'About', component: HomePage, name: "book" },
    { title: 'Settings', component: SettingsPage, name: "settings" },
    { title: 'Feedback', component: FeedbackPage, name: "paper" },
    { title: 'Help', component: HelpPage, name: "help-circle" }
];