import { Component } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {PostService} from "../services/post.service";
import {Post} from "../models/post.model";
import {MainPagePostComponent} from "../main-page-post/main-page-post.component";
import {TopbarComponent} from "../topbar/topbar.component";
import {FullPostComponent} from "../full-post/full-post.component";
import {RouterOutlet} from "@angular/router";
import { User } from '../models/user.model';
import { PostListComponent } from '../post-list/post-list.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: "app-main-page-layout",
  standalone: true,
  imports: [
    SidebarComponent,
    MainPagePostComponent,
    TopbarComponent,
    PostListComponent,
    FullPostComponent,
    RouterOutlet,
  ],
  templateUrl: "./main-page-layout.component.html",
  styleUrl: "./main-page-layout.component.css",
})
export class MainPageLayoutComponent {
  userConnected !: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getUserLoggedIn$()
      .subscribe(user => {
        this.userConnected = user as User;
        // console.log(this.userConnected);

        console.log(this.userConnected);
        
      })    



  }

  onOutletLoaded(component: { userConnected: User; }) {
    component.userConnected = this.userConnected;
} 

  userConnectedIsLoaded() {
    return this.userConnected !== undefined;
  }
}
