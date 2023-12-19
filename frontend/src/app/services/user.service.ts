import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../models/user.model';

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
                data._id, 
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
}
