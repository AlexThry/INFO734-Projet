import { Component, Input } from "@angular/core";
import { Post } from "../models/post.model";
import { DateAgoPipe } from "../pipes/date-ago.pipe";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-account-post",
  standalone: true,
  imports: [DateAgoPipe, RouterLink],
  templateUrl: "./account-post.component.html",
  styleUrl: "./account-post.component.css",
})
export class AccountPostComponent {
  @Input() post!: Post;

  constructor(private router: Router) {}

  onViewPost() {
    this.router.navigateByUrl(`post/${this.post.id}`);
  }
}
