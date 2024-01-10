import { Component, Input } from "@angular/core";
import { Post } from "../models/post.model";
import { PostService } from "../services/post.service";
import { DateAgoPipe } from "../pipes/date-ago.pipe";
import { Router, RouterLink } from "@angular/router";
import { Comment } from "../models/comment.model";
import { CommentService } from "../services/comment.service";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";
import { NgClass, NgStyle } from "@angular/common";

@Component({
  selector: "app-main-page-post",
  standalone: true,
  imports: [DateAgoPipe, RouterLink, NgClass, NgStyle],
  templateUrl: "./main-page-post.component.html",
  styleUrl: "./main-page-post.component.css",
})
export class MainPagePostComponent {
  @Input() post!: Post;
  @Input() userConnected!: User;
  imageStyle!: string;
  isLike!: boolean;
  nbLike!: number;
  firstComment!: Comment;
  description!: string;

  constructor(
    protected postService: PostService,
    private router: Router,
    private commentService: CommentService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    const wordsCount = this.post.description.split(" ").length;
    const points = wordsCount > 20 ? " ..." : "";
    this.description =
      this.post.description.split(" ").slice(0, 20).join(" ") + points;
    this.imageStyle = "url(" + this.post.image_url + ")";
    this.isLike = this.isLikeByConnectedUser();
    this.nbLike = this.post.likes.length;
    try {
      this.commentService
        .getCommentsByPostIdFromLimit(this.post.id, 1, 1)
        .subscribe((comment) => {
          this.firstComment = comment[0];
        });
    } catch {}
  }

  userIsLoaded() {
    return this.post.user !== undefined;
  }

  onViewPost() {
    this.router.navigateByUrl(`post/${this.post.id}`);
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
}
