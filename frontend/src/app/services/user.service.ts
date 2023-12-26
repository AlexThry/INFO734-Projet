import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {forkJoin, map, Observable, switchMap} from 'rxjs';
import { User } from '../models/user.model';
import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { };

  getByIdUser(id: string) {
    let url = `http://localhost:3000/api/user/${id}`

        return this.http.get<any>(url)
          .pipe(
            map((data: any) => new User(
                data.id,
                data.username, 
                data.email, 
                data.password,
                data.photo_url,
                data.followers, 
                data.following,
                data.posts
                ))
          );
  }

  getUsersByTerm(term:string){
      let url = `http://localhost:3000/api/user/searchByTerm`
      return this.http.post<any[]>(url, {"term": term })
          .pipe(
          map(usersData => {
              return usersData.map(userData => {
                  return new User(
                      userData.id,
                      userData.username,
                      userData.email,
                      userData.password,
                      userData.photo_url,
                      userData.followers,
                      userData.following,
                      userData.posts
                  );
              })
          }))
  }
}