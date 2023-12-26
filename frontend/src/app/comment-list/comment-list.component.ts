import { Component, Input } from "@angular/core";
import { Comment } from "../models/comment.model";
import { CommentService } from "../services/comment.service";
import { Post } from "../models/post.model";
import { DateAgoPipe } from "../pipes/date-ago.pipe";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-comment-list",
  standalone: true,
  imports: [DateAgoPipe, RouterLink],
  templateUrl: "./comment-list.component.html",
  styleUrl: "./comment-list.component.css",
})
export class CommentListComponent {
  commentList!: Comment[];
  loaded!: number;
  @Input() post!: Post;

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.loaded = 10;
    this.commentService
      .getCommentsByPostIdFromLimit(this.post.id, 0, this.loaded)
      .subscribe((data) => {
        this.commentList = data;
      });
  }

  loadMore() {
    this.commentService
      .getCommentsByPostIdFromLimit(this.post.id, this.loaded + 1, 10)
      .subscribe((data) => {
        this.commentList.push(...data);
        this.loaded += 10;
      });
  }

  commentAreLoaded() {
    return this.commentList !== undefined;
  }
}
