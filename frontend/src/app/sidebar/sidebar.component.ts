import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { routes } from "../app.routes";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent implements OnInit {
  @Input() userConnected!: User;

  constructor(
    protected authService: AuthService,
    protected router: Router,
    protected route: ActivatedRoute,
  ) {}

  ngOnInit() {}

  onLogOut() {
    this.authService.logout();
  }

  isUserLoaded() {
    return this.userConnected !== undefined;
  }

  protected readonly routes = routes;
}
