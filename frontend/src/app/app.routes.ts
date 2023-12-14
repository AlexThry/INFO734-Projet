import { Routes } from '@angular/router';
import {FullPostComponent} from "./full-post/full-post.component";
import {ListPostComponent} from "./list-post/list-post.component";

export const routes: Routes = [
    {path: 'posts/:id', component: FullPostComponent},
    {path: '', component: ListPostComponent}
];
