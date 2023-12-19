import {Component, Input} from '@angular/core';
import {Post} from "../models/post.model";
import {Account} from "../models/account.model";
import {PostService} from "../services/post.service";
import {AccountService} from "../services/account.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DateAgoPipe} from "../pipes/date-ago.pipe";

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
  @Input() accounts!: Account[]
  @Input() searchContent!: string

  constructor(protected postService: PostService,
              protected accountService: AccountService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    // this.searchContent = this.route.snapshot.params['content'];
    // this.accounts = this.accountService.getAccountsBySearch(this.searchContent);
    // this.posts = this.postService.getPostsBySearch(this.searchContent);
  }

}
