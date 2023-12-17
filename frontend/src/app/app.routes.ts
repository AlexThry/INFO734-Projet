import { Routes } from '@angular/router';
import {FullPostComponent} from "./full-post/full-post.component";
import {ListPostComponent} from "./list-post/list-post.component";
import {AccountPageComponent} from "./account-page/account-page.component";
import {SearchPageComponent} from "./search-page/search-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";

export const routes: Routes = [
    {path: 'posts/:id', component: FullPostComponent},
    {path: 'account/:id', component: AccountPageComponent},
    {path: 'search/:content', component: SearchPageComponent},
    {path: 'home', component: ListPostComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: '', component: LoginPageComponent}
];
