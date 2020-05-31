import { Model,ColumnSchema, } from '@nozbe/watermelondb';
import { Associations } from '@nozbe/watermelondb/Model';
import { field, relation } from '@nozbe/watermelondb/decorators';
import { default as Relation } from '@nozbe/watermelondb/Relation';

import {
  AllShuYuanIdsKey,
} from '@/common/shuYuanSdk/index';
import Catalogue from './catalogue';
// 书籍目录
export default class Article extends Model {
  static table = 'articles'
  static associations:Associations = {
    cataloguec: { type: 'belongs_to', key: 'catalogue_id' },
  }
  static columns:ColumnSchema[] = [
    { name: 'content', type: 'string' },
    { name: 'catalogue_id', type: 'string', isIndexed: true },
  ];
  // 内容
  @field('content') content!: string;
  // 目录表
  @relation('catalogues', 'catalogue_id') collect!: Relation<Catalogue>;
}