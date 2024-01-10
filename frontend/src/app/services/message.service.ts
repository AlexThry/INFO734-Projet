import { Injectable } from "@angular/core";
import { forkJoin, map, Observable, switchMap } from "rxjs";
import { Message } from "../models/message.model";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}

  getMessagesFromUsersIdsFromLimit(
    user1Id: number,
    user2Id: number,
    start: number,
    limit: number,
  ) {
    const url = `http://localhost:3000/api/message/user1=${user1Id}&user2=${user2Id}/from=${start}&limit=${limit}`;
    return this.http.get<any[]>(url).pipe(
      switchMap((messages) => {
        const messageObservables: Observable<Message>[] = messages.map(
          (message) => {
            return this.userService
              .getUserById(message.sender_id)
              .pipe(
                map(
                  (user) =>
                    new Message(
                      message._id,
                      message.content,
                      message.sender_id,
                      message.receiver_id,
                      message.timestamp,
                    ),
                ),
              );
          },
        );
        return forkJoin(messageObservables);
      }),
    );
  }

  createMessage(senderId: string, receiverId: string, content: string) {
    const url = `http://localhost:3000/api/message/create`;
    return this.http.post(url, {
      sender_id: senderId,
      receiver_id: receiverId,
      content: content,
    });
  }
  getConversationList(user_id: string) {
    const url = "http://localhost:3000/api/message/user-messages";
    return this.http.post<any[]>(url, { user_id: user_id }).pipe(
      switchMap((messages) => {
        const messageObservables: Observable<Message>[] = messages.map(
          (message) => {
            return this.userService
              .getUserById(message.sender_id)
              .pipe(
                map(
                  (user) =>
                    new Message(
                      message._id,
                      message.content,
                      message.sender_id,
                      message.receiver_id,
                      message.timestamp,
                    ),
                ),
              );
          },
        );
        return forkJoin(messageObservables);
      }),
    );
  }
}
