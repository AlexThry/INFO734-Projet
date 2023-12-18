import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {initFlowbite} from 'flowbite';
import {CommonModule} from "@angular/common";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {TopbarComponent} from "./topbar/topbar.component";
import {MainPagePostComponent} from "./main-page-post/main-page-post.component";
import {Post} from "./models/post.model";
import {PostService} from "./services/post.service";
import {MainPageLayoutComponent} from "./main-page-layout/main-page-layout.component";
import {ListPostComponent} from "./list-post/list-post.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [CommonModule, SidebarComponent, TopbarComponent, MainPagePostComponent, ListPostComponent, MainPageLayoutComponent],
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'web-app';
    posts!: Post[]

    constructor(private postService: PostService) {
    }

    ngOnInit(): void {
        initFlowbite();
        // this.posts = this.postService.getPosts()
    }
}
