import { Model,ColumnSchema, } from '@nozbe/watermelondb';
import { Associations } from '@nozbe/watermelondb/Model';
import { field, relation } from '@nozbe/watermelondb/decorators';
import { default as Relation } from '@nozbe/watermelondb/Relation';

import post from './post';

export default class Comment extends Model {
  static table = 'comments'
  static associations:Associations = {
    posts: { type: 'belongs_to', key: 'post_id' },
  }
  static columns:ColumnSchema[] = [
    { name: 'body', type: 'string' },
    { name: 'post_id', type: 'string', isIndexed: true },
    { name: 'is_nasty', type: 'boolean' },
  ];

  @field('body') body!: string;

  @field('is_nasty') isNasty!: string;

  @relation('posts', 'post_id') post!: Relation<post>;
}