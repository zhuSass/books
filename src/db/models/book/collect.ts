import { Model,ColumnSchema,TableSchema } from '@nozbe/watermelondb';
import { Associations } from '@nozbe/watermelondb/Model';
import { field, relation, children, action } from '@nozbe/watermelondb/decorators';

import Catalogue from './catalogue';
import {
  AllShuYuanIdsKey,
} from '@/common/shuYuanSdk/index';

// 收藏书籍
export default class Collect extends Model {
  static table = 'collects';
  static associations:Associations = {
    Catalogues: { type: 'has_many', foreignKey: 'collect_id' },
  };
  static columns:ColumnSchema[] = [
    { name: 'source', type: 'string' },
    { name: 'logo', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'author', type: 'string' },
    { name: 'catalogue_url', type: 'string' },
    { name: 'latest_chapter_title', type: 'string' },
    { name: 'latest_chapter_url', type: 'string' },
    { name: 'have_read_title', type: 'string' },
    { name: 'have_read_url', type: 'string' },
    { name: 'is_cache', type: 'boolean' },
  ];
  // 来源
  @field('source') source!: AllShuYuanIdsKey;
  // 小说logo
  @field('logo') logo!: string;
  // 小说标题
  @field('title') title!: string;
  // 作者
  @field('author') author!: string;
  // 目录页面地址
  @field('catalogue_url') catalogueUrl!: string;
  // 最新章节标题
  @field('latest_chapter_title') latestChapterTitle!: string;
  // 最新章节页面文章地址
  @field('latest_chapter_url') latestChapterUrl!: string;
  // 已阅读到的章节标题
  @field('have_read_title') haveReadTitle!: string;
  // 已阅读到的章节文章页面地址
  @field('have_read_url') haveReadUrl!: string;
  // 是否缓存
  @field('is_cache') isCache!: boolean;
  // 目录表-子表
  @children('catalogues') catalogue!: Catalogue;
  // 添加目录
  @action async addCatalogue(body: string) {
    return this.collections.get<Catalogue>('catalogues').create((comment) => {
      comment.collect.set(this);
    })
  }
}