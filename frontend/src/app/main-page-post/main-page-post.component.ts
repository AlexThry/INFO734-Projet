import {Component, Input} from '@angular/core';
import {Post} from "../models/post.model";
import {PostService} from "../services/post.service";
import {DateAgoPipe} from "../pipes/date-ago.pipe";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page-post',
  standalone: true,
  imports: [
    DateAgoPipe,
  ],
  templateUrl: './main-page-post.component.html',
  styleUrl: './main-page-post.component.css'
})
export class MainPagePostComponent {
  @Input() post!: Post
  imageStyle!: string

  constructor(protected postService: PostService,
              private router : Router) {}

  ngOnInit() {
    this.imageStyle = "url(" + this.post.image_url + ")";
    console.log(this.post);
    
  }

  userIsLoaded() {
    return this.post.user !== undefined;
  }

  onViewCard() {
    this.router.navigateByUrl(`posts/${this.post.id}`)
  }

  isLikeByConnectedUser() {
    // TODO - Récupérer l'id de l'user connected
    const userConnectedID = "657c380b55f994f1b9fd2fdb";
    
    return this.post.likes.includes(userConnectedID);
  }

  onPostLike() {
    // TODO - Récupérer l'id de l'user connected
    const userConnectedID = "657c380b55f994f1b9fd2fdb";

    if (this.post.likes.includes(userConnectedID)) {
      this.postService.actionPostById(this.post.id, userConnectedID, 'unlike');
    }
    else {
      this.postService.actionPostById(this.post.id, userConnectedID, 'like');
    }
  }

}
