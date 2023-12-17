import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {PostService} from "../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  enteredValue: string = '';

  constructor(private router : Router) {}

  onEnter(){
    this.router.navigate(['search/',this.enteredValue])
  }
}
