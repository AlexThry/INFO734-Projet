import { Component, Input } from "@angular/core";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { MessageService } from "../services/message.service";

@Component({
  selector: "app-message-pannel",
  standalone: true,
  imports: [],
  templateUrl: "./message-pannel.component.html",
  styleUrl: "./message-pannel.component.css",
})
export class MessagePannelComponent {
  messageList!: Message[];
  connectedUser!: User;
  correspondent!: User;
  loaded!: number;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.authService.getUserLoggedIn$().subscribe((user) => {
      this.connectedUser = user as User;
    });

    if (this.connectedUser.id === parseInt(this.messageList[0].sender_id)) {
      this.userService
        .getUserById(this.messageList[0].receiver_id)
        .subscribe((user) => {
          this.correspondent = user as User;
        });
    } else {
      this.userService
        .getUserById(this.messageList[0].sender_id)
        .subscribe((user) => {
          this.correspondent = user as User;
        });
    }
    this.messageService.getMessagesFromSenderIdAndReceiverIdFromLimit();
  }
}
