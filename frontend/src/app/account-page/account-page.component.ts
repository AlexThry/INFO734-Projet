import { Component, Input } from "@angular/core";
import { Post } from "../models/post.model";
import { PostService } from "../services/post.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { AccountPostListComponent } from "../account-post-list/account-post-list.component";
import {log} from "node:util";

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
  follow!: boolean;

  constructor(
    protected postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    // console.log(this.userConnected.id)
    this.userService.getUserById(this.route.snapshot.params["id"])
        .subscribe((user)=>{this.follow = user.followers.includes(this.userConnected.id)})
    // this.follow = this.followers.includes(this.userConnected.id);

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

  followUser(){
    console.log("ca marche")
    console.log(this.userConnected.id.toString(), this.route.snapshot.params["id"])
    this.userService.followOtherUser(this.userConnected.id.toString(), this.route.snapshot.params["id"])
        .subscribe(
            ([result1, result2]) => {
              // Handle the results of both requests
              console.log('Result of request 1:', result1);
              console.log('Result of request 2:', result2);
            },
            error => {
              // Handle errors
              console.error('Error:', error);
            }
        );
    this.follow = true;
  }
}
