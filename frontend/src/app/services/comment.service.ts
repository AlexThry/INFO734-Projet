import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Comment } from "../models/comment.model";
import { forkJoin, map, Observable, switchMap } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}

  getAllCommentsByPostId(postId: number): Observable<Comment[]> {
    const url = `http://localhost:3000/api/comment/postId/${postId}`;

    return this.http.get<any[]>(url).pipe(
      switchMap((comments) => {
        const commentObservables: Observable<Comment>[] = comments.map(
          (comment) => {
            return this.userService
              .getUserById(comment.user_id)
              .pipe(
                map(
                  (user) =>
                    new Comment(
                      comment._id,
                      comment.post_id,
                      comment.content,
                      user,
                    ),
                ),
              );
          },
        );
        return forkJoin(commentObservables);
      }),
    );
  }

  getCommentsByPostIdFromLimit(postId: number, start: number, end: number) {
    const url = `http://localhost:3000/api/comment/postId/${postId}/start=${start}&end=${end}`;

    return this.http.get<any[]>(url).pipe(
      switchMap((comments) => {
        const commentObservables: Observable<Comment>[] = comments.map(
          (comment) => {
            return this.userService
              .getUserById(comment.user_id)
              .pipe(
                map(
                  (user) =>
                    new Comment(
                      comment._id,
                      comment.post_id,
                      comment.content,
                      user,
                    ),
                ),
              );
          },
        );
        return forkJoin(commentObservables);
      }),
    );
  }

  createcomment(post_id:string, user_id:string, content: string) {
    const url = `http://localhost:3000/api/comment/create`;

    return this.http.post(url, {"post_id": post_id, "user_id": user_id, "content": content});
  }
}
