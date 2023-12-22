import {User} from "./user.model";

export class Comment {
    id!: number
    postId!: number
    content!: string
    user!: User
    styleBackgroundImage!: string

    constructor(id: number, postId: number, content: string, user: User) {
        this.id = id;
        this.postId = postId;
        this.content = content;
        this.user = user;
    }
}