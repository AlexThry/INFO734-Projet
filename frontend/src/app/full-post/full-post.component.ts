import { Component, ElementRef, Input, Output } from "@angular/core";
import { DateAgoPipe } from "../pipes/date-ago.pipe";
import { Post } from "../models/post.model";
import { PostService } from "../services/post.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommentService } from "../services/comment.service";
import { Comment } from "../models/comment.model";
import { CommentListComponent } from "../comment-list/comment-list.component";
import { Location, NgClass, NgStyle } from "@angular/common";
import { User } from "../models/user.model";

@Component({
  selector: "app-full-post",
  standalone: true,
  imports: [DateAgoPipe, RouterLink, CommentListComponent, NgClass, NgStyle],
  templateUrl: "./full-post.component.html",
  styleUrl: "./full-post.component.css",
})
export class FullPostComponent {
  @Input() post!: Post;
  @Input() userConnected!: User;
  imageStyle!: string;
  isLike!: boolean;
  nbLike!: number;
  comments!: Comment[];
  write: boolean = false;

  constructor(
    protected postService: PostService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private location: Location,
    private elementRef: ElementRef,
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.params["id"];

    this.postService.getPostById(postId).subscribe((data) => {
      this.post = data;
      this.imageStyle = "url(" + this.post.image_url + ")";

      this.isLike = this.isLikeByConnectedUser();
      this.nbLike = this.post.likes.length;
      this.commentService
        .getAllCommentsByPostId(this.post.id)
        .subscribe((data) => {
          this.post.setListComment(data);
        });
    });
  }

  postIsLoaded() {
    return this.post !== undefined;
  }

  isLikeByConnectedUser() {
    // TODO - Récupérer l'id de l'user connected
    const userConnectedID = this.userConnected.id.toString();

    return this.post.likes.includes(userConnectedID);
  }

  onPostLike() {
    // TODO - Récupérer l'id de l'user connected
    const userConnectedID = this.userConnected.id.toString();

    this.isLike = !this.isLike;

    if (!this.isLike) {
      this.postService.actionPostById(this.post.id, userConnectedID, "unlike");
      this.nbLike -= 1;
    } else {
      this.postService.actionPostById(this.post.id, userConnectedID, "like");
      this.nbLike += 1;
    }
  }

  addComment() {
    this.write = true;
    setTimeout(() => {
      const textareas: NodeListOf<HTMLTextAreaElement> =
        this.elementRef.nativeElement.querySelectorAll("textarea");
      textareas.forEach((textarea: HTMLTextAreaElement) => {
        textarea.setAttribute(
          "style",
          "height:" + textarea.scrollHeight + "px;overflow-y:hidden;",
        );
      });

      textareas.forEach((textarea: HTMLTextAreaElement) => {
        textarea.addEventListener("input", function () {
          this.style.height = "auto";
          this.style.height = this.scrollHeight + "px";
        });
      });
    }, 10);
  }

  cancelComment() {
    this.write = false;
  }

  goBack() {
    this.location.back();
  }
}
