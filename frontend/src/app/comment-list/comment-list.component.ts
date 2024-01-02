import {Component, EventEmitter, Input, Output} from "@angular/core";
import { Comment } from "../models/comment.model";
import { CommentService } from "../services/comment.service";
import { Post } from "../models/post.model";
import { DateAgoPipe } from "../pipes/date-ago.pipe";
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: "app-comment-list",
  standalone: true,
  imports: [DateAgoPipe, RouterLink, FormsModule],
  templateUrl: "./comment-list.component.html",
  styleUrl: "./comment-list.component.css",
})
export class CommentListComponent {
  commentList!: Comment[];
  loaded!: number;
  @Input() post!: Post;
  @Output() cancelButtonClick = new EventEmitter<void>();
  @Input() write!:boolean;
  contentComment!: string;

  constructor(private commentService: CommentService,
              private router: Router) {}

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


  cancelButtonClicked() {
    this.cancelButtonClick.emit();
  }

  onSubmitComment(f:NgForm){
    this.contentComment = ""

    if (f.value.comment != ""){
      console.log("prout")
      this.contentComment = f.value.comment;

      // TODO faire le lien avec le backend

      this.cancelButtonClick.emit();
    }
  }
}
