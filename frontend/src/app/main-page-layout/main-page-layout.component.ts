import { Component } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {PostService} from "../services/post.service";
import {Post} from "../models/post.model";
import {MainPagePostComponent} from "../main-page-post/main-page-post.component";
import {TopbarComponent} from "../topbar/topbar.component";

@Component({
  selector: 'app-main-page-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    MainPagePostComponent,
    TopbarComponent
  ],
  templateUrl: './main-page-layout.component.html',
  styleUrl: './main-page-layout.component.css'
})
export class MainPageLayoutComponent {
  posts!: Post[]
  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.posts = this.postService.getPosts()
  }
}
