import { Model,ColumnSchema, } from '@nozbe/watermelondb';
import { Associations } from '@nozbe/watermelondb/Model';
import { field, relation } from '@nozbe/watermelondb/decorators';
import { default as Relation } from '@nozbe/watermelondb/Relation';

import {
  AllShuYuanIdsKey,
} from '@/common/shuYuanSdk/index';
import collect from './collect';
// 书籍目录
export default class Catalogue extends Model {
  static table = 'catalogues'
  static associations:Associations = {
    collects: { type: 'belongs_to', key: 'collect_id' },
  }
  static columns:ColumnSchema[] = [
    { name: 'source', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'chapter_title', type: 'string' },
    { name: 'chapter_url', type: 'string' },
    { name: 'is_cache', type: 'boolean' },
    { name: 'collect_id', type: 'string', isIndexed: true },
  ];
  // 来源
  @field('source') subtitle!: AllShuYuanIdsKey;
  // 小说标题
  @field('title') title!: string;
  // 章节标题
  @field('chapter_title') chapterTitle!: string;
  // 章节页面地址
  @field('chapter_url') chapterUrl!: string;
  // 是否缓存
  @field('is_cache') isCache!: boolean;
  // 收藏表
  @relation('collects', 'collect_id') collect!: Relation<collect>;
}