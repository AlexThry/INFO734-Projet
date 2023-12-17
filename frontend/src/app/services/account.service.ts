import {Injectable} from '@angular/core';
import {Account} from "../models/account.model";
import {PostService} from "./post.service";

@Injectable({
    providedIn: 'root'
})

export class AccountService {

    constructor(protected postService: PostService) {}


    accounts: Account[] = [
        {
            id:1,
            username:"Mathieu",
            imageAccountUrl:"https://flowbite.com/docs/images/people/profile-picture-5.jpg",
            description:"Ceci est une description",
            nbFollowers:300,
            nbFollows:150,
            posts:[this.postService.getPostById(1),
                this.postService.getPostById(2),
                this.postService.getPostById(3),
                this.postService.getPostById(4)]
        },
    ]

    getAccountById(accountId: number) {
        const account = this.accounts.find(account => account.id === accountId)
        if (account) {
            return account
        } else {
            throw new Error("Account not found")
        }
    }
}