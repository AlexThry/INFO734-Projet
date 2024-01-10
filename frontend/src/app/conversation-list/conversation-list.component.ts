import { Component } from "@angular/core";
import { MessageService } from "../services/message.service";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { Message } from "../models/message.model";
import { RouterLink } from "@angular/router";
import { UserService } from "../services/user.service";
import { Location, NgClass, NgStyle } from "@angular/common";
import { TruncatePipe } from "../pipes/truncate.pipe";

@Component({
  selector: "app-conversation-list",
  standalone: true,
  imports: [RouterLink, NgStyle, TruncatePipe, NgClass],
  templateUrl: "./conversation-list.component.html",
  styleUrl: "./conversation-list.component.css",
})
export class ConversationListComponent {
  currentUser!: User;
  messageList!: Message[];
  correspondence: Record<any, any> = {};
  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private userService: UserService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.authService.getUserLoggedIn$().subscribe((user) => {
      this.currentUser = user as User;
      this.messageService
        .getConversationList(this.currentUser.id.toString())
        .subscribe((messages) => {
          this.messageList = messages;
          for (const message of this.messageList) {
            if (message.sender_id === this.currentUser.id) {
              this.userService
                .getUserById(message.receiver_id.toString())
                .subscribe((user) => {
                  this.correspondence[message.receiver_id.toString()] = user;
                });
            } else {
              this.userService
                .getUserById(message.sender_id.toString())
                .subscribe((user) => {
                  this.correspondence[message.sender_id.toString()] = user;
                });
            }
          }
          console.log(this.correspondence);
        });
    });
  }

  goBack() {
    this.location.back();
  }

  isLast(message: Message) {
    return message.id === this.messageList[this.messageList.length - 1].id;
  }
}
