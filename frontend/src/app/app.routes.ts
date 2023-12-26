import { Routes } from "@angular/router";
import { FullPostComponent } from "./full-post/full-post.component";
import { PostListComponent } from "./post-list/post-list.component";
import { AccountPageComponent } from "./account-page/account-page.component";
import { SearchPageComponent } from "./search-page/search-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { NewPostPageComponent } from "./new-post-page/new-post-page.component";

export const routes: Routes = [
  // { path: "post/:id", component: FullPostComponent, canActivate: [ AuthGuard ] },
  { path: "post/:id", component: FullPostComponent },
  { path: "create", component: NewPostPageComponent },
  { path: "account/:id", component: AccountPageComponent },
  { path: "search/:content", component: SearchPageComponent },
  { path: "home", component: PostListComponent },
  { path: "register", component: RegisterPageComponent },
  { path: "", component: LoginPageComponent },
  { path: "**", redirectTo: "/home" },
];
