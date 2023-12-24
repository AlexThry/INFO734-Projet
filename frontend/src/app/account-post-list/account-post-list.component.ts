import { Component } from "@angular/core";
import { PostService } from "../services/post.service";
import { Post } from "../models/post.model";
import { routes } from "../app.routes";
import { ActivatedRoute, Router } from "@angular/router";
import { error } from "@angular/compiler-cli/src/transformers/util";
import { load } from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-loader/loader-hooks";
import { DateAgoPipe } from "../pipes/date-ago.pipe";
import { AccountPostComponent } from "../account-post/account-post.component";

@Component({
  selector: "app-account-post-list",
  standalone: true,
  imports: [DateAgoPipe, AccountPostComponent],
  templateUrl: "./account-post-list.component.html",
  styleUrl: "./account-post-list.component.css",
})
export class AccountPostListComponent {
  posts!: Post[];
  loaded!: number;
  userId!: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loaded = 10;
    this.userId = this.route.snapshot.params["id"];
    this.postService
      .getPostsByUserIdFromLimit(this.userId, 0, this.loaded)
      .subscribe((posts) => {
        this.posts = posts;
      });
  }

  loadMore() {
    console.log(
      this.postService
        .getPostsByUserIdFromLimit(this.userId, this.loaded, this.loaded + 10)
        .subscribe((posts) => {
          this.posts.push(...posts);
          this.loaded += 10;
        }),
    );
  }

  postsAreLoaded() {
    return this.posts !== undefined;
  }
}
