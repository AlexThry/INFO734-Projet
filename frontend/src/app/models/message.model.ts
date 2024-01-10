import { User } from "./user.model";

export class Message {
  id!: number;
  content!: string;
  sender_id!: number;
  receiver_id!: number;
  timestamp!: Date;

  constructor(
    id: number,
    content: string,
    sender_id: number,
    receiver_id: number,
    timestamp: Date,
  ) {
    this.id = id;
    this.content = content;
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
    this.timestamp = timestamp;
  }
}
