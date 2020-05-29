import { Model,ColumnSchema } from '@nozbe/watermelondb';
import { Associations } from '@nozbe/watermelondb/Model';
import { field, relation, children, action } from '@nozbe/watermelondb/decorators';

import comment from './comment';

export default class Post extends Model {
  static table = 'posts';
  static associations:Associations = {
    comments: { type: 'has_many', foreignKey: 'post_id' },
  };
  static columns:ColumnSchema[] = [
    { name: 'title', type: 'string' },
    { name: 'subtitle', type: 'string' },
    { name: 'body', type: 'string' },
    { name: 'post_id', type: 'string', isIndexed: true },
    { name: 'is_nasty', type: 'boolean' },
  ];

  @field('title') title!: string;

  @field('subtitle') subtitle!: string;

  @field('body') body!: string;

  @children('comments') comments!: comment;

  @action async addComment(body: string) {
    return this.collections.get<comment>('comments').create((comment) => {
      comment.post.set(this);
      comment.body = body;
    })
  }
}