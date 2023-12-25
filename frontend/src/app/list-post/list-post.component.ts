import {Component, Input, OnInit} from '@angular/core';
import {MainPagePostComponent} from "../main-page-post/main-page-post.component";
import {Post} from "../models/post.model";
import {PostService} from "../services/post.service";
import {NgForOf} from "@angular/common";
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-list-post',
  standalone: true,
  imports: [MainPagePostComponent, NgForOf],
  templateUrl: './list-post.component.html'
  // styleUrl: './list-post.component.css'
})
export class ListPostComponent implements OnInit{
  posts!: Post[];
  postTest!: Post;
  @Input() userConnected !: User;

  constructor(private postService: PostService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.postService.getAllPost()
      .subscribe(data => {
        this.posts = data;            
      })

      // this.userService.getByIdUser('657b47c90a157aa8e0d66d87')
      //   .subscribe(data => {
      //     // console.log(data);
          
      //   });

    // console.log(this.userConnected);
    
  }

  postsAreLoaded() {
    return this.posts !== undefined;
  }

  userIsConnected() {
    return this.userConnected !== undefined;
  }
}

