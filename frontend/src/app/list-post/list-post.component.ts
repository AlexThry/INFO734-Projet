import { Component, OnInit } from "@angular/core";
import { MainPagePostComponent } from "../main-page-post/main-page-post.component";
import { Post } from "../models/post.model";
import { PostService } from "../services/post.service";
import { NgForOf } from "@angular/common";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-list-post",
  standalone: true,
  imports: [MainPagePostComponent, NgForOf],
  templateUrl: "./list-post.component.html",
  styleUrl: "./list-post.component.css",
})
export class ListPostComponent implements OnInit {
  posts!: Post[];
  postTest!: Post;

  constructor(
    private postService: PostService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.postService.getAllPost().subscribe((data) => {
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
}
