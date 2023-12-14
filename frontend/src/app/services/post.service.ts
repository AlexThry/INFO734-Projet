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
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel consequat justo. Vestibulum vel elit cursus, gravida sem in, pretium mi. Nam nec tortor sed ipsum ultricies feugiat ut eget elit. Fusce eu congue augue. Cras in justo lobortis odio sodales consectetur. Sed vulputate laoreet dolor at viverra. Morbi vel auctor est. Morbi pellentesque lacinia ipsum, a ultrices diam ultrices eu. Phasellus condimentum aliquet finibus. Duis at libero et mi pellentesque porttitor. Phasellus augue arcu, aliquet et leo iaculis, vulputate varius sapien.\n" +
                "\n" +
                "Ut finibus orci tellus, eget venenatis lacus semper vel. Fusce vel dui eget metus faucibus posuere et vel arcu. In tortor ante, faucibus semper nulla quis, auctor elementum justo. Vestibulum velit libero, aliquet et lacinia sit amet, facilisis vel augue. Donec consequat, purus sed dignissim condimentum, lectus metus ultrices odio, in porta nisl erat a nibh. Vestibulum leo velit, egestas vel suscipit vel, sodales id turpis. Quisque tempor eleifend eros, sed interdum orci commodo vitae. Ut iaculis nibh et metus auctor blandit. Maecenas pellentesque vitae erat sit amet aliquet. Ut massa sem, ornare pulvinar consequat at, rhoncus at quam.",
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
