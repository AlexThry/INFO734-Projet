import {Component, Input} from '@angular/core';
import {DateAgoPipe} from "../pipes/date-ago.pipe";
import {Post} from "../models/post.model";
import {PostService} from "../services/post.service";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-full-post',
  standalone: true,
    imports: [
        DateAgoPipe,
        RouterLink
    ],
  templateUrl: './full-post.component.html',
  styleUrl: './full-post.component.css'
})
export class FullPostComponent {
  @Input() post!: Post
  imageStyle!: string

  constructor(protected postService: PostService, private route: ActivatedRoute) {}

  // ngOnInit() {
  //   const postId = +this.route.snapshot.params['id'];
  //   this.post = this.postService.getPostById(postId);
  //   this.imageStyle = "url(" + this.post.imageUrl + ")"
  // }
}
