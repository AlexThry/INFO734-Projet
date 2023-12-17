import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";

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
export class LoginPageComponent {
  submit = false;

  constructor(private router: Router) {}

  onSubmit(f: NgForm) {

    this.submit = true;

    if (f.value.username != ""  && f.value.password != ""){
      this.router.navigateByUrl("/")
    }
  }
}