import {Injectable} from '@angular/core';
import {Post} from "../models/post.model";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    posts: Post[] = [
        {
            id: 1,
            authorImageUrl: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
            author: "Alexis Thierry",
            time: new Date(),
            description: "Une superbe photo",
            liked: false,
            imageUrl: "https://flowbite.com/docs/images/blog/image-1.jpg"
        },
        {
            id: 2,
            authorImageUrl: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
            author: "Alexis Thierry",
            time: new Date(),
            description: "Une superbe photo",
            liked: false,
            imageUrl: "https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png"
        },
        {
            id: 3,
            authorImageUrl: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
            author: "Alexis Thierry",
            time: new Date(),
            description: "Une superbe photo",
            liked: false,
            imageUrl: "https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png"
        },
        {
            id: 4,
            authorImageUrl: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
            author: "Alexis Thierry",
            time: new Date(),
            description: "Une superbe photo",
            liked: false,
            imageUrl: "https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png"
        },
    ]

    constructor() {
    }

    getPosts() {
        return this.posts
    }

    getPostById(postId: number) {
        const post = this.posts.find(post => post.id === postId)
        if (post) {
            return post
        } else {
            throw new Error("Post not found")
        }
    }

    onPostLike(postId: number) {
        const post = this.getPostById(postId)
        post.liked = !post.liked
    }
}
