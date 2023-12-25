import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent{
  submit = false;
  isLoading !: boolean;
  userConnected!: User;
  errorLogin !: string | undefined;


  constructor(private router: Router,
              protected authService: AuthService) {}

  ngOnInit() {
    this.isLoading = false;        
  }


  onSubmit(f: NgForm) {

    this.errorLogin = undefined;    
    this.submit = true;
    this.isLoading = true;
    

    if (f.value.email != ""  && f.value.password != "" && !this.errorLoginExist()){
      this.authService.login(f.value.email, f.value.password)
        .subscribe
        (user => {
          this.userConnected = user;
          this.router.navigateByUrl("/home");
        },
        error => {
          console.error('Erreur lors de la connexion :', error.error.message);
          this.errorLogin = error.error.message;
        })
      
    }

  }

  userConnectedIsLoaded() {
    return this.userConnected !== undefined;
  }

  errorLoginExist() {
    return this.errorLogin !== undefined;
  }

}