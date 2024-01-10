import { User } from "./user.model";

export class Message {
  id!: number;
  content!: string;
  sender_id!: string;
  receiver_id!: string;

  constructor(
    id: number,
    content: string,
    sender_id: string,
    receiver_id: string,
  ) {
    this.id = id;
    this.content = content;
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
  }
}
