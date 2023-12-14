import { Post } from './models/post.model';

describe('Card', () => {
  it('should create an instance', () => {
    expect(new Post()).toBeTruthy();
  });
});
