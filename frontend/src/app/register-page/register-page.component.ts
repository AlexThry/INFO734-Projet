import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { stringify } from 'querystring';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  submit = false;
  userConnected!: User;
  errorRegister !: any | undefined;


  constructor(private router: Router,
    protected authService: AuthService,
    protected userService: UserService ) {}

  onSubmit(f: NgForm) {

    this.submit = true;
    this.errorRegister = undefined;   


    if (f.value.username != ""  && 
        f.value.email != "" && 
        f.value.password != "" && 
        f.value.photo_url != "" && 
        !this.errorRegisterExist()) {

      this.authService.signup(f.value.username, f.value.email, f.value.password, f.value.photo_url)
          .subscribe(
            data => {
              this.authService.getUserLoggedIn$()
                .subscribe(user => {
                  this.router.navigateByUrl("/home");
                })
          },
          error => {
            console.error('Erreur lors du register :', error.error.message);
            this.errorRegister = error.error;
          })
    }
  }

  errorRegisterExist() {
    return this.errorRegister !== undefined;
  }
}