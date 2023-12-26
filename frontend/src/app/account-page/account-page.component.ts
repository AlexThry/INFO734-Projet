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

  constructor(
    protected postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
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
    });
  }
}
