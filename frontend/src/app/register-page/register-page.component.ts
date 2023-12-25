import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import { UserService } from '../services/user.service';

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

  constructor(private router: Router,
              private userService: UserService ) {}

  onSubmit(f: NgForm) {

    this.submit = true;

    console.log(f.value);
    
    // SEND DATA TO CREATE USER
    this.userService.signup(f.value.username, f.value.email, f.value.password, f.value.photo_url)
      .subscribe(
        (response => {
          console.log(response);
          // -- Redirect to homePage
        }),
        (error => console.log(error))
      )


    // if (f.value.username != "" && f.value.email != "" && f.value.picture != "" && f.value.password != ""){
    //   this.router.navigateByUrl("/home")
    // }
  }
}