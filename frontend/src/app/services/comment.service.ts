import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "../models/comment.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

    getAllCommentsByPostId(postId: number): Observable<Comment[]> {
        const url = `http://localhost:3000/api/comment/postId/${postId}`;

        return this.http.get<any[]>(url).pipe(
            map(comments => {
                return comments.map(comment => new Comment(
                    comment._id,
                    comment.post_id,
                    comment.content
                ));
            })
        );
    }

}
