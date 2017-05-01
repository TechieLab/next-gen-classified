import {
    HomePage, WelcomePage, SettingsPage, NotificationPage, AdminPage,
    MyPostingsPage, OfferPage, MyFavtPostingPage,
     FiltersPage, FeedbackPage, HelpPage, AboutUsPage, ChatPage
} from '../../pages/index';

export const Pages = [
    AboutUsPage,
    HomePage,
    AdminPage,
    WelcomePage,
    SettingsPage,
    NotificationPage,
    MyPostingsPage,
    OfferPage,
    MyFavtPostingPage,
    FiltersPage,
    FeedbackPage,
    HelpPage
];

export const EntryComponents = [
    FiltersPage,
    FeedbackPage,
    HelpPage,
];

export const appPages = [
    { title: 'Home', component: HomePage, name: "home", seq: 1 },
    { title: 'About', component: AboutUsPage, name: "people", seq: 7 },
    { title: 'Feedback', component: FeedbackPage, name: "paper", seq: 6 },
    { title: 'Help', component: HelpPage, name: "help-circle", seq: 8 }
];

export const authPages = [
    { title: 'Admin', component: AdminPage, name: "person", seq: 2 },
    { title: 'My Postings', component: MyPostingsPage, name: "paper", seq: 3 },
    { title: 'Favourites', component: MyFavtPostingPage, name: "star", seq: 4 },
    { title: 'Settings', component: SettingsPage, name: "settings", seq: 5 },
    { title: 'Chats', component: ChatPage, name: "settings", seq: 9 }
];