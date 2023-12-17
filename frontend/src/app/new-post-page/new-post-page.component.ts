import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-new-post-page',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './new-post-page.component.html',
  styleUrl: './new-post-page.component.css'
})
export class NewPostPageComponent {
  submit = false;

  constructor(private router: Router) {}

  onSubmit(f: NgForm) {
    this.submit = true;

    if (f.value.picture != ""  && f.value.description != ""){
      this.router.navigateByUrl("/home")
    }
  }
}
