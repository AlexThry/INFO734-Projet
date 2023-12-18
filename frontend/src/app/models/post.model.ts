import { HttpClient } from "@angular/common/http"
import { UserService } from "../services/user.service"
import { User } from "./user.model"

export class Post {
  id!: number
  user_id!: number
  user!: User
  image_url!: string
  description!: string
  likes!: Array<number>
  comments!: Array<Object>
  timestamp!: Date
  protected userService !: UserService;

  constructor(id: number, user_id: number, image_url: string, description: string, likes: Array<number>, comments: Array<Object>, timestamp: Date ) {
    this.id = id;
    this.user_id = user_id;
    console.log(user_id);
    
    // this.userService.getByIdUser(user_id)
    //   .subscribe(data => this.user = data);

    this.image_url = image_url; 
    this.description = description;
    this.likes = likes;
    this.comments = comments;
    this.timestamp = timestamp;
  }

  // getAuthor() {

  // }
}
