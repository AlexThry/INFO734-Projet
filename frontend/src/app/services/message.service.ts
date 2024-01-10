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

  getMessagesFromSenderIdAndReceiverIdFromLimit(
    senderId: number,
    receiverId: number,
    start: number,
    limit: number,
  ) {
    const url = `http://localhost:3000/api/message/user1=${senderId}&user2=${receiverId}&start=${start}&limit=${limit}`;
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
