import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";
import { HttpClient } from "@angular/common/http";
import { forkJoin, map, Observable, switchMap } from "rxjs";
import { UserService } from "./user.service";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class PostService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}

  getAllPost(): Observable<Post[]> {
    const url = "http://localhost:3000/api/post/";

    return this.http.get<any>(url).pipe(
      switchMap((posts: any[]) => {
        const userRequests: Observable<User>[] = posts.map((post) =>
          this.userService.getUserById(post.user_id),
        );

        return forkJoin(userRequests).pipe(
          map((users: User[]) => {
            return posts
              .filter((post, index) => users[index] !== undefined) // Exclure les posts avec un utilisateur undefined
              .map(
                (post, index) =>
                  new Post(
                    post._id,
                    post.user_id,
                    post.image_url,
                    post.description,
                    post.likes,
                    post.comments,
                    post.timestamp,
                    users[index],
                  ),
              );
          }),
        );
      }),
    );
  }

  getPostById(id: number) {
    const url = `http://localhost:3000/api/post/${id}`;

    return this.http.get<Post>(url).pipe(
      switchMap((post: any) => {
        return this.userService.getUserById(post.user_id).pipe(
          map((user) => {
            return new Post(
              post._id,
              post.user_id,
              post.image_url,
              post.description,
              post.likes,
              post.comments,
              post.timestamp,
              user,
            );
          }),
        );
      }),
    );
  }

    getPostsBySearchTerm(term:string): Observable<Post[]> {
        const url = 'http://localhost:3000/api/post/searchByTerm';

        return this.http.post<any>(url,{"term": term })
            .pipe(
                switchMap((posts: any[]) => {
                    const userRequests: Observable<User>[] = posts.map(post => this.userService.getUserById(post.user_id));

                    return forkJoin(userRequests).pipe(
                        map((users: User[]) => {
                            return posts
                                .filter((post, index) => users[index] !== undefined) // Exclure les posts avec un utilisateur undefined
                                .map((post, index) => new Post(
                                    post.id,
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

    getPostsByUserIdFromLimit(userId: string, start: number, end: number) {
        const url = `http://localhost:3000/api/post/user/${userId}/limit/start=${start}&end=${end}`;
        return this.http.get<any>(url).pipe(
            switchMap((posts: any[]) => {
                const userRequests: Observable<User>[] = posts.map((post) =>
                    this.userService.getUserById(post.user_id),
                );

                return forkJoin(userRequests).pipe(
                    map((users: User[]) => {
                        return posts
                            .filter((post, index) => users[index] !== undefined)
                            .map(
                                (post, index) =>
                                    new Post(
                                        post._id,
                                        post.user_id,
                                        post.image_url,
                                        post.description,
                                        post.likes,
                                        post.comments,
                                        post.timestamp,
                                        users[index],
                                    ),
                            );
                    }),
                );
            }),
        );
    }


  actionPostById(
    postId: number,
    userConnectedID: string,
    action: "like" | "unlike",
  ) {
    if (action == "like") {
      this.likePost(postId, userConnectedID);
    } else if (action == "unlike") {
      this.unlikePost(postId, userConnectedID);
    }
  }

  likePost(postId: number, userConnectedID: string) {
    const url = "http://localhost:3000/api/post/addLike/" + postId.toString();

    let data = { userId: userConnectedID };

    this.http.put(url, data).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      },
    );
  }

  unlikePost(postId: number, userConnectedID: string) {
    const url = "http://localhost:3000/api/post/removeLike/" + postId;

    let data = { userId: userConnectedID };

    this.http.put(url, data).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      },
    );
  }

  getPostsFromLimit(start: number, end: number) {
    const url = `http://localhost:3000/api/post/limit/start=${start}&end=${end}`;

    return this.http.get<any>(url).pipe(
      switchMap((posts: any[]) => {
        const userRequests: Observable<User>[] = posts.map((post) =>
          this.userService.getUserById(post.user_id),
        );

        return forkJoin(userRequests).pipe(
          map((users: User[]) => {
            return posts
              .filter((post, index) => users[index] !== undefined) // Exclure les posts avec un utilisateur undefined
              .map(
                (post, index) =>
                  new Post(
                    post._id,
                    post.user_id,
                    post.image_url,
                    post.description,
                    post.likes,
                    post.comments,
                    post.timestamp,
                    users[index],
                  ),
              );
          }),
        );
      }),
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
