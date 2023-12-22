export class Comment {
    id!: number
    postId!: number
    content!: string

    constructor(id: number, postId: number, content: string) {
        this.id = id;
        this.postId = postId;
        this.content = content;
    }
}