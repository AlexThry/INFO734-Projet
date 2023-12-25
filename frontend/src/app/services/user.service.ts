import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: string) {
    let url = `http://localhost:3000/api/user/${id}`;

    return this.http
      .get<any>(url)
      .pipe(
        map(
          (data: any) =>
            new User(
              data._id,
              data.username,
              data.email,
              data.password,
              data.photo_url,
              data.followers,
              data.following,
              data.posts,
            ),
        ),
      );
  }

  signup(username: string, email: string, password: string, photo_url: string) {
    const url = `http://localhost:3000/api/user/signup`

    return this.http.post<any>(url, {
      username,
      email, 
      password, 
      photo_url
    });

  }

  login(email: string, password: string) {
    const url = `http://localhost:3000/api/user/login`

    return this.http.post<any>(url, { email, password })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Gérer le cas où l'authentification a échoué
            console.error('Authentification échouée :', error);
          } else {
            // Gérer d'autres erreurs HTTP
            console.error('Erreur lors de la connexion :', error);
          }

          // Propager l'erreur pour permettre à d'autres parties de votre application de la gérer si nécessaire
          return throwError(error);
        })
      );

  }
}
