import {Component, Input} from '@angular/core';
import {Post} from "../models/post.model";
import {PostService} from "../services/post.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DateAgoPipe} from "../pipes/date-ago.pipe";
import {UserService} from "../services/user.service";
import {User} from "../models/user.model";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    DateAgoPipe,
    RouterLink
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  @Input() posts!: Post[]
  @Input() users!: User[]
  @Input() searchContent!: string
  // searchContent = this.route.snapshot.params['content'];


  constructor(protected postService: PostService,
              protected userService: UserService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.posts = []
    this.users = []
    this.searchContent = this.route.snapshot.params['content'];
    console.log(this.searchContent)

    this.userService.getUsersByTerm(this.searchContent)
        .subscribe(data => {
          this.users = data;
        })
    console.log(this.users)
    // this.posts = this.postService.getPostsBySearch(this.searchContent);
    this.postService.getPostsBySearchTerm(this.searchContent)
        .subscribe(data => {
          this.posts = data;
        })
    console.log(this.posts)
  }

}
