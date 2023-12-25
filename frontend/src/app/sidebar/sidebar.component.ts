import { Component, Input, OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-sidebar',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  @Input() userConnected !: User;

  constructor(protected authService: AuthService) {}

  ngOnInit() {
      // console.log(this.userConnected);
      
  }

  onLogOut() {
    this.authService.logout();
  }
}