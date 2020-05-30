import { Model,ColumnSchema } from '@nozbe/watermelondb';
import { Associations } from '@nozbe/watermelondb/Model';
import { field, relation, children, action } from '@nozbe/watermelondb/decorators';

import Catalogue from './catalogue';
import {
  AllShuYuanIdsKey,
} from '@/common/shuYuanSdk/index';
// 收藏书籍
export default class Collect extends Model {
  static table = 'Collects';
  static associations:Associations = {
    Catalogues: { type: 'has_many', foreignKey: 'collect_id' },
  };
  static columns:ColumnSchema[] = [
    { name: 'title', type: 'string' },
    { name: 'subtitle', type: 'string' },
    { name: 'body', type: 'string' },
    { name: 'collect_id', type: 'string', isIndexed: true },
    { name: 'is_nasty', type: 'boolean' },
  ];
  // 来源
  @field('source') subtitle!: AllShuYuanIdsKey;
  // 小说标题
  @field('title') title!: string;
  // 目录页面地址
  @field('catalogue_url') catalogueUrl!: string;
  // 最新章节标题
  @field('latest_chapter_title') latestChapterTitle!: string;
  // 最新章节页面地址
  @field('latest_chapter_url') latestChapterUrl!: string;
  // 已阅读到的章节标题
  @field('have_read_title') haveReadTitle!: string;
  // 已阅读到的章节页面地址
  @field('have_read_url') haveReadUrl!: string;
  // 目录表-子表
  @children('catalogues') catalogue!: Catalogue;
  // 添加目录
  @action async addCatalogue(body: string) {
    return this.collections.get<Catalogue>('catalogues').create((comment) => {
      comment.collect.set(this);
    })
  }
}