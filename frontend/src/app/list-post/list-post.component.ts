import {Component, OnInit} from '@angular/core';
import {MainPagePostComponent} from "../main-page-post/main-page-post.component";
import {Post} from "../models/post.model";
import {PostService} from "../services/post.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-list-post',
  standalone: true,
  imports: [MainPagePostComponent, NgForOf],
  templateUrl: './list-post.component.html',
  styleUrl: './list-post.component.css'
})
export class ListPostComponent implements OnInit{
  listPosts!: Post[];

  constructor(private postService: PostService) {
  }
  ngOnInit() {
    this.listPosts = this.postService.getPosts();
  }
}

