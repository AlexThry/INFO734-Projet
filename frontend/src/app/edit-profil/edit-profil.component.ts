import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {FormsModule, NgForm} from "@angular/forms";
import {User} from "../models/user.model";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-edit-profil',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './edit-profil.component.html',
  styleUrl: './edit-profil.component.css'
})
export class EditProfilComponent {

  user!: User;
  photoName!: any;
  submit!: boolean;


  constructor(
      private userService: UserService,
      private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userService.getUserById(this.route.snapshot.params["id"])
        .subscribe(user => this.user = user)
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.photoName = fileList[0];
    }
  }

  onSubmit(form: NgForm) {
    this.submit = true;
  }
}
