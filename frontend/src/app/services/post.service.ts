import {Injectable} from '@angular/core';
import {Post} from "../models/post.model";
import {Account} from "../models/account.model";
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, switchMap } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient,
                private userService: UserService) {};

    // posts: Post[] = [
    //     {
    //         id: 1,
    //         authorImageUrl: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    //         author: "Alexis Thierry",
    //         time: new Date(),
    //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel consequat justo. Vestibulum vel elit cursus, gravida sem in, pretium mi. Nam nec tortor sed ipsum ultricies feugiat ut eget elit. Fusce eu congue augue. Cras in justo lobortis odio sodales consectetur. Sed vulputate laoreet dolor at viverra. Morbi vel auctor est. Morbi pellentesque lacinia ipsum, a ultrices diam ultrices eu. Phasellus condimentum aliquet finibus. Duis at libero et mi pellentesque porttitor. Phasellus augue arcu, aliquet et leo iaculis, vulputate varius sapien.\n" +
    //             "\n" +
    //             "Ut finibus orci tellus, eget venenatis lacus semper vel. Fusce vel dui eget metus faucibus posuere et vel arcu. In tortor ante, faucibus semper nulla quis, auctor elementum justo. Vestibulum velit libero, aliquet et lacinia sit amet, facilisis vel augue. Donec consequat, purus sed dignissim condimentum, lectus metus ultrices odio, in porta nisl erat a nibh. Vestibulum leo velit, egestas vel suscipit vel, sodales id turpis. Quisque tempor eleifend eros, sed interdum orci commodo vitae. Ut iaculis nibh et metus auctor blandit. Maecenas pellentesque vitae erat sit amet aliquet. Ut massa sem, ornare pulvinar consequat at, rhoncus at quam.",
    //         liked: false,
    //         imageUrl: "https://flowbite.com/docs/images/blog/image-1.jpg"
    //     },
    //     {
    //         id: 2,
    //         authorImageUrl: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    //         author: "Alexis Thierry",
    //         time: new Date(),
    //         description: "Une superbe photo",
    //         liked: false,
    //         imageUrl: "https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png"
    //     },
    //     {
    //         id: 3,
    //         authorImageUrl: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    //         author: "Alexis Thierry",
    //         time: new Date(),
    //         description: "Une superbe photo",
    //         liked: false,
    //         imageUrl: "https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png"
    //     },
    //     {
    //         id: 4,
    //         authorImageUrl: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    //         author: "Alexis Thierry",
    //         time: new Date(),
    //         description: "Une superbe photo",
    //         liked: false,
    //         imageUrl: "https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png"
    //     },
    // ]

    // getAllPost() {
    //     const url = 'http://localhost:3000/api/post/';
    
    //     return this.http.get<any>(url).pipe(
    //       map((data: any) => {
    //         // console.log(data);
            
    //         return data.map((post: any) => {
    //             let user!: User;
    //             this.userService.getByIdUser(post.user_id)
    //                 .subscribe(data => user = data)
                
    //             return new Post(
    //                 post._id, 
    //                 post.user_id, 
    //                 post.image_url,
    //                 post.description, 
    //                 post.likes, 
    //                 post.comments, 
    //                 post.timestamp,
    //                 user
    //             )
    //         });
            
    //       })
    //     );
    // }

    getAllPost(): Observable<Post[]> {
        const url = 'http://localhost:3000/api/post/';
    
        return this.http.get<any>(url).pipe(
          switchMap((posts: any[]) => {
            const userRequests: Observable<User>[] = posts.map(post => this.userService.getByIdUser(post.user_id));
            
            return forkJoin(userRequests).pipe(
              map((users: User[]) => {
                return posts
                  .filter((post, index) => users[index] !== undefined) // Exclure les posts avec un utilisateur undefined
                  .map((post, index) => new Post(
                    post._id,
                    post.user_id,
                    post.image_url,
                    post.description,
                    post.likes,
                    post.comments,
                    post.timestamp,
                    users[index]
                  ));
              })
            );
          })
        );
    }

    actionPostById(postId: number, userConnectedID: string, action: 'like' | 'unlike') {
        

        if (action == 'like') {
            this.likePost(postId, userConnectedID);
        }
        else if (action == 'unlike') {
            this.unlikePost(postId, userConnectedID);
        }
    }

    likePost(postId: number, userConnectedID: string) {
        const url = 'http://localhost:3000/api/post/addLike/' + postId.toString();
    
        let data = {'userId': userConnectedID};

        this.http.put(url, data)
            .subscribe(
                response => { console.log(response) },
                error => { console.error(error) }
            );
    }

    unlikePost(postId: number, userConnectedID: string) {
        const url = 'http://localhost:3000/api/post/removeLike/' + postId;

        console.log(url);
        
    
        let data = {'userId': userConnectedID};

        this.http.put(url, data)
            .subscribe(
                response => { console.log(response) },
                error => { console.error(error) }
            );
    }

    // getPostsBySearch(content:string):Post[]{
    //     let listePosts: Post[] = []
    //     for (const a of this.posts){
    //         if (a.description.toLowerCase().includes(content.toLowerCase())){
    //             listePosts.push(a)
    //         }
    //     }
    //     return listePosts
    // }


    // getPostById(postId: number) {
    //     const post = this.posts.find(post => post.id === postId)
    //     if (post) {
    //         return post
    //     } else {
    //         throw new Error("Post not found")
    //     }
    // }

    // onPostLike(postId: number) {
    //     const post = this.getPostById(postId)
    //     post.liked = !post.liked
    // }
}
