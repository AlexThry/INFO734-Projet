import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { initFlowbite } from "flowbite";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { MainPagePostComponent } from "./main-page-post/main-page-post.component";
import { Post } from "./models/post.model";
import { PostService } from "./services/post.service";
import { MainPageLayoutComponent } from "./main-page-layout/main-page-layout.component";
import { PostListComponent } from "./post-list/post-list.component";
import { Router } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    TopbarComponent,
    MainPagePostComponent,
    PostListComponent,
    MainPageLayoutComponent,
    LoginPageComponent,
    RegisterPageComponent,
  ],
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "web-app";
  posts!: Post[];

  constructor(
    private postService: PostService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    initFlowbite();
    // this.posts = this.postService.getPosts()
  }

  isRoute(route: string): boolean {
    return this.router.url === route;
  }
}
