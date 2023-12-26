import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, NgForm, Validators} from "@angular/forms";
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
  photoName!: File;
  registerForm!: FormGroup;


  constructor(private router: Router,
    private fb: FormBuilder,
    protected authService: AuthService,
    protected userService: UserService ) {}

  onSubmit(f: NgForm) {

    this.submit = true;
    this.errorRegister = undefined;   

    // Build a formData : Format to send in backend to process with multer in upload file to server
    const formData = new FormData();
    formData.append('username', f.value.username);
    formData.append('email', f.value.email);
    formData.append('password', f.value.password);
    formData.append('photo_url', this.photoName, this.photoName.name);


    if (f.value.username != ""  && 
        f.value.email != "" && 
        f.value.password != "" && 
        f.value.photo_url != "" && 
        !this.errorRegisterExist()) {

      this.authService.signup(formData)
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

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.photoName = fileList[0];
    }
  }

  errorRegisterExist() {
    return this.errorRegister !== undefined;
  }


}