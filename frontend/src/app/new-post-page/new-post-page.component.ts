import { Component, Input } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import { User } from '../models/user.model';
import { PostService } from '../services/post.service';

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
  @Input() userConnected!: User;
  imageFile!: File;

  constructor(private router: Router,
              protected postService: PostService) {}

  onSubmit(f: NgForm) {
    this.submit = true;

    // Build a formData : Format to send in backend to process with multer in upload file to server
    const formData = new FormData();
    formData.append('user_id', this.userConnected.id.toString());
    formData.append('image_url', this.imageFile, this.imageFile.name);
    formData.append('description', f.value.description);


    if (f.value.picture != ""){
      this.postService.createPost(formData)
        .subscribe(() => this.router.navigateByUrl(`/account/${this.userConnected.id}`))
    }
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.imageFile = fileList[0];
    }
  }
}
