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
        {
            id:2,
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
        {
            id:3,
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
        {
            id:4,
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
        {
            id:5,
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
        {
            id:6,
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
        {
            id:7,
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
        {
            id:8,
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
        {
            id:9,
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

    getAllAccounts() {
        return this.accounts
    }

    getAccountById(accountId: number) {
        const account = this.accounts.find(account => account.id === accountId)
        if (account) {
            return account
        } else {
            throw new Error("Account not found")
        }
    }

    getAccountsBySearch(content:string):Account[]{
        let listeAccounts: Account[] = []
        for (const a of this.accounts){
            if (a.username.toLowerCase().includes(content.toLowerCase())){
                listeAccounts.push(a)
            }
        }
        return listeAccounts
    }
}