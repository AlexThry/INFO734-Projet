import { Component, Input } from "@angular/core";
import { Post } from "../models/post.model";
import { PostService } from "../services/post.service";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from "@angular/router";
import { DateAgoPipe } from "../pipes/date-ago.pipe";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";
import { NgStyle } from "@angular/common";

@Component({
  selector: "app-search-page",
  standalone: true,
  imports: [DateAgoPipe, RouterLink, NgStyle],
  templateUrl: "./search-page.component.html",
  styleUrl: "./search-page.component.css",
})
export class SearchPageComponent {
  @Input() posts!: Post[];
  @Input() users!: User[];
  @Input() searchContent!: string;
  // searchContent = this.route.snapshot.params['content'];

  constructor(
    protected postService: PostService,
    protected userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.posts = [];
    this.users = [];
    this.searchContent = this.route.snapshot.params["content"];
    console.log(this.searchContent);

    this.userService.getUsersByTerm(this.searchContent).subscribe((data) => {
      this.users = data;
    });
    console.log(this.users);
    // this.posts = this.postService.getPostsBySearch(this.searchContent);
    this.postService
      .getPostsBySearchTerm(this.searchContent)
      .subscribe((data) => {
        this.posts = data;
      });
    console.log(this.posts);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.refreshComponent();
      }
    });
  }

  refreshComponent() {
    this.posts = [];
    this.users = [];
    this.searchContent = this.route.snapshot.params["content"];
    console.log(this.searchContent);

    this.userService.getUsersByTerm(this.searchContent).subscribe((data) => {
      this.users = data;
    });
    this.postService
      .getPostsBySearchTerm(this.searchContent)
      .subscribe((data) => {
        this.posts = data;
      });
  }
}
