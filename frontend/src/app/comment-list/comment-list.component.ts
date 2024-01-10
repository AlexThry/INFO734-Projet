import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { Comment } from "../models/comment.model";
import { CommentService } from "../services/comment.service";
import { Post } from "../models/post.model";
import { DateAgoPipe } from "../pipes/date-ago.pipe";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormsModule, NgForm } from "@angular/forms";
import { User } from "../models/user.model";
import { NgStyle } from "@angular/common";
declare var $: any;

@Component({
  selector: "app-comment-list",
  standalone: true,
  imports: [DateAgoPipe, RouterLink, FormsModule, NgStyle],
  templateUrl: "./comment-list.component.html",
  styleUrl: "./comment-list.component.css",
})
export class CommentListComponent {
  commentList!: Comment[];
  loaded!: number;
  @Input() post!: Post;
  @Input() userConnected!: User;
  @Output() cancelButtonClick = new EventEmitter<void>();
  @Input() write!: boolean;
  contentComment!: string;

  constructor(
    private commentService: CommentService,
    private router: Router,
    private elementRef: ElementRef,
  ) {}

  ngOnInit() {
    this.loaded = 10;
    this.commentService
      .getCommentsByPostIdFromLimit(this.post.id, 0, this.loaded)
      .subscribe((data) => {
        console.log(data);
        this.commentList = data;
      });
  }

  loadMore() {
    this.commentService
      .getCommentsByPostIdFromLimit(this.post.id, this.loaded, 10)
      .subscribe((data) => {
        this.commentList.push(...data);
        this.loaded += 10;
      });
  }

  commentAreLoaded() {
    return this.commentList !== undefined;
  }

  cancelButtonClicked() {
    this.cancelButtonClick.emit();
  }

  onSubmitComment(f: NgForm) {
    this.contentComment = "";

    if (f.value.comment != "") {
      this.contentComment = f.value.comment;

      this.loaded = 10;

      this.commentService
        .createcomment(
          this.post.id.toString(),
          this.userConnected.id.toString(),
          this.contentComment,
        )
        .subscribe(() => {
          this.commentService
            .getCommentsByPostIdFromLimit(this.post.id, 0, this.loaded)
            .subscribe((data) => {
              this.commentList = data;
            });
        });

      this.cancelButtonClick.emit();
    }
  }
}
