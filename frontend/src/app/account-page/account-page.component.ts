import {Component, Input} from '@angular/core';
import {Post} from "../models/post.model";
import {Account} from "../models/account.model";
import {PostService} from "../services/post.service";
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent {
  @Input() post!: Post
  @Input() account!: Account

  constructor(protected postService: PostService,
              protected accountService: AccountService,
              private route: ActivatedRoute) {}
  ngOnInit() {
    const accountId = +this.route.snapshot.params['id'];
    this.account = this.accountService.getAccountById(accountId);
  }

  protected readonly length = length;
}
