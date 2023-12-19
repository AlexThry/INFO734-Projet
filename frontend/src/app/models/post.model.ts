import { HttpClient, HttpHandler } from "@angular/common/http"
import { UserService } from "../services/user.service"
import { User } from "./user.model"

export class Post {
  id!: number
  user_id!: string
  user!: User
  image_url!: string
  description!: string
  likes!: Array<string>
  comments!: Array<Object>
  timestamp!: Date

  constructor(id: number, user_id: string, image_url: string, description: string, likes: Array<string>, comments: Array<Object>, timestamp: Date, user: User) {
    this.id = id;
    this.user_id = user_id;
    this.image_url = image_url; 
    this.description = description;
    this.likes = likes;
    this.comments = comments;
    this.timestamp = timestamp;
    this.user = user;
  }
  
}
