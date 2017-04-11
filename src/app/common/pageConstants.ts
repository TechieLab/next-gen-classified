import { HomePage } from '../../pages/home/home.page';
import { WelcomePage } from '../../pages/welcome/welcome.page';
import { SettingsPage } from '../../pages/settings/settings.page';
import { NotificationPage } from '../../pages/notification/notification.page';
import { AdminPage } from '../../pages/admin/admin.page';
import { MyPostingsPage } from '../../pages/myPostings/myPostings.page';
import { OfferPage } from '../../pages/offers/offers.page';
import { MyFavtPostingPage } from '../../pages/myFavourite/myFavt.page';
import { FiltersPage } from '../../pages/filters/filters.page';
import { FeedbackPage } from '../../pages/feedback/feedback.page';
import { HelpPage } from '../../pages/help/help.page';

export const Pages = [
    HomePage,
    WelcomePage,
    SettingsPage,
    NotificationPage,
    MyPostingsPage,
    OfferPage,
    MyFavtPostingPage,
    FiltersPage,
    FeedbackPage,
    HelpPage,
];

export const EntryComponents = [
    FiltersPage,
    FeedbackPage,
    HelpPage,
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
    { title: 'Favourites', component: MyFavtPostingPage, name: "star", seq: 4 },
    { title: 'Settings', component: SettingsPage, name: "settings", seq: 5 }
];