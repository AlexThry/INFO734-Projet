import { Component, Input, OnInit } from "@angular/core";
import { MainPagePostComponent } from "../main-page-post/main-page-post.component";
import { Post } from "../models/post.model";
import { PostService } from "../services/post.service";
import { NgForOf } from "@angular/common";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";

@Component({
  selector: "app-post-list",
  standalone: true,
  imports: [MainPagePostComponent, NgForOf],
  templateUrl: "./post-list.component.html",
  styleUrl: "./post-list.component.css",
})
export class PostListComponent implements OnInit {
  posts!: Post[];
  loaded!: number;
  @Input() userConnected !: User;

  constructor(
    private postService: PostService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.loaded = 10;
    this.postService.getPostsFromLimit(0, this.loaded).subscribe((data) => {
      this.posts = data;      
    });

    this.userService
      .getUserById("657b47c90a157aa8e0d66d87")
      .subscribe((data) => {
        // console.log(data);
      });      
  }

  postsAreLoaded() {
    return this.posts !== undefined;
  }

  loadMore() {
    this.postService
      .getPostsFromLimit(this.loaded, this.loaded + 10)
      .subscribe((posts) => {
        this.posts.push(...posts);
      });
  }
}
