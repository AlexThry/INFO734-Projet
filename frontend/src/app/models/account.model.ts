import {Post} from "./post.model";

export class Account {
    id!: number;
    username!:string;
    imageAccountUrl!:string;
    description!:string;
    nbFollowers!:number;
    nbFollows!:number;
    posts!:Post[];
}
