import {Component, Input} from '@angular/core';
import {Post} from "../models/post.model";
import {PostService} from "../services/post.service";
import {DateAgoPipe} from "../pipes/date-ago.pipe";

@Component({
  selector: 'app-main-page-post',
  standalone: true,
  imports: [
    DateAgoPipe
  ],
  templateUrl: './main-page-post.component.html',
  styleUrl: './main-page-post.component.css'
})
export class MainPagePostComponent {
  @Input() post!: Post
  imageStyle!: string

  constructor(protected postService: PostService) {}

  ngOnInit() {
    this.imageStyle = "url(" + this.post.imageUrl + ")"
  }
  onViewCard() {
  }

}
