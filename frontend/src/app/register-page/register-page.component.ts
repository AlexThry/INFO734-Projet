import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";

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

  constructor(private router: Router) {}

  onSubmit(f: NgForm) {

    this.submit = true;

    if (f.value.username != "" && f.value.email != "" && f.value.picture != "" && f.value.password != ""){
      this.router.navigateByUrl("/home")
    }
  }
}