import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLoggedIn$ = new Subject<User>();

  constructor(private http: HttpClient,
              protected userService: UserService) { };

  // login(email: string, password: string) {
    
  //   return this.userService.login(email, password)
  //       .subscribe(user => {
  //           // console.log(user);

  //           let userConnected = new User(
  //               user._id, 
  //               user.username, 
  //               user.email,
  //               user.password, 
  //               user.photo_url,
  //               user.followers,
  //               user.following,
  //               user.posts
  //           )
  //           localStorage.removeItem("user_id");
  //           localStorage.setItem("user_id", user._id);
            
  //           // Une fois l'authentification réussie, émettez l'événement
  //           this.userLoggedIn$.next(userConnected);
  //       })

  // }

  login(email: string, password: string): Observable<User> {
    return this.userService.login(email, password)
      .pipe(
        map(user => {
          let userConnected = new User(
            user._id,
            user.username,
            user.email,
            user.password,
            user.photo_url,
            user.followers,
            user.following,
            user.posts
          );
          localStorage.removeItem("user_id");
          localStorage.setItem("user_id", user._id);
          this.userLoggedIn$.next(userConnected);
          return userConnected;
        })
      );
  }
  

  getUserLoggedIn$(): Observable<User | undefined> {
    let user_id = localStorage.getItem("user_id");

    if (user_id !== null) {
      // Retourne l'observable directement du service UserService
      return this.userService.getUserById(user_id);
    } else {
      // Retourne une chaîne (ou une valeur par défaut) si l'user_id n'est pas disponible
      return new Observable((observer) => {
        observer.next(undefined);
        observer.complete();
      });
    }
  }

  logout() {
    localStorage.removeItem("user_id");
  }
}
