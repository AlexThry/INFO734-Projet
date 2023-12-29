export class User {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  photo_url!: string;
  followers!: Array<number>;
  following!: Array<number>;
  posts!: Array<number>;

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    photo_url: string,
    followers: Array<number>,
    following: Array<number>,
    posts: Array<number>,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.photo_url = photo_url;
    this.followers = followers;
    this.following = following;
    this.posts = posts;
  }

}
