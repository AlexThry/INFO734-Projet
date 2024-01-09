import { Component, Input } from "@angular/core";
import { Post } from "../models/post.model";
import { PostService } from "../services/post.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { AccountPostListComponent } from "../account-post-list/account-post-list.component";

@Component({
  selector: "app-account-page",
  standalone: true,
  imports: [RouterLink, AccountPostListComponent],
  templateUrl: "./account-page.component.html",
  styleUrl: "./account-page.component.css",
})
export class AccountPageComponent {
  user!: User;
  posts!: Post[];
  @Input() userConnected!: User;
  nbPosts!: number;
  nbFollower!: number;
  nbFollowing!: number;

  constructor(
    protected postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    // Nb Post
    this.route.params.subscribe(() => {
      let id = this.route.snapshot.params["id"];
      this.postService
          .getPostsByUserIdFromLimit(id, 0, 1000)
          .subscribe((posts) => {
            this.nbPosts = posts.length;
          });
    });


    this.route.params.subscribe(() => {
      this.loadData();
    });


  }

  userIsLoaded() {
    return this.user !== undefined;
  }

  loadData() {
    const userId = this.route.snapshot.params["id"];
    this.userService.getUserById(userId).subscribe((user) => {
      this.user = user;
      console.log(this.user)
    });
  }
}
