import { HeaderComponent } from '../components/layout/header.component';
import { HomePage } from '../../pages/home/home.page';
import { Welcome } from '../../pages/welcome/welcome.page';

import { SettingsPage } from '../../pages/settings/settings.page';
import { NotificationPage } from '../../pages/notification/notification.page';
import { AdminPage } from '../../pages/admin/admin.page';
import { MyPostingsPage } from '../../pages/myPostings/myPostings.page';
import { FiltersPage } from '../../pages/filters/filters.page';
import { FeedbackPage } from '../../pages/feedback/feedback.page';
import { HelpPage } from '../../pages/help/help.page';
import { Rating } from '../components/rating';
import { CategoryComponent } from '../components/category';

import {OrderBy} from '../pipes/orderBy';

export const AppComponents = [
    HeaderComponent,
    HomePage,
    Welcome,
    SettingsPage,
    NotificationPage,
    MyPostingsPage,
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

export const customPipes = [
    OrderBy
];

export const appPages = [
    { title: 'Home', component: HomePage, name: "home", seq: 1 },
    { title: 'About', component: HomePage, name: "book", seq: 7 },
    { title: 'Feedback', component: FeedbackPage, name: "paper", seq: 6 },
    { title: 'Help', component: HelpPage, name: "help-circle", seq: 8 }

];

export const authPages = [
    { title: 'Admin', component: AdminPage, name: "person", seq: 2 },
    { title: 'My Postings', component: MyPostingsPage, name: "paper", seq: 3 },
    { title: 'Favourites', component: SettingsPage, name: "star", seq: 4 },
    { title: 'Settings', component: SettingsPage, name: "settings", seq: 5 }
];